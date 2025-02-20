const Booking = require("../models/Booking");


exports.createBooking = async (req, res) => {
    const { userId, hotelId, checkInDate, checkOutDate, totalPrice } = req.body;

    if (!userId || !hotelId || !checkInDate || !checkOutDate || !totalPrice) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        // Check if a booking already exists for the same user, hotel, and check-in date
        const existingBooking = await Booking.findOne({
            userId,
            hotelId,
            checkInDate: { $lte: new Date(checkOutDate) },
            checkOutDate: { $gte: new Date(checkInDate) },
        });

        if (existingBooking) {
            return res.status(400).json({ message: "You have already booked this hotel for the selected dates." });
        }

        // Create new booking if no conflict
        const booking = new Booking({
            userId,
            hotelId,
            checkInDate,
            checkOutDate,
            totalPrice,
        });

        await booking.save();
        res.status(201).json({ message: "Booking created successfully!", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create booking!" });
    }
};


// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("userId", "name email").populate("hotelId", "name location");
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch bookings!" });
    }
};

// Get bookings by user ID
exports.getBookingsByUser = async (req, res) => {
    const { userId } = req.params;
    if(req.user.id !== userId){
        return res.status(401).json({message:"Unauthorized."})
    }
    
    try {
        const bookings = await Booking.find({ userId }).populate("hotelId", "name location");
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch user's bookings!" });
    }
};

// Update booking (e.g., payment status)
exports.updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const { paymentStatus } = req.body;

    try {
        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { paymentStatus },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: "Booking not found!" });
        }

        res.status(200).json({ message: "Booking updated successfully!", booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update booking!" });
    }
};


// Delete a booking
exports.deleteBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findByIdAndDelete(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found!" });
        }

        res.status(200).json({ message: "Booking deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete booking!" });
    }
};
