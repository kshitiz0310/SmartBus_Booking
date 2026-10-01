import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  seatNumbers: { type: [String], required: true },
  totalAmount: { type: Number, required: true },
  paymentId: { type: String },
  orderId: { type: String },
  utrNumber: { type: String },
  paymentStatus: { type: String, enum: ["pending", "verified", "rejected", "paid"], default: "verified" },
  transactionScreenshot: { type: String },
  status: { type: String, enum: ["booked", "cancelled", "confirmed"], default: "booked" }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
