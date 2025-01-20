const Review = require("../models/review");
const Place = require("../models/place");

const addReview = async (req, res) => {
  const { id } = req.params;
  
 
  const {rating,comment} = req.body;
  
  try {
    const place = await Place.findById(id);
  
    if (!place) {
      return res.status(500).json({message:"Place not found."});
    }
    

    if(!rating || !comment){
       return res.status(400).json({message:"All fields are required."});
    }
    const newReview = await Review.create({
      rating,
      comment,
      user:req.user.id
    });

    
    place.reviews.push(newReview._id);
    await place.save();
    const review = await newReview.populate({
      path:"user",
      select:"fullName profileImg"
    })
    
    res.status(200).json({review});
  } catch (error) {
    
    res.status(500).json({message:error.message});
  }
};

const deleteReview = async (req, res) => {
  const { placeId, reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId)
    if(!review){
      return res.status(404).json({message:"Review not found"})
    }

    if (String(req.user.id) !== String(review.user)) {
      return res.status(403).json({ message: "You are not authorized to delete this review." });
    }


    await Place.findByIdAndUpdate(placeId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({message: "Review deleted successfully."});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

module.exports = {
  addReview,
  deleteReview,
};