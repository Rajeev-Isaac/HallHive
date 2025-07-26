const express = require("express");
const router = express.Router();
const Hall = require("../models/Hall");
const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // store in /uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Add new hall (admin) with image upload
router.post("/add", upload.single("image"), async (req, res) => {
  const { name, location, capacity, price, createdBy } = req.body;
  try {
    const image = req.file ? req.file.filename : null;
    if (!image) return res.status(400).json({ msg: "Image is required" });
    const newHall = new Hall({ name, location, capacity, price, image, createdBy });
    await newHall.save();
    res.status(201).json({ msg: "Hall added successfully", hall: newHall });
  } catch (err) {
    console.error("Error adding hall:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all halls (customer)
router.get("/", async (req, res) => {
  try {
    const halls = await Hall.find();
    console.log("Fetched halls:", halls); // Add this
    res.json(halls);
  } catch (err) {
    console.error("Error fetching halls:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
