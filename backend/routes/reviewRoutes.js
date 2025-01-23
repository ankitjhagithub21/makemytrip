
const express = require('express');
const { addReview, deleteReview, editReview } = require('../controllers/reviewController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const reviewRouter = express.Router();

reviewRouter.post("/:id",isAuthenticated,addReview)
reviewRouter.delete("/:placeId/delete/:reviewId",isAuthenticated,deleteReview)
reviewRouter.put("/:placeId/edit/:reviewId",isAuthenticated,editReview)

module.exports = reviewRouter
