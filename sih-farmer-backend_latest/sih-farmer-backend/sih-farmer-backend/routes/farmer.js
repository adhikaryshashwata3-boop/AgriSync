const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const db = require("../db");

router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      password,
      address,
      state,
      district,
      pincode,
      latitude,
      longitude
    } = req.body;

    console.log("FARMER SIGNUP DATA:", req.body);

    // 1. Basic validation
    if (
      !name ||
      !phone ||
      !state ||
      !district ||
      !pincode ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Required farmer details are missing"
      });
    }

    // 2. Check whether phone already exists
    const [existingFarmer] = await db.execute(
      "SELECT farmer_id FROM farmers WHERE phone_number = ?",
      [phone]
    );

    if (existingFarmer.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Phone number is already registered"
      });
    }

    // 3. Generate farmer ID
    const farmerId = `FAR${Date.now()}`;

    // 4. Hash password
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : null;

    // 5. Insert farmer
    await db.execute(
      `INSERT INTO farmers
      (
        farmer_id,
        name,
        phone_number,
        state,
        district,
        pincode,
        registered_location,
        email,
        password,
        address
      )
      VALUES (?, ?, ?, ?, ?, ?, POINT(?, ?), ?, ?, ?)`,
      [
        farmerId,
        name.trim(),
        phone.trim(),
        state,
        district,
        pincode,
        longitude,
        latitude,
        email || null,
        hashedPassword,
        address || null
      ]
    );

    console.log("FARMER CREATED:", farmerId);

    res.status(201).json({
      success: true,
      message: "Farmer registered successfully",
      farmer_id: farmerId
    });

  } catch (error) {
    console.error("FARMER SIGNUP ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Farmer registration failed"
    });
  }
});

module.exports = router;