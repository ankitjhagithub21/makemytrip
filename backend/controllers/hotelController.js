const Hotel = require("../models/hotel");
const { deleteImage } = require("../utils/uploadImage");

//desc create a hotel
const createHotel = async (req, res) => {
  try {
    const { name, location, price, description, rooms, images } = req.body;

    // Validate required fields
    if (!name || !location || !rooms || !price || !description ) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }
    // Create new hotel entry
    const newHotel = new Hotel({
      name,
      location,
      price,
      description,
      rooms,
      images,
     
    });

    await newHotel.save();
    res
      .status(201)
      .json({ message: "Hotel added successfully!", hotel: newHotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc   Get all hotels
// @route  GET /api/hotels
// @access Public
const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    res.status(200).json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc   Get a single hotel by ID
// @route  GET /api/hotels/:id
// @access Public
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc   Update hotel details
// @route  PUT /api/hotels/:id
// @access Private (Only Admins)
const updateHotel = async (req, res) => {
  try {
    const { name, location, price, description, rooms, images } = req.body;

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Update hotel details
    hotel.name = name || hotel.name;
    hotel.location = location || hotel.location;
    hotel.price = price || hotel.price;
    hotel.description = description || hotel.description;
    hotel.rooms = rooms || hotel.rooms;
    hotel.images = images || hotel.images;

    await hotel.save();
    res.status(200).json({ message: "Hotel updated successfully!", hotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc   Delete a hotel
// @route  DELETE /api/hotels/:id
// @access Private (Only Admins)
const deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    deleteImage

    await hotel.deleteOne();
    res.status(200).json({ message: "Hotel deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createHotel,
  getHotels,
  getHotelById,
  deleteHotel,
  updateHotel,
};
