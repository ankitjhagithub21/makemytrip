const Review = require("../models/review");
const Place = require("../models/place");

const addReview = async (req, res) => {
  const { placeId } = req.params;
 
  const {rating,comment} = req.body;
  try {
    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(500).json({message:"Place not found."});
    }

    if(!rating || !comment){
       return res.status(400).json({message:"All fields are required."});
    }
    const newReview = await Review.create({
      rating,
      comment
    });
    
    place.reviews.push(newReview._id);
    await place.save();
    res.status(200).json({review:newReview});
  } catch (error) {
    
    res.status(500).json({message:error.message});
  }
};

const deleteReview = async (req, res) => {
  const { placeId, reviewId } = req.params;
  try {
    await Place.findByIdAndUpdate(placeId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({message:"Review deleted."});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

module.exports = {
  addReview,
  deleteReview,
};