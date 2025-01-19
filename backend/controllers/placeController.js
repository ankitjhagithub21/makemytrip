const Place = require("../models/place");

const createPlace = async (req, res) => {
  const {title,description,image,location,country,price} = req.body;
  
  try {
    if(!title || !description || !image || !location || !country || !price){
      return res.status(400).json({message:"All fields are required."})
    }
    const newPlace = await Place.create({
      title,
      description,
      image,
      location,
      country,
      price
    });
   

    res.status(201).json({ place: newPlace });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const displayAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};

const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate("reviews");

    if (!place) {
      return res
        .status(404)
        .json({ message: "Place not found." });
    }

    res.status(200).json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message:"Server error"  });
  }
};

const updatePlace = async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedPlace) {
      return res
        .status(404)
        .json({ success: false, message: "Place not found." });
    }
    res.status(200).json({ success: true, place:updatedPlace });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message:"Server error"  });
  }
};

const deletePlace = async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    if(!deletedPlace){
        return res.status(404).json({ message:"Place not found." });
    }
    res.status(200).json({ message:"Place deleted." });

  } catch (error) {
   
    res.status(500).json({ message:"Server error"  });
  }
};

module.exports = {
  createPlace,
  displayAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
};
