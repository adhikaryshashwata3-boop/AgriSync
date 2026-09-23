const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

// 1. Create MySQL Connection Pool (Reads from environment variables or local fallbacks)
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "agrisync",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 2. Fetch Digital Pass / QR Data Endpoint
router.get("/qr/pass/:tokenId", async (req, res) => {
  const { tokenId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT token_id, farmer_name, crop_name, quantity_qtl, mandi_address, slot, status FROM farmer_tokens WHERE token_id = ?",
      [tokenId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Token pass not found in database." });
    }

    res.json({
      success: true,
      passData: rows[0]
    });
  } catch (err) {
    console.error("[MYSQL ERROR - GET PASS]:", err.message);
    res.status(500).json({ success: false, error: "Database query failed." });
  }
});

// 3. Mandi Gate QR Scanner & Anti-Fraud Validation Endpoint
router.post("/mandi/scan-qr-pass", async (req, res) => {
  const { tokenId, gateNumber } = req.body;

  try {
    // Query the MySQL database table for the token
    const [rows] = await db.query(
      "SELECT * FROM farmer_tokens WHERE token_id = ?",
      [tokenId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Invalid QR Pass: Token does not exist." 
      });
    }

    const tokenRecord = rows[0];

    // Anti-Fraud Check: Prevent token sharing / duplicate physical entry
    if (tokenRecord.status === "ADMITTED") {
      return res.status(400).json({ 
        success: false, 
        message: `Duplicate Entry Rejected: Token already admitted at ${tokenRecord.admitted_gate || 'Gate B'}.` 
      });
    }

    // Update the token status in MySQL to ADMITTED
    await db.query(
      "UPDATE farmer_tokens SET status = 'ADMITTED', admitted_gate = ? WHERE token_id = ?",
      [gateNumber || "Gate B", tokenId]
    );

    res.json({
      success: true,
      message: "Gate Pass Verified Successfully. Vehicle cleared for weighbridge entry.",
      tokenDetails: {
        tokenId: tokenRecord.token_id,
        farmer: tokenRecord.farmer_name,
        crop: tokenRecord.crop_name,
        quantity: tokenRecord.quantity_qtl,
        admittedGate: gateNumber || "Gate B"
      }
    });

  } catch (err) {
    console.error("[MYSQL ERROR - SCAN QR]:", err.message);
    res.status(500).json({ success: false, error: "Database query failed during verification." });
  }
});

module.exports = router;