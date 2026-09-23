const express = require("express");
const router = express.Router();
const twilio = require("twilio");
const crypto = require("crypto");
const Database = require("better-sqlite3");

// 1. Safe SQLite Connection
let db = null;
try {
  db = new Database("agrisync.db");
} catch (err) {
  console.warn("[DATABASE] Running in resilient fallback mode:", err.message);
}

// 2. Gateway Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;

let twilioClient = null;
if (accountSid && authToken && !accountSid.includes("your_account_sid")) {
  try {
    twilioClient = twilio(accountSid, authToken);
  } catch (err) {
    console.log("[TELEPHONY] Twilio running in fallback simulator mode.");
  }
}

// 3. In-Memory Data Stores
const smsOutbox = [];
const callbackTickets = [];
const smsRateLimitMap = new Map();
const sessionStore = new Map();
const offlineEscrowSubmissions = [];
const farmerCredentialsStore = new Map();

// Initialize Demo Farmer Credentials (PIN: 1234)
(() => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync("1234", salt, 1000, 64, "sha512").toString("hex");
  farmerCredentialsStore.set("9876543210", {
    pinHash: hash,
    salt: salt,
    registeredAt: new Date().toISOString(),
    failedAttempts: 0,
    isLocked: false
  });
})();

// In-Memory Fallback Directory
const fallbackPinDict = {
  "700036": { district: "Kolkata North", state: "West Bengal", lang: "bn", mandi: "Cossipore Wholesale Mandi, Gate 2, Kolkata - 700036" },
  "700124": { district: "North 24 Parganas", state: "West Bengal", lang: "bn", mandi: "Barasat Central Mandi, Gate A, Barasat - 700124" },
  "141001": { district: "Ludhiana", state: "Punjab", lang: "pa", mandi: "Grain Market Khanna, GT Road, Gate B, Ludhiana - 141401" },
  "411037": { district: "Pune", state: "Maharashtra", lang: "mr", mandi: "APMC Market Yard Gultekdi, Gate 3, Pune - 411037" },
  "110040": { district: "North Delhi", state: "Delhi", lang: "hi", mandi: "Narela Grain Mandi, Scale Line 2, North Delhi - 110040" }
};

// Safe Multilingual Strings
const ivrDictionary = {
  en: {
    name: "English",
    locale: "en-IN",
    welcome: "Welcome to AgriSync PM Kisan Helpline. Press 1 for Live Queue, 2 for MSP Rates, 3 for Weather, 4 for Crop Voice Search, 5 for SMS Pass, 6 for Cereals, 7 for Pulses, 8 for Oilseeds, and 9 for Operator Callback.",
    qtyPrompt: "Enter crop quantity in quintals followed by pound key.",
    qtyChallenge: "Quantity exceeds standard limit of 150 quintals. Press 9 for Supervisor Approval, or 1 to re-enter.",
    noiseFallback: "High engine noise detected. Please use your telephone keypad numbers.",
    voiceSearch: "Listening for your crop name. Please speak now.",
    handshake: (token, crop, qty, mandi) => "Your digital pass for Token " + token + ", " + crop + " (" + qty + " Qtl), at " + mandi + " has been dispatched via SMS. Disconnecting to free lines.",
    sms: {
      slot: (id, crop, qty, mandi, slot) => "[AGRISync Verified Pass] Token: " + id + " | Crop: " + crop + " (" + qty + " Qtl) | Mandi: " + mandi + " | Slot: " + slot + ".",
      callback: (id) => "[AGRISync HelpDesk] Urgent callback #" + id + " registered. An officer will call within 15 mins.",
      reminder: (id, time) => "[AGRISync T-24h Reminder] Token " + id + ": Unloading scheduled tomorrow at " + time + ". Reply 1 to Confirm or 2 to Postpone.",
      dropRecovery: (crop) => "[AGRISync Alert] Call disconnected. Progress for " + crop + " saved for 30 mins. Redial 1800-000-2026 to resume."
    }
  },
  bn: {
    name: "Bengali (বাংলা)",
    locale: "bn-IN",
    welcome: "কৃষক হেল্পলাইনে স্বাগতম। লাইভ কিউ জানতে ১, বাজার দরের জন্য ২, আবহাওয়ার জন্য ৩, মুখে বলে খুঁজতে ৪, এসএমএস পাসের জন্য ৫, দানা শস্যের জন্য ৬, ডালের জন্য ৭, তৈলবীজের জন্য ৮, এবং কলব্যাকের জন্য ৯ চাপুন।",
    qtyPrompt: "কুইন্টাল পরিমাণ লিখে হ্যাশ টিপুন।",
    qtyChallenge: "পরিমাণ ১৫০ কুইন্টালের বেশি। সুপারভাইজার পর্যালোচনার জন্য ৯ টিপুন বা পুনরায় লিখতে ১ টিপুন।",
    noiseFallback: "উচ্চ শব্দ সনাক্ত হয়েছে। অনুগ্রহ করে কীপ্যাড নম্বর ব্যবহার করুন।",
    voiceSearch: "আপনার ফসলের নাম বলুন।",
    handshake: (token, crop, qty, mandi) => "আপনার টোকেন নম্বর " + token + "। ফসল " + crop + " (" + qty + " কুইন্টাল) প্রবেশ পাস এসএমএস মারফত পাঠানো হয়েছে। কল সমাপ্ত করা হচ্ছে।",
    sms: {
      slot: (id, crop, qty, mandi, slot) => "[এগ্রিসিঙ্ক প্রবেশ পাস] টোকেন: " + id + " | ফসল: " + crop + " (" + qty + " কুইন্টাল) | মাণ্ডি: " + mandi + " | সময়: " + slot + "।",
      callback: (id) => "[এগ্রিসিঙ্ক সহায়তা] কলব্যাক #" + id + " নথিবদ্ধ। ১৫ মিনিটে ফোন করা হবে।",
      reminder: (id, time) => "[এগ্রিসিঙ্ক রিমাইন্ডার] টোকেন " + id + ": আগামীকাল " + time + " এ তুলাই। নিশ্চিত করতে 1 অথবা পিছিয়ে দিতে 2 পাঠান।",
      dropRecovery: (crop) => "[এগ্রিসিঙ্ক বার্তা] সংযোগ বিচ্ছিন্ন। " + crop + "-এর বিবরণ ৩০ মিনিট সুরক্ষিত। ১৮০০-০০০-২০২৬ নম্বরে কল করুন।"
    }
  },
  pa: {
    name: "Punjabi (ਪੰਜਾਬੀ)",
    locale: "pa-IN",
    welcome: "ਕਿਸਾਨ ਹੈਲਪਲਾਈਨ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ। ਮੰਡੀ ਕਤਾਰ ਲਈ 1, ਸਰਕਾਰੀ ਭਾਅ ਲਈ 2, ਮੌਸਮ ਲਈ 3, ਬੋਲ ਕੇ ਫ਼ਸਲ ਲੱਭਣ ਲਈ 4, ਐਸ ਐਮ ਐਸ ਪਾਸ ਲਈ 5, ਅਨਾਜ ਸ਼੍ਰੇਣੀ ਲਈ 6, ਦਾਲਾਂ ਲਈ 7, ਤੇਲ ਬੀਜਾਂ ਲਈ 8, ਅਤੇ ਅਧਿਕਾਰੀ ਨਾਲ ਗੱਲ ਕਰਨ ਲਈ 9 ਦਬਾਓ।",
    qtyPrompt: "ਕੁਇੰਟਲ ਵਿੱਚ ਮਾਤਰਾ ਦਰਜ ਕਰੋ ਅਤੇ ਹੈਸ਼ ਦਬਾਓ।",
    qtyChallenge: "ਮਾਤਰਾ 150 ਕੁਇੰਟਲ ਤੋਂ ਵੱਧ ਹੈ। ਸੁਪਰਵਾਈਜ਼ਰ ਮਨਜ਼ੂਰੀ ਲਈ 9 ਦਬਾਓ, ਦੁਬਾਰਾ ਭਰਨ ਲਈ 1 ਦਬਾਓ।",
    noiseFallback: "ਟਰੈਕਟਰ ਦਾ ਰੌਲਾ ਜ਼ਿਆਦਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਕੀਪੈਡ ਨੰਬਰਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
    voiceSearch: "ਆਪਣੀ ਫ਼ਸਲ ਦਾ ਨਾਮ ਬੋਲੋ। ਅਸੀਂ ਸੁਣ ਰਹੇ ਹਾਂ।",
    handshake: (token, crop, qty, mandi) => "ਤੁਹਾਡਾ ਟੋਕਨ ਨੰਬਰ " + token + " ਹੈ। ਫ਼ਸਲ " + crop + " (" + qty + " ਕੁਇੰਟਲ) ਦਾ ਪਤਾ ਐਸ ਐਮ ਐਸ ਰਾਹੀਂ ਭੇਜ ਦਿੱਤਾ ਗਿਆ ਹੈ। ਕਾਲ ਸਮਾਪਤ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ।",
    sms: {
      slot: (id, crop, qty, mandi, slot) => "[ਅੈਗਰੀ-ਸਿੰਕ ਪ੍ਰਵੇਸ਼ ਪਾਸ] ਟੋਕਨ: " + id + " | ਫ਼ਸਲ: " + crop + " (" + qty + " ਕੁਇੰਟਲ) | ਮੰਡੀ: " + mandi + " | ਸਮਾਂ: " + slot + "।",
      callback: (id) => "[ਅੈਗਰੀ-ਸਿੰਕ ਮਦਦ] ਕਾਲਬੈਕ #" + id + " ਦਰਜ ਹੋ ਗਈ। 15 ਮਿੰਟਾਂ ਵਿੱਚ ਸੰਪਰਕ ਹੋਵੇਗਾ।",
      reminder: (id, time) => "[ਅੈਗਰੀ-ਸਿੰਕ ਰੀਮਾਈਂਡਰ] ਟੋਕਨ " + id + ": ਕੱਲ੍ਹ " + time + " ਵਜੇ ਤੁਲਾਈ ਹੈ। ਪੁਸ਼ਟੀ ਲਈ 1 ਜਾਂ ਬਦਲਣ ਲਈ 2 ਭੇਜੋ।",
      dropRecovery: (crop) => "[ਅੈਗਰੀ-ਸਿੰਕ ਸੂਚਨਾ] ਕਾਲ ਕੱਟ ਗਈ ਸੀ। " + crop + " ਦਾ ਵੇਰਵਾ 30 ਮਿੰਟ ਤੱਕ ਸੁਰੱਖਿਅਤ ਹੈ। ਮੁੜ ਕਾਲ ਕਰੋ।"
    }
  },
  hi: {
    name: "Hindi (हिन्दी)",
    locale: "hi-IN",
    welcome: "किसान हेल्पलाइन में आपका स्वागत है। मंडी कतार के लिए 1, सरकारी भाव के लिए 2, मौसम चेतावनी के लिए 3, बोलकर फसल खोजने के लिए 4, एसएमएस पास के लिए 5, अनाज श्रेणी के लिए 6, दलहन के लिए 7, तिलहन के लिए 8, और अधिकारी से बात करने के लिए 9 दबाएं।",
    qtyPrompt: "क्विंटल में मात्रा दर्ज करें और हैश दबाएं।",
    qtyChallenge: "मात्रा 150 क्विंटल से अधिक है। पर्यवेक्षक अनुमोदन के लिए 9 दबाएं, पुनः दर्ज करने के लिए 1 दबाएं।",
    noiseFallback: "अत्यधिक बाहरी शोर का पता चला है। कृपया कीपैड बटनों का उपयोग करें।",
    voiceSearch: "अपनी फसल का नाम बोलें।",
    handshake: (token, crop, qty, mandi) => "आपका टोकन नंबर " + token + " है। फसल " + crop + " (" + qty + " क्विंटल) का डिजिटल पास एसएमएस द्वारा भेज दिया गया है। कॉल समाप्त की जा रही है।",
    sms: {
      slot: (id, crop, qty, mandi, slot) => "[एग्री-सिंक प्रवेश पास] टोकन: " + id + " | फसल: " + crop + " (" + qty + " क्विंटल) | मंडी: " + mandi + " | समय: " + slot + "।",
      callback: (id) => "[एग्री-सिंक सहायता] कॉलबैक #" + id + " दर्ज। 15 मिनट में अधिकारी संपर्क करेंगे।",
      reminder: (id, time) => "[एग्री-सिंक अलर्ट] टोकन " + id + ": कल " + time + " बजे तुलाई है। पुष्टि के लिए 1 या बदलने के लिए 2 भेजें।",
      dropRecovery: (crop) => "[एग्री-सिंक अलर्ट] कॉल कटी। " + crop + " का विवरण 30 मिनट तक सुरक्षित है। पुनः कॉल करें।"
    }
  }
};

function checkSmsRateLimit(phone) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const history = smsRateLimitMap.get(phone) || [];
  const recent = history.filter((ts) => now - ts < windowMs);
  if (recent.length >= 8) return false;
  recent.push(now);
  smsRateLimitMap.set(phone, recent);
  return true;
}

// =========================================================================
// 4. API ENDPOINTS
// =========================================================================

// Problem 1: Dynamic PIN Resolution & Dual Mandi
router.post("/ivr/resolve-pincode", (req, res) => {
  const { callerPhone, pinCode } = req.body;
  const cleanPin = String(pinCode || "").trim();

  let row = null;
  let historicalCrops = [];

  if (db) {
    try {
      row = db.prepare("SELECT * FROM pincodes WHERE pincode = ?").get(cleanPin);
      if (!row) {
        row = db.prepare("SELECT * FROM pincodes WHERE pincode LIKE ? LIMIT 1").get(`${cleanPin.substring(0, 3)}%`);
      }
      if (row) {
        historicalCrops = db.prepare("SELECT crop_name, season, avg_yield_qtl_acre, historical_trend, msp_inr FROM regional_crop_history WHERE district = ?").all(row.district);
      }
    } catch (e) {
      console.warn("[SQLITE] Fallback applied:", e.message);
    }
  }

  if (!row) {
    const fb = fallbackPinDict[cleanPin] || fallbackPinDict["700036"];
    row = {
      pincode: cleanPin,
      district: fb.district,
      state: fb.state,
      primary_lang: fb.lang,
      mandi_primary_name: fb.mandi.split(",")[0],
      mandi_primary_dist_km: 2.5,
      mandi_primary_wait_min: 20,
      mandi_primary_address: fb.mandi,
      mandi_secondary_name: "Regional Secondary Yard",
      mandi_secondary_dist_km: 6.0,
      mandi_secondary_wait_min: 5,
      mandi_secondary_address: "Station Road Yard"
    };
  }

  if (!historicalCrops || historicalCrops.length === 0) {
    historicalCrops = [
      { crop_name: "Paddy (Rice)", season: "Kharif", avg_yield_qtl_acre: 19.2, historical_trend: "10-Yr High Yield", msp_inr: 2369 },
      { crop_name: "Wheat", season: "Rabi", avg_yield_qtl_acre: 21.0, historical_trend: "Stable Winter Grain", msp_inr: 2585 }
    ];
  }

  const session = sessionStore.get(callerPhone) || { phone: callerPhone, createdAt: Date.now() };
  session.pinCode = row.pincode;
  session.district = row.district;
  session.regionalLang = row.primary_lang;
  session.primaryMandi = { name: row.mandi_primary_name, dist: row.mandi_primary_dist_km, wait: row.mandi_primary_wait_min, address: row.mandi_primary_address };
  session.secondaryMandi = { name: row.mandi_secondary_name, dist: row.mandi_secondary_dist_km, wait: row.mandi_secondary_wait_min, address: row.mandi_secondary_address };
  session.mandiAddress = row.mandi_primary_address;
  session.historicalCrops = historicalCrops;
  sessionStore.set(callerPhone, session);

  const dualMandiPrompt = "Press 1 for " + row.mandi_primary_name + " (" + row.mandi_primary_dist_km + " km away, wait time " + row.mandi_primary_wait_min + " mins). Press 2 for " + row.mandi_secondary_name + " (" + row.mandi_secondary_dist_km + " km away, wait time " + row.mandi_secondary_wait_min + " mins).";

  res.json({
    success: true,
    region: { pincode: row.pincode, district: row.district, state: row.state, lang: row.primary_lang },
    dualMandiOptions: { primary: session.primaryMandi, secondary: session.secondaryMandi },
    dualMandiPrompt,
    historicalCrops
  });
});

router.post("/ivr/select-mandi", (req, res) => {
  const { callerPhone, selection } = req.body;
  const session = sessionStore.get(callerPhone) || {};
  if (selection === 2 && session.secondaryMandi) {
    session.mandiAddress = session.secondaryMandi.name + ", " + session.secondaryMandi.address;
  } else if (session.primaryMandi) {
    session.mandiAddress = session.primaryMandi.name + ", " + session.primaryMandi.address;
  }
  sessionStore.set(callerPhone, session);
  res.json({ success: true, selectedMandi: session.mandiAddress });
});

// Problem 4: Zero-Trust PIN Authentication
router.post("/ivr/verify-pin", (req, res) => {
  const { callerPhone, enteredPin } = req.body;
  const phone = callerPhone || "9876543210";
  const userRecord = farmerCredentialsStore.get(phone);

  if (!userRecord) return res.status(404).json({ success: false, authenticated: false, message: "Unregistered." });
  if (userRecord.isLocked) return res.status(403).json({ success: false, authenticated: false, message: "Locked." });

  const cleanPin = String(enteredPin || "").replace(/[^0-9]/g, "");
  const computedHash = crypto.pbkdf2Sync(cleanPin, userRecord.salt, 1000, 64, "sha512").toString("hex");

  if (computedHash === userRecord.pinHash) {
    userRecord.failedAttempts = 0;
    farmerCredentialsStore.set(phone, userRecord);
    return res.json({ success: true, authenticated: true, message: "Authentication successful." });
  } else {
    userRecord.failedAttempts += 1;
    if (userRecord.failedAttempts >= 3) userRecord.isLocked = true;
    farmerCredentialsStore.set(phone, userRecord);
    return res.status(401).json({ success: false, authenticated: false, attemptsRemaining: Math.max(0, 3 - userRecord.failedAttempts) });
  }
});

// Problem 2: Categorical Drill-down
router.post("/ivr/crop-drilldown", (req, res) => {
  const { callerPhone, step, selection } = req.body;
  const session = sessionStore.get(callerPhone) || { phone: callerPhone, lang: "bn", district: "Kolkata North" };

  if (step === "CATEGORY_SELECTED") {
    const categoryMap = { 6: "cereals", 7: "pulses", 8: "oilseeds" };
    const chosenCat = categoryMap[selection] || "cereals";
    session.category = chosenCat;

    let crops = [];
    if (db) {
      try {
        crops = db.prepare("SELECT crop_name AS name, msp_inr AS msp FROM regional_crop_history WHERE district = ?").all(session.district);
      } catch (e) {
        console.warn("[SQLITE] Crop query fallback:", e.message);
      }
    }
    if (!crops || crops.length === 0) {
      crops = [
        { name: "Paddy", msp: 2369 },
        { name: "Wheat", msp: 2585 },
        { name: "Maize", msp: 2400 }
      ];
    }
    session.activeCropOptions = crops;
    sessionStore.set(callerPhone, session);

    const promptText = crops.map((c, idx) => "Press " + (idx + 1) + " for " + c.name + " (MSP Rs " + c.msp + ")").join(". ") + ". Or speak your crop name.";
    return res.json({ success: true, category: chosenCat, crops, prompt: promptText });
  }
  res.json({ success: true });
});

// Problem 9: Quantity Bounds Enforcement
router.post("/ivr/validate-quantity", (req, res) => {
  const { quantity, lang, callerPhone, selectedCrop } = req.body;
  const qty = parseFloat(quantity);
  const selectedLang = lang || "bn";
  const dict = ivrDictionary[selectedLang] || ivrDictionary.en;

  if (isNaN(qty) || qty <= 0) return res.status(400).json({ success: false, message: "Invalid quantity." });
  if (qty > 150) {
    return res.json({ success: true, quantity: qty, holdRequired: true, prompt: dict.qtyChallenge });
  }

  const session = sessionStore.get(callerPhone) || { mandiAddress: "Cossipore Wholesale Mandi, Gate 2, Kolkata" };
  const tokenId = "TK-" + Math.floor(1000 + Math.random() * 9000);
  const finalCrop = selectedCrop || "Paddy";
  const allocatedSlot = "Tomorrow 10:30 AM - 11:00 AM";

  session.activeToken = tokenId;
  session.crop = finalCrop;
  session.quantity = String(qty);
  sessionStore.set(callerPhone, session);

  const smsRecord = {
    smsId: "SMS-" + Math.floor(10000 + Math.random() * 90000),
    recipientPhone: callerPhone || "9876543210",
    type: "SLOT_PASS_AUTOMATED",
    message: dict.sms.slot(tokenId, finalCrop, qty, session.mandiAddress, allocatedSlot),
    timestamp: new Date().toLocaleTimeString()
  };
  smsOutbox.unshift(smsRecord);

  res.json({ success: true, tokenId, crop: finalCrop, quantity: qty, mandiAddress: session.mandiAddress, slot: allocatedSlot, holdRequired: false, smsRecord });
});

// Operator Callback Desk
router.post("/ivr/register-callback", (req, res) => {
  const { callerPhone, lang } = req.body;
  const phone = callerPhone || "9876543210";
  const ticketId = "CBK-" + Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const deadline = new Date(now.getTime() + 15 * 60 * 1000);

  const ticket = {
    ticketId,
    callerPhone: phone,
    language: lang || "bn",
    requestedAt: now.toLocaleTimeString(),
    resolutionDeadline: deadline.toLocaleTimeString(),
    status: "PENDING_OPERATOR_CALL"
  };

  callbackTickets.unshift(ticket);

  const dict = ivrDictionary[lang] || ivrDictionary.en;
  const ackSms = {
    smsId: "SMS-" + Math.floor(10000 + Math.random() * 90000),
    recipientPhone: phone,
    type: "CALLBACK_ACK",
    message: dict.sms.callback(ticketId),
    timestamp: new Date().toLocaleTimeString()
  };
  smsOutbox.unshift(ackSms);

  res.json({ success: true, ticket, smsRecord: ackSms });
});

router.get("/ivr/callbacks", (req, res) => {
  res.json({ success: true, totalPending: callbackTickets.filter((t) => t.status !== "RESOLVED").length, callbacks: callbackTickets });
});

router.post("/ivr/resolve-callback", (req, res) => {
  const { ticketId } = req.body;
  const ticket = callbackTickets.find((t) => t.ticketId === ticketId);
  if (ticket) {
    ticket.status = "RESOLVED";
    return res.json({ success: true, ticket });
  }
  res.status(404).json({ success: false, message: "Ticket not found." });
});

// Problem 10: Omnichannel Handshake
router.post("/ivr/device-handshake", (req, res) => {
  const { phone, lang } = req.body;
  const session = sessionStore.get(phone) || {};
  const token = session.activeToken || "TK-1082";
  const crop = session.crop || "Paddy";
  const qty = session.quantity || "50";
  const mandi = session.mandiAddress || "Cossipore Wholesale Mandi, Gate 2, Kolkata";
  const slot = "Tomorrow 10:30 AM - 11:00 AM";

  const dict = ivrDictionary[lang || "bn"] || ivrDictionary.en;
  const passSms = {
    smsId: "SMS-" + Math.floor(10000 + Math.random() * 90000),
    recipientPhone: phone || "9876543210",
    type: "SMS_ENTRY_PASS",
    message: dict.sms.slot(token, crop, qty, mandi, slot),
    timestamp: new Date().toLocaleTimeString()
  };
  smsOutbox.unshift(passSms);

  res.json({ success: true, tokenId: token, crop, quantity: qty, mandiAddress: mandi, audioPrompt: dict.handshake(token, crop, qty, mandi), smsRecord: passSms });
});

router.post("/ivr/call-disconnect-webhook", (req, res) => {
  const { callerPhone, lastSelectedCrop, lang } = req.body;
  const dict = ivrDictionary[lang || "bn"] || ivrDictionary.en;
  const recoverySms = {
    smsId: "SMS-" + Math.floor(10000 + Math.random() * 90000),
    recipientPhone: callerPhone,
    type: "DROP_RECOVERY",
    message: dict.sms.dropRecovery(lastSelectedCrop || "Paddy"),
    timestamp: new Date().toLocaleTimeString()
  };
  smsOutbox.unshift(recoverySms);
  res.json({ success: true, message: "Call drop persisted." });
});

router.post("/ivr/trigger-reminder-alert", (req, res) => {
  const { callerPhone, tokenId, lang } = req.body;
  const dict = ivrDictionary[lang || "bn"] || ivrDictionary.en;
  const reminderSms = {
    smsId: "SMS-" + Math.floor(10000 + Math.random() * 90000),
    recipientPhone: callerPhone,
    type: "T24_REMINDER",
    message: dict.sms.reminder(tokenId || "TK-1082", "10:30 AM"),
    timestamp: new Date().toLocaleTimeString()
  };
  smsOutbox.unshift(reminderSms);
  res.json({ success: true, spokenPrompt: "Reminder for Token " + (tokenId || "TK-1082") + ": Unloading scheduled tomorrow at 10:30 AM.", smsRecord: reminderSms });
});

router.post("/escrow/submit-paper-form", (req, res) => {
  const { operatorId, farmerName, phone } = req.body;
  const submissionTimestamp = new Date().toISOString();
  const hmacSignature = crypto.createHmac("sha256", "secret_2026").update(operatorId + "|" + farmerName + "|" + phone).digest("hex");
  const escrowRecord = {
    submissionId: "ESCROW-" + Math.floor(10000 + Math.random() * 90000),
    operatorId,
    farmerName,
    phone,
    sanitizedGovtRef: "[Aadhaar Redacted]",
    timestamp: submissionTimestamp,
    hmacSignature
  };
  offlineEscrowSubmissions.unshift(escrowRecord);
  res.status(201).json({ success: true, escrowRecord });
});

router.get("/sms/history", (req, res) => res.json({ success: true, total: smsOutbox.length, outbox: smsOutbox }));

module.exports = router;