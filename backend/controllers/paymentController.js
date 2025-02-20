const Stripe = require("stripe");
const Payment = require("../models/payment");
const Booking = require("../models/booking");

// Initialize Stripe with your secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a Stripe payment intent
exports.createPaymentIntent = async (req, res) => {
    const { userId, bookingId, amount } = req.body;

    if (!userId || !bookingId || !amount) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        // Check if booking exists
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found!" });
        }

        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe works in cents
            currency: "inr",
            metadata: { userId, bookingId },
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            message: "Payment intent created successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create payment intent!" });
    }
};

// Handle successful payment and save to DB
exports.handlePaymentSuccess = async (req, res) => {
    const { userId, bookingId, amount, transactionId } = req.body;

    if (!userId || !bookingId || !amount || !transactionId) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        // Check if the payment already exists
        const existingPayment = await Payment.findOne({ bookingId });
        if (existingPayment) {
            return res.status(400).json({ message: "Payment already exists for this booking!" });
        }

        // Create payment record
        const payment = new Payment({
            userId,
            bookingId,
            amount,
            transactionId,
            status: "Success",
        });

        await payment.save();

        // Update booking payment status
        await Booking.findByIdAndUpdate(bookingId, { paymentStatus: "Paid" });

        res.status(201).json({ message: "Payment successful!", payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to handle payment success!" });
    }
};
