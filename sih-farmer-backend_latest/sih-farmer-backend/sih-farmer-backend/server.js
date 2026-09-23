const express = require("express");
const cors = require("cors");
const QRCode = require("qrcode");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const bcrypt = require("bcrypt");

const qrRoutes = require('./routes/qr');

const communicationsRoute = require("./routes/communications");

const farmerRouter = require("./routes/farmer");
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "sih_agrisync_secure_key_2026";


const db = require("./db");
app.use(cors());
app.use(express.json());
app.use('/api', qrRoutes);
app.use("/api/farmer", farmerRouter);

// =========================================================================
// 1. IN-MEMORY DATABASE & PRE-LOADED PROFILES
// =========================================================================

const users = [
  { id: "FARM-101", name: "Ramesh Patel", phone: "9876543210", role: "FARMER", district: "Pune", mandi: "Smart Mandi" },
  { id: "FARM-102", name: "S. Das", phone: "9876543211", role: "FARMER", district: "Pune", mandi: "Smart Mandi" },
  { id: "FARM-103", name: "A. Mondal", phone: "9876543212", role: "FARMER", district: "Pune", mandi: "Smart Mandi" },
  { id: "OP-901", name: "Supervisor Verma", phone: "9112233445", role: "OPERATOR", district: "Smart Mandi", mandi: "Smart Mandi" },
  { id: "ADM-001", name: "Director Sharma", phone: "9988776655", role: "ADMIN", district: "State HQ", mandi: "All Mandis" }
];

let tokens = [
  {
    id: "TK-1082",
    farmerId: "FARM-101",
    farmerName: "Ramesh Patel",
    cropType: "Wheat",
    quantity: "50 q",
    mandiCenter: "Smart Mandi",
    slotTime: "10:30 AM",
    date: "14-09-2026",
    status: "Verified",
    currentStep: 2,
    queuePosition: 1,
    farmersAhead: 3,
    estimatedWaitMinutes: 18,
    gateCheckedIn: true,
    checkInTimestamp: "10:15 AM",
    paymentStatus: "Pending Quality Check",
    payoutAmount: 129250,
    qrData: ""
  },
  {
    id: "TK-1084",
    farmerId: "FARM-103",
    farmerName: "A. Mondal",
    cropType: "Wheat",
    quantity: "42 q",
    mandiCenter: "Smart Mandi",
    slotTime: "11:30 AM",
    date: "14-09-2026",
    status: "Waiting",
    currentStep: 1,
    queuePosition: 2,
    farmersAhead: 4,
    estimatedWaitMinutes: 30,
    gateCheckedIn: false,
    checkInTimestamp: null,
    paymentStatus: "Pending Procurement",
    payoutAmount: 0,
    qrData: ""
  }
];

const mspPrices = [
  { crop: "Wheat", pricePerQuintal: 2585, formattedPrice: "₹2,585 / q", season: "Rabi", unit: "Quintal" },
  { crop: "Paddy (Common)", pricePerQuintal: 2369, formattedPrice: "₹2,369 / q", season: "Kharif", unit: "Quintal" },
  { crop: "Mustard", pricePerQuintal: 6200, formattedPrice: "₹6,200 / q", season: "Rabi", unit: "Quintal" },
  { crop: "Maize", pricePerQuintal: 2400, formattedPrice: "₹2,400 / q", season: "Kharif", unit: "Quintal" },
  { crop: "Gram (Chana)", pricePerQuintal: 5440, formattedPrice: "₹5,440 / q", season: "Rabi", unit: "Quintal" },
  { crop: "Soybean", pricePerQuintal: 4600, formattedPrice: "₹4,600 / q", season: "Kharif", unit: "Quintal" }
];

let procurementHistory = [
  { tokenId: "TK-1074", farmerId: "FARM-101", cropType: "Paddy", quantityDisplay: "40 q", date: "08 Sep 2026", amount: 94760, formattedAmount: "₹94,760", status: "Completed" },
  { tokenId: "TK-1058", farmerId: "FARM-101", cropType: "Wheat", quantityDisplay: "32 q", date: "26 Aug 2026", amount: 82720, formattedAmount: "₹82,720", status: "Completed" }
];

const supportInfo = {
  helpline: { title: "Helpline", number: "1800-000-2026", display: "Call 1800-000-2026", available: "24/7 Toll-Free Support" },
  procurementHelp: { title: "Procurement help", description: "Get guidance about your slot and token." },
  paymentSupport: { title: "Payment support", description: "Check payment and transaction status." },
  mandiLocation: { title: "Mandi location", description: "View your assigned procurement center." },
  faqs: [
    { q: "What documents do I need to bring?", a: "Original identity proof, bank passbook, and the digital token pass." },
    { q: "When will the DBT payment credit?", a: "Direct bank transfer triggers within 24 hours of weighbridge confirmation." }
  ]
};

const mandiAdvisories = [
  {
    id: "ADV-101",
    mandiCenter: "Smart Mandi",
    category: "Weather Alert",
    severity: "Warning",
    title: "Heavy Rainfall Forecast",
    message: "Rain expected from 02:00 PM. Covered sheds 3 and 4 have been activated for grain unloading.",
    actionRequired: "Ensure tarpaulin vehicle covers are tied securely before entry.",
    timestamp: "14-09-2026, 08:30 AM"
  },
  {
    id: "ADV-102",
    mandiCenter: "Smart Mandi",
    category: "Operations",
    severity: "Info",
    title: "Weighbridge #2 Maintenance",
    message: "Weighbridge #2 is undergoing routine sensor recalibration until 11:30 AM. Heavy tractor trolleys redirected to Gate B scale.",
    actionRequired: "Follow queue marshal instructions at Gate B.",
    timestamp: "14-09-2026, 09:00 AM"
  }
];

const localizationStrings = {
  en: {
    dashboardTitle: "Know your turn. Sell without the wait.",
    farmersAhead: "farmers ahead",
    estimatedWait: "Estimated waiting time",
    bookSlot: "Book New Slot",
    trackQueue: "Track Live Queue",
    liveQueue: "Live Queue",
    mspPrices: "MSP Prices",
    support: "Support",
    history: "Procurement History",
    callHelpline: "Call Helpline"
  },
  hi: {
    dashboardTitle: "अपनी बारी जानें। बिना इंतज़ार के बेचें।",
    farmersAhead: "किसान आपसे आगे हैं",
    estimatedWait: "अनुमानित प्रतीक्षा समय",
    bookSlot: "नया स्लॉट बुक करें",
    trackQueue: "लाइव कतार देखें",
    liveQueue: "लाइव कतार",
    mspPrices: "एमएसपी दरें",
    support: "सहायता केंद्र",
    history: "खरीद इतिहास",
    callHelpline: "हेल्पलाइन पर कॉल करें"
  },
  mr: {
    dashboardTitle: "तुमची वेळ जाणून घ्या. रांगेत न थांबता विका.",
    farmersAhead: "शेतकरी तुमच्या पुढे आहेत",
    estimatedWait: "अंदाजे प्रतीक्षा वेळ",
    bookSlot: "नवीन स्लॉट बुक करा",
    trackQueue: "थेट रांग पहा",
    liveQueue: "थेट रांग",
    mspPrices: "हमीभाव दर",
    support: "मदत केंद्र",
    history: "खरेदीचा इतिहास",
    callHelpline: "हेल्पलाइनवर कॉल करा"
  }
};

const supportTickets = [];

// Initialize QR passes
(async () => {
  for (const t of tokens) {
    t.qrData = await QRCode.toDataURL(
      JSON.stringify({
        tokenId: t.id,
        farmerId: t.farmerId,
        farmerName: t.farmerName,
        crop: t.cropType,
        quantity: t.quantity,
        mandi: t.mandiCenter,
        slotTime: t.slotTime,
        date: t.date
      })
    );
  }
})();

// =========================================================================
// 2. CRYPTOGRAPHIC AUDIT TRAIL (SHA-256 CHAINED BLOCKS)
// =========================================================================

const auditTrail = [];

function recordAuditEvent(actorId, actorRole, action, details, status) {
  const previousHash = auditTrail.length > 0 ? auditTrail[0].hash : "0000000000000000000000000000000000000000000000000000000000000000";
  const timestamp = new Date().toISOString();
  const rawPayload = `${previousHash}|${actorId}|${actorRole}|${action}|${status}|${timestamp}`;
  const currentHash = crypto.createHash("sha256").update(rawPayload).digest("hex");

  const logEntry = {
    index: auditTrail.length + 1,
    timestamp,
    actorId,
    actorRole,
    action,
    details,
    status,
    previousHash,
    hash: currentHash
  };

  auditTrail.unshift(logEntry);
  return logEntry;
}
app.locals.recordAuditEvent = recordAuditEvent;

// =========================================================================
// 3. CIA TRIAD SECURITY MIDDLEWARE (AUTHENTICATION & RBAC)
// =========================================================================

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    recordAuditEvent("ANONYMOUS", "UNKNOWN", "UNAUTHENTICATED_ACCESS_ATTEMPT", req.originalUrl, "DENIED");
    return res.status(401).json({
      success: false,
      code: "NO_TOKEN",
      message: "Access Denied: Missing cryptographic authentication token."
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      recordAuditEvent("UNVERIFIED", "ATTACKER", "SIGNATURE_FORGERY_DETECTED", req.originalUrl, "BLOCKED");
      return res.status(403).json({
        success: false,
        code: "INVALID_SIGNATURE",
        message: "Security Alert: Tampered or expired token signature detected."
      });
    }
    req.user = decodedUser;
    next();
  });
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      recordAuditEvent(req.user.id, req.user.role, "PRIVILEGE_VIOLATION_ATTEMPT", req.originalUrl, "BLOCKED");
      return res.status(403).json({
        success: false,
        code: "FORBIDDEN_ROLE",
        message: `Security Enforcement: Access denied. Required role: [${allowedRoles.join(", ")}]. Your role: '${req.user.role}'.`
      });
    }
    next();
  };
}

// =========================================================================
// 4. AUTHENTICATION (SIGNUP & LOGIN)
// =========================================================================

// app.post("/api/auth/signup-farmer", (req, res) => {
//   const { name, phone, district, mandi } = req.body;

//   if (!name || !phone) {
//     return res.status(400).json({ success: false, message: "Name and phone are required." });
//   }

//   const userExists = users.find((u) => u.phone === phone);
//   if (userExists) {
//     return res.status(409).json({ success: false, message: "User phone already registered. Please log in." });
//   }

//   const newFarmer = {
//     id: `FARM-${Math.floor(100 + Math.random() * 900)}`,
//     name,
//     phone,
//     role: "FARMER",
//     district: district || "Pune",
//     mandi: mandi || "Smart Mandi"
//   };

//   users.push(newFarmer);

//   const token = jwt.sign(
//     { id: newFarmer.id, name: newFarmer.name, role: newFarmer.role },
//     JWT_SECRET,
//     { expiresIn: "4h" }
//   );

//   recordAuditEvent(newFarmer.id, newFarmer.role, "USER_REGISTRATION", "Enrolled via secure endpoint", "SUCCESS");

//   res.status(201).json({
//     success: true,
//     message: "Farmer registered successfully.",
//     accessToken: token,
//     user: newFarmer
//   });
// });

// app.post("/api/farmer/signup", (req, res) => {
//   req.url = "/api/auth/signup-farmer";
//   app.handle(req, res);
// });

// app.post("/api/auth/login", (req, res) => {
//   const { phone } = req.body;
//   const user = users.find((u) => u.phone === phone);

//   if (!user) {
//     return res.status(404).json({ success: false, message: "Authentication failed. User not registered." });
//   }

//   const token = jwt.sign(
//     { id: user.id, name: user.name, role: user.role },
//     JWT_SECRET,
//     { expiresIn: "4h" }
//   );

//   recordAuditEvent(user.id, user.role, "USER_LOGIN_SUCCESS", "Authenticated session generated", "SUCCESS");

//   res.json({
//     success: true,
//     message: `Authenticated successfully as ${user.role}`,
//     accessToken: token,
//     user: { id: user.id, name: user.name, role: user.role, district: user.district, mandi: user.mandi }
//   });
// });

// app.post("/api/farmer/login", (req, res) => {
//   req.url = "/api/auth/login";
//   app.handle(req, res);
// });

// const express = require("express");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const db = require("./db");

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const JWT_SECRET = process.env.JWT_SECRET;


// =====================================================
// FARMER SIGNUP
// POST /api/auth/signup-farmer
// =====================================================

app.post("/api/auth/signup-farmer", (req, res) => {

    const { name, phone, district, mandi, state, pincode } = req.body;

    // Same validation as teammate's original code
    if (!name || !phone) {
        return res.status(400).json({
            success: false,
            message: "Name and phone are required."
        });
    }


    // -------------------------------------------------
    // Check whether phone already exists
    // -------------------------------------------------

    const checkSql = `
        SELECT *
        FROM farmers
        WHERE phone_number = ?
    `;

    db.query(checkSql, [phone], (err, results) => {

        if (err) {
            console.error("Error checking farmer:", err);

            return res.status(500).json({
                success: false,
                message: "Database error."
            });
        }


        // User already exists
        if (results.length > 0) {

            return res.status(409).json({
                success: false,
                message: "User phone already registered. Please log in."
            });
        }


        // -------------------------------------------------
        // Generate Farmer ID
        // -------------------------------------------------

        const farmerId =
            `FARM-${Math.floor(100 + Math.random() * 900)}`;


        // -------------------------------------------------
        // Insert farmer into MySQL
        // -------------------------------------------------

        const insertSql = `
            INSERT INTO farmers
            (
                farmer_id,
                name,
                phone_number,
                state,
                district,
                pincode
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;


        /*
          Your teammate's API only originally required:

          name
          phone
          district
          mandi

          But your MySQL table requires:

          state
          district
          pincode

          Therefore we provide defaults for now.
          Later the frontend registration form can send
          the actual state and pincode.
        */

        const farmerState = state || "West Bengal";
        const farmerDistrict = district || "Pune";
        const farmerPincode = pincode || "000000";


        const values = [
            farmerId,
            name,
            phone,
            farmerState,
            farmerDistrict,
            farmerPincode
        ];


        db.query(insertSql, values, (err, result) => {

            if (err) {

                console.error("Error creating farmer:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to register farmer."
                });
            }


            // -------------------------------------------------
            // Create JWT
            // -------------------------------------------------

            const newFarmer = {
                id: farmerId,
                name: name,
                phone: phone,
                role: "FARMER",
                district: farmerDistrict,
                mandi: mandi || "Smart Mandi"
            };


            const token = jwt.sign(
                {
                    id: newFarmer.id,
                    name: newFarmer.name,
                    role: newFarmer.role
                },
                JWT_SECRET,
                {
                    expiresIn: "4h"
                }
            );


            // -------------------------------------------------
            // Same response structure as teammate's API
            // -------------------------------------------------

            res.status(201).json({

                success: true,

                message: "Farmer registered successfully.",

                accessToken: token,

                user: newFarmer

            });

        });

    });

});


// =====================================================
// FARMER SIGNUP ALIAS
// POST /api/farmer/signup
// =====================================================

// app.post("/api/farmer/signup", (req, res) => {

//     req.url = "/api/auth/signup-farmer";

//     app.handle(req, res);

// });


// =====================================================
// LOGIN
// POST /api/auth/login
// =====================================================

app.post("/api/auth/login", async (req, res) => {

    const { phone, password } = req.body;

    if (!phone || !password) {
        return res.status(400).json({
            success: false,
            message: "Phone and password are required."
        });
    }

    try {

        const sql = `
            SELECT
                farmer_id,
                name,
                phone_number,
                state,
                district,
                pincode,
                password
            FROM farmers
            WHERE phone_number = ?
        `;

        const [results] = await db.query(sql, [phone]);

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Authentication failed. User not registered."
            });
        }

        const farmer = results[0];

        const passwordMatch = await bcrypt.compare(
            password,
            farmer.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid phone number or password."
            });
        }

        const token = jwt.sign(
            {
                id: farmer.farmer_id,
                name: farmer.name,
                role: "FARMER"
            },
            JWT_SECRET,
            {
                expiresIn: "4h"
            }
        );

        res.json({
            success: true,
            message: "Authenticated successfully as FARMER",
            accessToken: token,
            user: {
                id: farmer.farmer_id,
                name: farmer.name,
                role: "FARMER",
                district: farmer.district,
                mandi: "Smart Mandi"
            }
        });

    } catch (error) {

        console.error("Login database error:", error);

        return res.status(500).json({
            success: false,
            message: "Database error."
        });
    }
});
// =====================================================
// FARMER LOGIN ALIAS
// POST /api/farmer/login
// =====================================================

app.post("/api/farmer/login", (req, res) => {

    req.url = "/api/auth/login";

    app.handle(req, res);

});


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {

    res.json({
        message: "AgriSync Backend is running!"
    });

});


// =====================================================
// START SERVER
// =====================================================

// var PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});

// =========================================================================
// 5. CORE WORKFLOW: DASHBOARD, ML SLOTS & BOOKING (WITH BOUNDS ENFORCEMENT)
// =========================================================================

app.get(
  "/api/farmer/dashboard",
  authenticateToken,
  authorizeRoles("FARMER"),
  async (req, res) => {
    try {
      const farmerId = req.user.id;

      // Get farmer details
      const [farmerRows] = await db.execute(
        `
        SELECT farmer_id, name
        FROM farmers
        WHERE farmer_id = ?
        `,
        [farmerId]
      );

      if (farmerRows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Farmer profile not found"
        });
      }

      const farmer = farmerRows[0];

      // Get the farmer's active token
      const [tokenRows] = await db.execute(
        `
        SELECT
          t.token_id,
          t.farmer_id,
          t.mandi_id,
          t.crop_type,
          t.quantity_quintals,
          t.procurement_date,
          t.predicted_duration_mins,
          t.ml_slot_start,
          t.ml_slot_end,
          t.status,
          t.arrival_time,
          t.created_at,
          m.mandi_name
        FROM tokens t
        LEFT JOIN mandis m
          ON t.mandi_id = m.mandi_id
        WHERE t.farmer_id = ?
          AND t.status IN ('BOOKED', 'CHECKED_IN', 'INSPECTING')
        ORDER BY t.created_at DESC
        LIMIT 1
        `,
        [farmerId]
      );

      const activeToken = tokenRows.length > 0 ? tokenRows[0] : null;

      let farmersAhead = 0;
      let estimatedWaitMinutes = 0;

if (activeToken) {

  // Get all active farmers ahead of this farmer
  const [aheadRows] = await db.execute(
    `
    SELECT predicted_duration_mins
    FROM tokens
    WHERE mandi_id = ?
      AND status IN ('BOOKED', 'CHECKED_IN', 'INSPECTING')
      AND created_at < ?
    ORDER BY created_at ASC
    `,
    [activeToken.mandi_id, activeToken.created_at]
  );

  farmersAhead = aheadRows.length;

  // Sum the predicted processing time of each farmer ahead
  estimatedWaitMinutes = aheadRows.reduce(
    (total, farmer) =>
      total + (Number(farmer.predicted_duration_mins) || 15),
    0
  );
}

      recordAuditEvent(
        req.user.id,
        req.user.role,
        "READ_FARMER_DASHBOARD",
        "Fetched personal dashboard from database",
        "SUCCESS"
      );

      res.json({
        success: true,

        farmer: {
          id: farmer.farmer_id,
          name: farmer.name
        },

        activeToken: activeToken
          ? {
              tokenId: activeToken.token_id,
              farmerId: activeToken.farmer_id,
              mandiId: activeToken.mandi_id,
              mandiName: activeToken.mandi_name,
              cropType: activeToken.crop_type,
              quantity: Number(activeToken.quantity_quintals),
              procurementDate: activeToken.procurement_date,
              predictedDurationMinutes:
                Number(activeToken.predicted_duration_mins || 15),
              slotStart: activeToken.ml_slot_start,
              slotEnd: activeToken.ml_slot_end,
              status: activeToken.status,
              arrivalTime: activeToken.arrival_time,
              createdAt: activeToken.created_at
            }
          : null,

        farmersAhead,
        estimatedWaitMinutes
      });

    } catch (error) {

      console.error("FARMER DASHBOARD ERROR:", error);

      res.status(500).json({
        success: false,
        message: "Failed to load farmer dashboard"
      });
    }
  }
);

app.get(
  "/api/farmer/live-queue",
  authenticateToken,
  authorizeRoles("FARMER", "OPERATOR", "ADMIN"),
  async (req, res) => {
    try {
      // 1. Find the logged-in farmer's active token
      const [myTokenRows] = await db.execute(
        `
        SELECT
          t.token_id,
          t.farmer_id,
          t.mandi_id,
          t.procurement_date,
          t.ml_slot_start,
          t.ml_slot_end,
          t.status
        FROM tokens t
        WHERE t.farmer_id = ?
          AND t.status IN ('BOOKED', 'CHECKED_IN', 'INSPECTING')
        ORDER BY t.created_at DESC
        LIMIT 1
        `,
        [req.user.id]
      );

      const myTokenRow = myTokenRows[0];

      // 2. No active booking
      if (!myTokenRow) {
        return res.json({
          success: true,
          myToken: null,
          stepper: {
            currentStep: 1,
            steps: [
              "Gate Scan",
              "Quality Check",
              "Weighbridge",
              "Payment"
            ]
          },
          farmersInQueue: []
        });
      }

      // 3. Mandi processing capacity
      const MANDI_CAPACITY = {
        "MD-KOL-001": 3,
        "MD-KOL-002": 2,
        "MD-KOL-003": 3,
        "MD-HOW-001": 2,
        "MD-HUG-001": 3,
        "MD-NAD-001": 3,
        "MD-BRD-001": 2,
        "MD-MUR-001": 2,
      };

      const capacity =
        MANDI_CAPACITY[myTokenRow.mandi_id] || 2;

      // 4. Get ONLY active farmers from the
      //    same mandi + same date + same slot
      const [queueRows] = await db.execute(
        `
        SELECT
          t.token_id,
          t.farmer_id,
          t.mandi_id,
          t.crop_type,
          t.quantity_quintals,
          t.predicted_duration_mins,
          t.ml_slot_start,
          t.ml_slot_end,
          t.status,
          t.arrival_time,
          t.completion_time,
          t.created_at,
          m.mandi_name
        FROM tokens t
        LEFT JOIN mandis m
          ON t.mandi_id = m.mandi_id
        WHERE t.mandi_id = ?
          AND t.procurement_date = ?
          AND t.ml_slot_start = ?
          AND t.status IN (
            'BOOKED',
            'CHECKED_IN',
            'INSPECTING'
          )
        ORDER BY t.created_at ASC
        `,
        [
          myTokenRow.mandi_id,
          myTokenRow.procurement_date,
          myTokenRow.ml_slot_start
        ]
      );

      // 5. Calculate queue position and estimated waiting time
      const farmersInQueue = queueRows.map((t, index) => {

        // Farmers before this farmer
        const farmersAhead = queueRows.slice(0, index);

        let estimatedWait = 0;

        // Process farmers ahead in parallel batches
        for (
          let i = 0;
          i < farmersAhead.length;
          i += capacity
        ) {
          const batch = farmersAhead.slice(
            i,
            i + capacity
          );

          const batchDuration = Math.max(
            ...batch.map(
              farmer =>
                Number(
                  farmer.predicted_duration_mins
                ) || 15
            )
          );

          estimatedWait += batchDuration;
        }

        return {
          tokenId: t.token_id,

          farmerName:
            String(t.farmer_id) === String(req.user.id)
              ? req.user.name
              : `Farmer ${String(t.farmer_id).slice(-4)}`,

          cropType: t.crop_type,

          quantity: `${t.quantity_quintals} q`,

          mandiId: t.mandi_id,

          mandiName: t.mandi_name,

          status: t.status,

          queuePosition: index + 1,

          waitMinutes: `${estimatedWait} min`,

          predictedDurationMinutes:
            Number(t.predicted_duration_mins) || 15,

          slotStart: t.ml_slot_start,

          slotEnd: t.ml_slot_end
        };
      });

      // 6. Find logged-in farmer's queue entry
      const myQueueEntry = farmersInQueue.find(
        (t) =>
          t.tokenId === myTokenRow.token_id
      );

      // 7. Send response
      res.json({
        success: true,

        myToken: myQueueEntry || null,

        stepper: {
          currentStep:
            myTokenRow.status === "BOOKED"
              ? 1
              : myTokenRow.status === "CHECKED_IN"
              ? 2
              : myTokenRow.status === "INSPECTING"
              ? 3
              : 1,

          steps: [
            "Gate Scan",
            "Quality Check",
            "Weighbridge",
            "Payment"
          ]
        },

        farmersInQueue
      });

    } catch (error) {
      console.error(
        "LIVE QUEUE ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message: "Failed to load live queue"
      });
    }
  }
);

const MANDI_CAPACITY = {
  "MD-KOL-001": 3,
  "MD-KOL-002": 2,
  "MD-KOL-003": 3,
  "MD-HOW-001": 2,
  "MD-HUG-001": 3,
  "MD-NAD-001": 3,
  "MD-BRD-001": 2,
  "MD-MUR-001": 2,
}
//added mandi capacity for enhanced at time calculation during recommending mandis
app.get(
  "/api/farmer/recommended-mandis",

  authenticateToken,

  authorizeRoles("FARMER"),

  async (req, res) => {

    try {

      const farmerId = req.user.id

      const {
        crop,
        quantity,
        date,
        slot
      } = req.query

      // --------------------------------------------------
      // 1. Validate booking details
      // --------------------------------------------------

      if (!crop || !quantity || !date || !slot) {

        return res.status(400).json({
          success: false,
          message:
            "Crop, quantity, date and slot are required"
        })

      }

      const quantityValue = Number(quantity)

      if (!Number.isFinite(quantityValue) || quantityValue <= 0) {

        return res.status(400).json({
          success: false,
          message: "Invalid quantity"
        })

      }

      // --------------------------------------------------
      // 2. Convert slot from AM/PM to MySQL TIME
      // --------------------------------------------------

      const convertSlotToTime = (slotTime) => {

        const match = slotTime.match(
          /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
        )

        if (!match) {
          throw new Error("Invalid slot format")
        }

        let hour = Number(match[1])

        const minute = match[2]

        const period = match[3].toUpperCase()

        if (period === "PM" && hour !== 12) {
          hour += 12
        }

        if (period === "AM" && hour === 12) {
          hour = 0
        }

        return `${String(hour).padStart(2, "0")}:${minute}:00`
      }

      const slotStart = convertSlotToTime(slot)

      // --------------------------------------------------
      // 3. Find the 3 nearest mandis
      // --------------------------------------------------

      const [mandis] = await db.execute(
        `
        SELECT
          m.mandi_id,
          m.mandi_name,
          m.district,
          m.state,

          ROUND(
            ST_Distance_Sphere(
              f.registered_location,
              m.location
            ) / 1000,
            2
          ) AS distance_km

        FROM farmers f

        CROSS JOIN mandis m

        WHERE f.farmer_id = ?

          AND f.registered_location IS NOT NULL

          AND m.location IS NOT NULL

        ORDER BY distance_km ASC

        LIMIT 3
        `,
        [farmerId]
      )

      // --------------------------------------------------
      // 4. Calculate waiting time for each mandi
      // --------------------------------------------------

      const recommendedMandis = await Promise.all(

        mandis.map(async (mandi) => {

          const [queueRows] = await db.execute(
            `
            SELECT
              predicted_duration_mins

            FROM tokens

            WHERE mandi_id = ?

              AND procurement_date = ?

              AND ml_slot_start = ?

              AND status IN (
                'BOOKED',
                'CHECKED_IN',
                'INSPECTING'
              )

            ORDER BY created_at ASC
            `,
            [
              mandi.mandi_id,
              date,
              slotStart
            ]
          )
          console.log(
          "MANDI QUEUE DEBUG:",
          mandi.mandi_id,
          "DATE:",
          date,
          "SLOT:",
          slotStart,
          "FARMERS:",
          queueRows.length,
          "DURATIONS:",
          queueRows.map(
            farmer => farmer.predicted_duration_mins
          )
        )

          // Sum predicted processing duration
          // of farmers already in this mandi/slot

          const capacity = MANDI_CAPACITY[mandi.mandi_id] || 2

          const farmerDurations = queueRows.map(
            farmer =>
              Number(farmer.predicted_duration_mins) || 15
          )

          // No existing farmers → no waiting
          if (farmerDurations.length === 0) {
            return {
              mandi_id: mandi.mandi_id,
              mandi_name: mandi.mandi_name,
              district: mandi.district,
              state: mandi.state,
              distance_km: Number(mandi.distance_km),
              estimated_waiting_time: "0 min"
            }
          }

          // Divide existing farmers into processing batches
          let estimatedWaitMinutes = 0

          for (
            let i = 0;
            i < farmerDurations.length;
            i += capacity
          ) {

            const batch = farmerDurations.slice(
              i,
              i + capacity
            )

            // Farmers in the same batch can be processed
            // in parallel, so use the longest duration.
            estimatedWaitMinutes += Math.max(...batch)
          }

          estimatedWaitMinutes = Math.round(
            estimatedWaitMinutes
          )

          return {

            mandi_id: mandi.mandi_id,

            mandi_name: mandi.mandi_name,

            district: mandi.district,

            state: mandi.state,

            distance_km:
              Number(mandi.distance_km),

            estimated_waiting_time:
              `${estimatedWaitMinutes} min`

          }

        })

      )

      // --------------------------------------------------
      // 5. Send response
      // --------------------------------------------------

      res.json({

        success: true,

        mandis: recommendedMandis

      })

    } catch (error) {

      console.error(
        "RECOMMENDED MANDIS ERROR:",
        error
      )

      res.status(500).json({

        success: false,

        message:
          "Unable to fetch recommended mandis"

      })

    }

  }
)
app.post("/api/farmer/book-slot", authenticateToken, authorizeRoles("FARMER"), async (req, res) => {

  const { cropType, quantity, date, slotTime, mandiId } = req.body;

  const qtyVal = parseFloat(quantity);

  if (!mandiId) {
    return res.status(400).json({
      success: false,
      message: "Please select a mandi"
    });
  }

  if (!cropType || isNaN(qtyVal)) {
    return res.status(400).json({
      success: false,
      message: "Crop type and a valid quantity are required."
    });
  }

  if (qtyVal > 150) {
    recordAuditEvent(
      req.user.id,
      req.user.role,
      "QUANTITY_ESCROW_HOLD",
      `Entered ${qtyVal} Qtl. Blocked without supervisor review.`,
      "FLAGGED"
    );

    return res.status(400).json({
      success: false,
      code: "QUANTITY_EXCEEDED",
      message: "Quantity exceeds single-trolley limit (150 Quintals). Requires Mandi Supervisor review."
    });
  }
// --------------------------------------------------
// 1. Generate token
// --------------------------------------------------

const newTokenId =
  `TK-${Math.floor(1000 + Math.random() * 9000)}`;


// --------------------------------------------------
// 2. Find selected mandi
// --------------------------------------------------

const [mandiRows] = await db.execute(
  `
    SELECT mandi_id, mandi_name
    FROM mandis
    WHERE mandi_id = ?
  `,
  [mandiId]
);

if (mandiRows.length === 0) {

  return res.status(400).json({
    success: false,
    message: "Selected mandi not found"
  });

}

const selectedMandiData = mandiRows[0];


// --------------------------------------------------
// 3. Prepare slot time
// --------------------------------------------------

const selectedSlotTime =
  slotTime || "10:30 AM";


function convertToMySQLTime(timeString) {

  if (!timeString) {
    return "10:30:00";
  }

  const match =
    timeString.match(
      /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
    );

  if (!match) {
    return timeString;
  }

  let hours =
    parseInt(match[1], 10);

  const minutes =
    match[2];

  const period =
    match[3].toUpperCase();

  if (
    period === "PM" &&
    hours !== 12
  ) {
    hours += 12;
  }

  if (
    period === "AM" &&
    hours === 12
  ) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${minutes}:00`;
}


const mlSlotStart =
  convertToMySQLTime(selectedSlotTime);


// --------------------------------------------------
// 3A. Determine crop category
// --------------------------------------------------

const cropCategories = {

  "Paddy": "food_grains",
  "Wheat": "food_grains",

  "Cotton": "commercial_and_fibre",
  "Sugarcane": "commercial_and_fibre",
  "Jute": "commercial_and_fibre",

  "Maize": "coarse_cereals",
  "Bajra (Pearl Millet)": "coarse_cereals",
  "Jowar (Sorghum)": "coarse_cereals",
  "Ragi (Finger Millet)": "coarse_cereals",

  "Gram (Chana)": "pulses",
  "Arhar (Tur)": "pulses",
  "Moong": "pulses",
  "Urad": "pulses",

  "Mustard": "oilseeds",
  "Groundnut": "oilseeds",
  "Soybean": "oilseeds"

};


const cropCategory =
  cropCategories[cropType];


if (!cropCategory) {

  return res.status(400).json({
    success: false,
    message: "Unsupported crop type"
  });

}


// --------------------------------------------------
// 3B. Prepare date features for ML
// --------------------------------------------------

const procurementDate =
  date ||
  new Date()
    .toISOString()
    .slice(0, 10);


const procurementDateObj =
  new Date(
    `${procurementDate}T00:00:00`
  );


if (
  isNaN(
    procurementDateObj.getTime()
  )
) {

  return res.status(400).json({
    success: false,
    message: "Invalid procurement date"
  });

}


const slotHour =
  parseInt(
    mlSlotStart.split(":")[0],
    10
  );


const dayOfWeek =
  procurementDateObj.getDay() === 0
    ? 6
    : procurementDateObj.getDay() - 1;


const month =
  procurementDateObj.getMonth() + 1;


// --------------------------------------------------
// 3C. Get current crowd for selected mandi + slot
// --------------------------------------------------

const [slotCrowdRows] =
  await db.execute(
    `
      SELECT COUNT(*) AS farmer_count
      FROM tokens
      WHERE mandi_id = ?
        AND procurement_date = ?
        AND ml_slot_start = ?
        AND status IN (
          'BOOKED',
          'CHECKED_IN',
          'INSPECTING'
        )
    `,
    [
      selectedMandiData.mandi_id,
      procurementDate,
      mlSlotStart
    ]
  );


const farmersInSelectedSlot =
  Number(
    slotCrowdRows[0]?.farmer_count || 0
  );


// --------------------------------------------------
// 3D. Get active queue count
// --------------------------------------------------

const [queueRows] =
  await db.execute(
    `
      SELECT
        COUNT(*) AS active_queue_count,
        COALESCE(
          SUM(predicted_duration_mins),
          0
        ) AS total_predicted_duration
      FROM tokens
      WHERE mandi_id = ?
        AND status IN (
          'BOOKED',
          'CHECKED_IN',
          'INSPECTING'
        )
    `,
    [
      selectedMandiData.mandi_id
    ]
  );


const activeQueueCount =
  Number(
    queueRows[0]?.active_queue_count || 0
  );


const totalPredictedDuration =
  Number(
    queueRows[0]?.total_predicted_duration || 0
  );


// --------------------------------------------------
// 3E. Call AgriSync ML FastAPI
// --------------------------------------------------

let predictedDurationMins;


try {

  const mlResponse =
    await fetch(
      "http://127.0.0.1:8000/predict",
      {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          mandi_id:
            selectedMandiData.mandi_id,

          crop_type:
            cropType,

          crop_category:
            cropCategory,

          quantity_quintals:
            qtyVal,

          slot_hour:
            slotHour,

          day_of_week:
            dayOfWeek,

          month:
            month,

          farmers_in_selected_slot:
            farmersInSelectedSlot,

          active_queue_count:
            activeQueueCount

        })

      }
    );


  if (!mlResponse.ok) {

    throw new Error(
      `ML API returned ${mlResponse.status}`
    );

  }


  const mlResult =
    await mlResponse.json();


  if (
    !mlResult.success ||
    mlResult.predicted_duration_mins == null
  ) {

    throw new Error(
      "Invalid ML prediction response"
    );

  }


  predictedDurationMins =
    Number(
      mlResult.predicted_duration_mins
    );


  console.log(
    "ML PREDICTION:",
    predictedDurationMins,
    "minutes"
  );


} catch (error) {

  console.error(
    "ML PREDICTION ERROR:",
    error
  );

  return res.status(503).json({

    success: false,

    message:
      "ML prediction service is currently unavailable. Please try again."

  });

}


// --------------------------------------------------
// 3F. Calculate ML slot end
// --------------------------------------------------

function addMinutesToTime(
  timeString,
  minutesToAdd
) {

  const [
    hours,
    minutes,
    seconds
  ] =
    timeString
      .split(":")
      .map(Number);


  const totalMinutes =
    hours * 60 +
    minutes +
    minutesToAdd;


  const finalHours =
    Math.floor(
      (totalMinutes / 60) % 24
    );


  const finalMinutes =
    totalMinutes % 60;


  return `${String(finalHours).padStart(2, "0")}:${String(finalMinutes).padStart(2, "0")}:00`;
}


const mlSlotEnd =
  addMinutesToTime(
    mlSlotStart,
    predictedDurationMins
  );


// --------------------------------------------------
// 3G. Calculate queue position / wait
// --------------------------------------------------

const totalBefore =
  activeQueueCount;


const estimatedWait =
  totalPredictedDuration;

  // --------------------------------------------------
  // 4. Prepare QR ticket
  // --------------------------------------------------

  const ticketPayload = {
    tokenId: newTokenId,
    farmerId: req.user.id,
    farmerName: req.user.name,
    crop: cropType,
    quantity: `${qtyVal} q`,
    mandiCenter: selectedMandiData.mandi_name,
    mandiId: selectedMandiData.mandi_id,
    slotTime: selectedSlotTime,
    date: procurementDate,
    issuedAt: new Date().toISOString()
  };

  const qrData = await QRCode.toDataURL(
    JSON.stringify(ticketPayload)
  );

  // --------------------------------------------------
  // 5. INSERT BOOKING INTO DATABASE
  // --------------------------------------------------

  await db.execute(
    `
      INSERT INTO tokens (
        token_id,
        farmer_id,
        mandi_id,
        crop_type,
        quantity_quintals,
        procurement_date,
        predicted_duration_mins,
        ml_slot_start,
        ml_slot_end,
        status,
        arrival_time,
        completion_time
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      newTokenId,
      req.user.id,
      selectedMandiData.mandi_id,
      cropType,
      qtyVal,
      procurementDate,
      predictedDurationMins,
      mlSlotStart,
      mlSlotEnd,
      "BOOKED",
      null,
      null
    ]
  );

  // --------------------------------------------------
  // 6. Keep existing in-memory token
  //    so current frontend/queue continues working
  // --------------------------------------------------

  const newToken = {
    id: newTokenId,
    farmerId: req.user.id,
    farmerName: req.user.name,
    cropType,
    quantity: `${qtyVal} q`,
    mandiCenter: selectedMandiData.mandi_name,
    mandiId: selectedMandiData.mandi_id,
    slotTime: selectedSlotTime,
    date: procurementDate,
    status: "Waiting",
    currentStep: 1,
    queuePosition: totalBefore + 1,
    farmersAhead: totalBefore,
    estimatedWaitMinutes: estimatedWait,
    predictedDurationMins: predictedDurationMins,
    gateCheckedIn: false,
    checkInTimestamp: null,
    paymentStatus: "Pending Procurement",
    payoutAmount: 0,
    qrData
  };

  tokens.push(newToken);

  // --------------------------------------------------
  // 7. Audit
  // --------------------------------------------------

  recordAuditEvent(
    req.user.id,
    req.user.role,
    "SLOT_BOOKED",
    `Token ${newTokenId} generated and committed to database`,
    "SUCCESS"
  );

  // --------------------------------------------------
  // 8. Return same response as before
  // --------------------------------------------------

  return res.status(201).json({
    success: true,
    message: "Procurement Slot Booked. Digital QR Token Generated.",
    token: newToken
  });

});

app.get("/api/farmer/token/:id", (req, res) => {
  const token = tokens.find((t) => t.id === req.params.id);
  if (!token) return res.status(404).json({ success: false, message: "Token not found" });
  res.json({ success: true, token });
});

// =========================================================================
// 6. GATE SCANNER & OPERATOR QUEUE (OPERATOR & ADMIN ONLY)
// =========================================================================

app.get("/api/operator/queue", authenticateToken,  authorizeRoles("OPERATOR", "ADMIN"), (req, res) => {
  recordAuditEvent(req.user.id, req.user.role, "READ_MANDI_QUEUE", "Inspected active procurement queue", "SUCCESS");
  res.json({ success: true, totalInQueue: tokens.length, queue: tokens });
});

app.post("/api/mandi/scan-qr-pass", authenticateToken, authorizeRoles("OPERATOR", "ADMIN"), (req, res) => {
  const { qrContentString, tokenId } = req.body;
  let lookupId = tokenId;

  if (qrContentString) {
    try {
      const parsed = JSON.parse(qrContentString);
      lookupId = parsed.tokenId;
    } catch {
      lookupId = qrContentString;
    }
  }

  const token = tokens.find((t) => t.id === lookupId);

  if (!token) {
    recordAuditEvent(req.user.id, req.user.role, "INVALID_SCAN_ATTEMPT", `Lookup ID: ${lookupId}`, "FLAGGED");
    return res.status(404).json({ success: false, message: "INVALID QR PASS. No booking found." });
  }

  if (token.gateCheckedIn) {
    recordAuditEvent(req.user.id, req.user.role, "DUPLICATE_ENTRY_FLAGGED", `Token ${token.id} reuse attempt`, "FLAGGED");
    return res.status(400).json({
      success: false,
      message: `Token ${token.id} already scanned at ${token.checkInTimestamp}. Duplicate entry rejected.`,
      ticketDetails: token
    });
  }

  token.gateCheckedIn = true;
  token.checkInTimestamp = new Date().toLocaleTimeString();
  token.status = "Verified";
  token.currentStep = 2;

  recordAuditEvent(req.user.id, req.user.role, "GATE_CHECKIN_AUTHORIZED", `Admitted ${token.farmerName} (${token.id})`, "SUCCESS");

  res.json({
    success: true,
    gateAccess: "GRANTED",
    message: `Entry Granted! Welcome ${token.farmerName}. Proceed to Quality Inspection.`,
    ticketDetails: token
  });
});

// =========================================================================
// 7. SUPPLEMENTARY ENDPOINTS & ANTI-CORRUPTION DBT ESCROW
// =========================================================================

app.get("/api/market/msp-prices", (req, res) => {
  const { crop, season } = req.query;
  let list = [...mspPrices];

  if (crop) {
    list = list.filter((item) => item.crop.toLowerCase().includes(crop.toLowerCase()));
  }
  if (season) {
    list = list.filter((item) => item.season.toLowerCase() === season.toLowerCase());
  }

  res.json({ success: true, count: list.length, currency: "INR (₹)", mspPrices: list });
});

app.get("/api/farmer/history/:farmerId", authenticateToken, (req, res) => {
  const { farmerId } = req.params;

  if (req.user.role === "FARMER" && req.user.id !== farmerId) {
    return res.status(403).json({ success: false, message: "Unauthorized access to another farmer's history." });
  }

  const history = procurementHistory.filter((h) => h.farmerId === farmerId);
  res.json({ success: true, farmerId, totalRecords: history.length, records: history });
});

app.get("/api/farmer/support-info", (req, res) => {
  res.json({ success: true, support: supportInfo });
});

app.post("/api/farmer/ticket", authenticateToken, (req, res) => {
  const { issueType, description } = req.body;

  if (!issueType || !description) {
    return res.status(400).json({ success: false, message: "issueType and description are required." });
  }

  const ticket = {
    ticketId: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
    farmerId: req.user.id,
    issueType,
    description,
    status: "Open",
    createdAt: new Date().toLocaleString()
  };

  supportTickets.unshift(ticket);
  recordAuditEvent(req.user.id, req.user.role, "SUPPORT_TICKET_CREATED", `Ticket ${ticket.ticketId}: ${issueType}`, "SUCCESS");

  res.status(201).json({ success: true, message: "Support ticket registered successfully.", ticket });
});

app.get("/api/market/advisory", (req, res) => {
  const { mandi } = req.query;
  let advisories = [...mandiAdvisories];

  if (mandi) {
    advisories = advisories.filter((a) =>
      a.mandiCenter.toLowerCase().includes(mandi.toLowerCase())
    );
  }

  res.json({ success: true, count: advisories.length, activeAdvisories: advisories });
});

app.get("/api/system/localization", (req, res) => {
  const lang = (req.query.lang || "en").toLowerCase();
  const strings = localizationStrings[lang] || localizationStrings["en"];

  res.json({ success: true, language: lang, availableLanguages: ["en", "hi", "mr"], strings });
});

app.post("/api/procurement/generate-receipt", authenticateToken, authorizeRoles("OPERATOR", "ADMIN"), (req, res) => {
  const { tokenId, netWeightQuintal, moistureContentPercent } = req.body;
  const token = tokens.find((t) => t.id === tokenId);

  if (!token) {
    return res.status(404).json({ success: false, message: "Token not found" });
  }

  const mspRate = 2585;
  const grossPayable = Math.round(netWeightQuintal * mspRate);
  const deduction = moistureContentPercent > 12 ? Math.round(grossPayable * 0.02) : 0;
  const netPayable = grossPayable - deduction;

  const settlementPayload = `${token.id}|${token.farmerId}|${netWeightQuintal}|${netPayable}|DBT_ESCROW_LOCKED`;
  const receiptHash = crypto.createHmac("sha256", JWT_SECRET).update(settlementPayload).digest("hex");

  const receipt = {
    receiptId: `REC-${Math.floor(100000 + Math.random() * 900000)}`,
    tokenId: token.id,
    farmerName: token.farmerName,
    farmerId: token.farmerId,
    cropType: token.cropType,
    grossWeight: `${netWeightQuintal} Quintals`,
    moistureDeduction: deduction > 0 ? `₹${deduction} (Moisture > 12%)` : "₹0 (Compliant)",
    finalDbtPayout: `₹${netPayable.toLocaleString('en-IN')}`,
    bankTransferStatus: "DBT Escrow Triggered (Within 24 Hours)",
    cryptographicSeal: receiptHash,
    issuedBy: req.user.name,
    timestamp: new Date().toISOString()
  };

  // Sync token state through completion
  token.currentStep = 4;
  token.status = "Completed";
  token.paymentStatus = "Paid";
  token.payoutAmount = netPayable;

  // Append directly to live history ledger
  procurementHistory.unshift({
    tokenId: token.id,
    farmerId: token.farmerId,
    cropType: token.cropType || "Wheat",
    quantityDisplay: `${netWeightQuintal} q`,
    date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    amount: netPayable,
    formattedAmount: `₹${netPayable.toLocaleString('en-IN')}`,
    status: "Completed"
  });

  recordAuditEvent(req.user.id, req.user.role, "DBT_RECEIPT_ISSUED", `Receipt ${receipt.receiptId} generated for ${token.farmerName}`, "SUCCESS");

  res.status(201).json({
    success: true,
    message: "Tamper-Proof DBT Settlement Receipt Generated",
    receipt
  });
});

app.post("/api/procurement/verify-receipt", (req, res) => {
  const { tokenId, farmerId, netWeight, netPayable, digitalSeal } = req.body;

  const expectedPayload = `${tokenId}|${farmerId}|${netWeight}|${netPayable}|DBT_ESCROW_LOCKED`;
  const computedHash = crypto.createHmac("sha256", JWT_SECRET).update(expectedPayload).digest("hex");

  if (computedHash === digitalSeal) {
    res.json({
      success: true,
      integrity: "AUTHENTIC & VERIFIED",
      message: "The government payment receipt is authentic. No unauthorized alteration detected."
    });
  } else {
    recordAuditEvent("UNKNOWN", "EXTERNAL_AUDITOR", "TAMPERED_RECEIPT_DETECTED", `Forged seal for Token ${tokenId}`, "FLAGGED");
    res.status(400).json({
      success: false,
      integrity: "COMPROMISED / FORGED",
      message: "Security Alert: Receipt details have been altered or tampered with."
    });
  }
});

// =========================================================================
// 8. JURY AUDIT SHOWCASE & STATE LEDGER (ADMIN ONLY)
// =========================================================================

app.get("/api/admin/audit-ledger", authenticateToken, authorizeRoles("ADMIN"), (req, res) => {
  res.json({
    success: true,
    ledgerType: "SHA-256 Cryptographic Chain",
    totalEvents: auditTrail.length,
    auditTrail
  });
});

app.get("/api/admin/state-dashboard", authenticateToken, authorizeRoles("ADMIN"), (req, res) => {
  res.json({
    success: true,
    message: `Executive State Level Ledger granted for ${req.user.name}`,
    activeMandis: 20,
    statewideWaitAvg: "14 min",
    auditRecords: tokens.map((t) => ({ tokenId: t.id, farmer: t.farmerName, crop: t.cropType, status: t.status }))
  });
});

// Base Route
app.get("/", (req, res) => {
  res.json({ status: "success", message: "AGRISync Unified Secure Backend is Live!" });
});

// Mount Communications (IVR, SMS & Bhashini Engine)
app.use("/api/notify", communicationsRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`===========================================`);
  console.log(`Unified AGRISync Security Engine on http://localhost:${PORT}`);
  console.log(`===========================================`);
});

app.get('/api/location', async (req, res) => {
  const { pincode } = req.query;

  try {
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        error: 'Invalid pincode'
      });
    }

    const result = await db.execute(
      `SELECT
          pincode,
          district,
          state,
          ST_X(location) AS longitude,
          ST_Y(location) AS latitude
       FROM pincode_centroids
       WHERE pincode = ?`,
      [pincode]
    );

    console.log("DATABASE RESULT:", result);

    const rows = result[0];

    if (rows.length === 0) {
      return res.status(404).json({
        error: 'Pincode not found'
      });
    }

    const location = rows[0];

    console.log("LOCATION TO SEND:", location);

    res.json({
      pincode: location.pincode,
      state: location.state,
      district: location.district,
      latitude: location.latitude,
      longitude: location.longitude
    });

  } catch (error) {
    console.error('Error fetching location:', error);

    res.status(500).json({
      error: 'Internal server error'
    });
  }
});