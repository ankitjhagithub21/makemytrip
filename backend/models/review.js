
const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  comment: {
    type: String,
    required:true
  },
  
  rating: {
    type: Number,
    min:1,
    max:5
  },

  createdAt:{
    type:Date,
    default:Date.now()
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
},{versionKey:false});

const Review = model("Review", reviewSchema);

module.exports = Review;
