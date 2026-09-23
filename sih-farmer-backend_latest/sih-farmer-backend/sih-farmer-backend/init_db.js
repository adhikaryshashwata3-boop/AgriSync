const Database = require("better-sqlite3");
const db = new Database("agrisync.db");

// Rebuild pincodes table with dual mandi routing support
db.exec(`
  DROP TABLE IF EXISTS pincodes;
  CREATE TABLE pincodes (
    pincode TEXT PRIMARY KEY,
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    primary_lang TEXT NOT NULL,
    mandi_primary_name TEXT NOT NULL,
    mandi_primary_dist_km REAL NOT NULL,
    mandi_primary_wait_min INTEGER NOT NULL,
    mandi_primary_address TEXT NOT NULL,
    mandi_secondary_name TEXT NOT NULL,
    mandi_secondary_dist_km REAL NOT NULL,
    mandi_secondary_wait_min INTEGER NOT NULL,
    mandi_secondary_address TEXT NOT NULL
  );
`);

const insertPin = db.prepare(`
  INSERT INTO pincodes VALUES (
    @pincode, @district, @state, @primary_lang,
    @mandi_primary_name, @mandi_primary_dist_km, @mandi_primary_wait_min, @mandi_primary_address,
    @mandi_secondary_name, @mandi_secondary_dist_km, @mandi_secondary_wait_min, @mandi_secondary_address
  )
`);

const pinRecords = [
  {
    pincode: "700036",
    district: "Kolkata North",
    state: "West Bengal",
    primary_lang: "bn",
    mandi_primary_name: "Cossipore Wholesale Mandi",
    mandi_primary_dist_km: 2.5,
    mandi_primary_wait_min: 25,
    mandi_primary_address: "Cossipore Road, Gate 2, Kolkata - 700036",
    mandi_secondary_name: "Posta Agro Sub-Yard",
    mandi_secondary_dist_km: 6.2,
    mandi_secondary_wait_min: 5,
    mandi_secondary_address: "Strand Road, Burrabazar, Kolkata - 700001"
  },
  {
    pincode: "700124",
    district: "North 24 Parganas",
    state: "West Bengal",
    primary_lang: "bn",
    mandi_primary_name: "Barasat Central Mandi",
    mandi_primary_dist_km: 5.0,
    mandi_primary_wait_min: 10,
    mandi_primary_address: "Jessore Road, Gate A, Barasat - 700124",
    mandi_secondary_name: "Habra Agro Terminal",
    mandi_secondary_dist_km: 14.0,
    mandi_secondary_wait_min: 0,
    mandi_secondary_address: "Jessore Highway, Habra - 743263"
  },
  {
    pincode: "141001",
    district: "Ludhiana",
    state: "Punjab",
    primary_lang: "pa",
    mandi_primary_name: "Grain Market Khanna",
    mandi_primary_dist_km: 8.0,
    mandi_primary_wait_min: 35,
    mandi_primary_address: "GT Road, Gate B, Khanna, Ludhiana - 141401",
    mandi_secondary_name: "Sahnewal Sub-Yard",
    mandi_secondary_dist_km: 12.5,
    mandi_secondary_wait_min: 5,
    mandi_secondary_address: "Dehlon Road, Sahnewal, Ludhiana - 141120"
  },
  {
    pincode: "411037",
    district: "Pune",
    state: "Maharashtra",
    primary_lang: "mr",
    mandi_primary_name: "APMC Market Yard Gultekdi",
    mandi_primary_dist_km: 4.0,
    mandi_primary_wait_min: 40,
    mandi_primary_address: "Gate 3, Market Yard, Gultekdi, Pune - 411037",
    mandi_secondary_name: "Manchar Agro Market Yard",
    mandi_secondary_dist_km: 18.0,
    mandi_secondary_wait_min: 10,
    mandi_secondary_address: "Pune-Nashik Highway, Manchar - 410503"
  },
  {
    pincode: "110040",
    district: "North Delhi",
    state: "Delhi",
    primary_lang: "hi",
    mandi_primary_name: "Narela Grain Mandi",
    mandi_primary_dist_km: 3.2,
    mandi_primary_wait_min: 30,
    mandi_primary_address: "Scale Line 2, Mandi Complex, Narela - 110040",
    mandi_secondary_name: "Azadpur Sub-Yard",
    mandi_secondary_dist_km: 15.0,
    mandi_secondary_wait_min: 8,
    mandi_secondary_address: "GTK Road, Azadpur, Delhi - 110033"
  }
];

const insertMany = db.transaction((rows) => {
  for (const r of rows) insertPin.run(r);
});
insertMany(pinRecords);

console.log("Dual-Mandi routing tables seeded into agrisync.db successfully.");