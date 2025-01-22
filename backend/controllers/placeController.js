const Place = require("../models/place");
const User = require("../models/user");

const createPlace = async (req, res) => {
  const { title, description, image, location, country, price } = req.body;

  try {
    if (!title || !description || !image || !location || !country || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newPlace = await Place.create({
      title,
      description,
      image,
      location,
      country,
      price,
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
    res.status(500).json({ message: error.message });
  }
};

const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate({
      path: "reviews", // Populate reviews
      populate: {
        // Nested populate for the 'user' field in reviews
        path: "user",
        select: "fullName profileImg",
      },
    });

    if (!place) {
      return res.status(404).json({ message: "Place not found." });
    }

    res.status(200).json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updatePlace = async (req, res) => {
  const { title, description, image, location, country, price } = req.body;
  try {
    if (!title || !description || !image || !location || !country || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedPlace = await Place.findByIdAndUpdate(req.params.id, {
      title,
      description,
      image,
      location,
      country,
      price,
    });

    if (!updatedPlace) {
      return res.status(404).json({ message: "Place not found." });
    }

    res.status(200).json({ place: updatedPlace });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePlace = async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    if (!deletedPlace) {
      return res.status(404).json({ message: "Place not found." });
    }
    res.status(200).json({ message: "Place deleted." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const likeUnlikePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({ message: "Place not found." });
    }

    if (place.likes.includes(userId)) {
      const index = place.likes.findIndex(
        (id) => id.toString() === userId.toString()
      );

      place.likes.splice(index, 1);
      
      if (user.favs.includes(place._id)) {
        const index = user.favs.findIndex(
          (placeId) => placeId.toString() === userId.toString()
        );
        user.favs.splice(index, 1);
      }

      await Promise.all([place.save(),user.save()]);
      return res
        .status(200)
        .json({ message: "Place unliked successfully.", place });
    }

    user.favs.push(place._id);
    place.likes.push(user._id);

    await Promise.all([place.save(),user.save()]);

    res.status(200).json({ message: "Place liked successfully.", place });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPlace,
  displayAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
  likeUnlikePlace,
};
