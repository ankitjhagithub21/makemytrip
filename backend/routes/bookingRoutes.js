const express = require("express");
const bookingRouter = express.Router();
const bookingController = require("../controllers/bookingController");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAdmin = require("../middlewares/isAdmin");

// Create a new booking
bookingRouter.post("/", isAuthenticated , bookingController.createBooking);

// Get all bookings
bookingRouter.get("/", isAuthenticated,isAdmin,bookingController.getAllBookings);

// Get bookings by user ID
bookingRouter.get("/user/:userId", isAuthenticated, bookingController.getBookingsByUser);

// Update booking (payment status)
bookingRouter.put("/:bookingId",isAuthenticated ,bookingController.updateBooking);

// Delete booking
bookingRouter.delete("/:bookingId", isAuthenticated,isAdmin,bookingController.deleteBooking);

module.exports = bookingRouter;
