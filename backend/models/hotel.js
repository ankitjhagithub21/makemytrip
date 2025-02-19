const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    images: [{ type: String }], 
    rooms: { type: Number, required: true },
  },
  { timestamps: true,versionKey:false }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel
