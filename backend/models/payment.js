const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Success", "Failed"], default: "Success" },
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
);

const Payment =  mongoose.model("Payment", paymentSchema);

module.exports = Payment
