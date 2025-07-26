const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  hall: { type: mongoose.Schema.Types.ObjectId, ref: "Hall", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  guests: { type: Number, required: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  paymentStatus: { type: String, enum: ["pending", "success"], default: "pending" },
  paymentMethod: { type: String, enum: ["cash", "card"], default: "cash" },
  paymentDetails: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
