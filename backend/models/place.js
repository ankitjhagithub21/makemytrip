const { Schema, model } = require("mongoose");
const Review = require("../models/review");

const placeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
      default:[]
    },

  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default:[]
    },

  ],
  
},{versionKey:false});

// Hook to delete associated reviews when a Place is deleted
placeSchema.post("findOneAndDelete", async function (place) {
  if (place) {
    try {
      // Delete all reviews associated with the place
      await Review.deleteMany({ _id: { $in: place.reviews } });
    } catch (err) {
      console.error("Error deleting associated reviews:", err);
    }
  }
});

const Place = model("Place", placeSchema);

module.exports = Place;