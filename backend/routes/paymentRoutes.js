const express = require("express");
const paymentRouter = express.Router();
const { createPaymentIntent, handlePaymentSuccess, getAllPayments } = require("../controllers/paymentController");
const isAdmin = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");

paymentRouter.post("/create-intent",isAuthenticated, createPaymentIntent);
paymentRouter.post("/success",isAuthenticated, handlePaymentSuccess);
paymentRouter.get("/", isAuthenticated,isAdmin,getAllPayments);

module.exports = paymentRouter;
