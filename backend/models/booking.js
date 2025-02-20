const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Cancelled"], default: "Pending" },
   
  },
  { timestamps: true }
);

const Booking =  mongoose.model("Booking", bookingSchema);
module.exports = Booking
