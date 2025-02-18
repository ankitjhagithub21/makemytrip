const express = require('express');
const {
  displayAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
  createPlace,
  likeUnlikePlace,
} = require('../controllers/placeController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../utils/multer');

const placeRouter = express.Router();

// Route to create new place
placeRouter.post('/', isAuthenticated, isAdmin, upload.single('image'), createPlace);

// Route to display all places
placeRouter.get('/', displayAllPlaces);

// Route to get place by id
placeRouter.get('/:id', getPlaceById);

// Route to update place
placeRouter.put('/:id', isAuthenticated, isAdmin, upload.single('image'), updatePlace);

// Route to delete place
placeRouter.delete('/:id', isAuthenticated, isAdmin, deletePlace);

//Route to like/unlike place
placeRouter.post('/:id/like', isAuthenticated, likeUnlikePlace);

module.exports = placeRouter;
