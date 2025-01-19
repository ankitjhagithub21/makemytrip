
const express = require('express');
const { displayAllPlaces, getPlaceById, updatePlace, deletePlace, createPlace } = require('../controllers/placeController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const placeRouter = express.Router();


// Route to create new place
placeRouter.post('/new', isAuthenticated,createPlace);


// Route to display all places
placeRouter.get('/', displayAllPlaces);


// Route to get place by id
placeRouter.get('/:id', getPlaceById);


//Route to update place
placeRouter.put('/:id',isAuthenticated ,updatePlace);

// Route to delete place
placeRouter.delete('/:id', isAuthenticated,deletePlace);


module.exports = placeRouter
