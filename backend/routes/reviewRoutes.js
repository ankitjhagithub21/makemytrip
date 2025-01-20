
const express = require('express');
const { addReview, deleteReview } = require('../controllers/reviewController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const reviewRouter = express.Router();

reviewRouter.post("/:id",isAuthenticated,addReview)
reviewRouter.delete("/:placeId/delete/:reviewId",isAuthenticated,deleteReview)

module.exports = reviewRouter
