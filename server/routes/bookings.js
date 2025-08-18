const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Book a hall
router.post("/book", async (req, res) => {
  const { hall, user, date, guests, customerName, phone } = req.body;
  try {
    const newBooking = new Booking({ hall, user, date, guests, customerName, phone });
    await newBooking.save();
    res.status(201).json({ msg: "Booking successful", booking: newBooking });
  } catch (err) {
     
    console.error("Booking error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get bookings by user
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate("hall");
    res.json(bookings);
  } catch (err) {
    console.error("Fetch user bookings error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all bookings (for availability check)
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("hall");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update payment status and details
router.post("/payment", async (req, res) => {
  const { bookingId, paymentStatus, paymentMethod, paymentDetails } = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { paymentStatus, paymentMethod, paymentDetails },
      { new: true }
    );
    res.json({ msg: "Payment updated", booking });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
