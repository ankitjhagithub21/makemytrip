
const express = require('express');
const { addReview, deleteReview } = require('../controllers/reviewController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const reviewRouter = express.Router();

reviewRouter.post("/",isAuthenticated,addReview)
reviewRouter.delete("/:reviewId",isAuthenticated,deleteReview)

module.exports = reviewRouter
