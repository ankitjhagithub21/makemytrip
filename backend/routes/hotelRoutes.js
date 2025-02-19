const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { createHotel, getHotels, getHotelById, updateHotel, deleteHotel } = require('../controllers/hotelController');
const isAdmin = require('../middlewares/isAdmin');
const hotelRouter = express.Router();

hotelRouter.post("/",isAuthenticated,isAdmin,createHotel)
hotelRouter.get("/",getHotels)
hotelRouter.get("/:id",getHotelById)
hotelRouter.put("/:id",isAuthenticated,isAdmin,updateHotel)
hotelRouter.delete("/:id",isAuthenticated,isAdmin,deleteHotel)

module.exports = hotelRouter