const Review = require("../models/review");
const Place = require("../models/place");

const addReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    // Validate fields
    if (!rating || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate rating range (assuming rating is out of 5)
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    // Find the place
    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ message: "Place not found." });
    }

    // Create a new review
    const newReview = await Review.create({
      rating,
      comment,
      user: req.user.id,
    });

    // Add review to the place
    place.reviews.push(newReview._id);
    await place.save();

    // Populate user details in the new review
    const review = await newReview.populate({
      path: "user",
      select: "fullName profileImg",
    });

    res.status(200).json({ message: "Review added successfully.", review });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteReview = async (req, res) => {
  const { placeId, reviewId } = req.params;

  try {
    // Find the review
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    // Check if the user is authorized to delete the review
    if (String(req.user.id) !== String(review.user)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this review." });
    }

    // Remove the review ID from the place's reviews array
    await Place.findByIdAndUpdate(placeId, { $pull: { reviews: reviewId } });

    // Delete the review
    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const editReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    // Validate fields
    if (!rating || !comment) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate rating range (assuming rating is out of 5)
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5." });
    }

    // Find the review
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    // Check if the user is authorized to edit the review
    if (String(req.user.id) !== String(review.user)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this review." });
    }

    // Update the review
    review.rating = rating;
    review.comment = comment;
    await review.save();

    // Populate user details in the updated review
    const updatedReview = await review.populate({
      path: "user",
      select: "fullName profileImg",
    });

    res.status(200).json({ message: "Review updated successfully.", review: updatedReview });
    
  } catch (error) {
    console.error("Error editing review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addReview,
  deleteReview,
  editReview
};
