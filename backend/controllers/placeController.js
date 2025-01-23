const Place = require("../models/place");
const User = require("../models/user");

const createPlace = async (req, res) => {
  const { title, description, image, location, country, price } = req.body;

  try {
    // Validate required fields
    if (!title || !description || !image || !location || !country || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }


    // Create the new place
    const newPlace = await Place.create({
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
      location: location.trim(),
      country: country.trim(),
      price,
    });

    res.status(201).json({
      message: "Place created successfully.",
      place: newPlace,
    });

  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating the place.", error: error.message });
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
    // Validate input fields
    if (!title || !description || !image || !location || !country || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }


    // Update place in the database
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        description: description.trim(),
        image: image.trim(),
        location: location.trim(),
        country: country.trim(),
        price,
      },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    // Check if the place exists
    if (!updatedPlace) {
      return res.status(404).json({ message: "Place not found." });
    }

    res.status(200).json({
      message: "Place updated successfully.",
      place: updatedPlace,
    });
  } catch (error) {
    console.error("Error updating place:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
      // If the user has already liked the place, unlike it
      const index = place.likes.findIndex(
        (likeId) => likeId.toString() === userId.toString()
      );
      place.likes.splice(index, 1);

      // Remove from user's favorites if it's there
      const favIndex = user.favs.findIndex(
        (placeId) => placeId.toString() === place._id.toString()
      );

      if (favIndex !== -1) {
        user.favs.splice(favIndex, 1);
      }

      await Promise.all([place.save(), user.save()]);
      return res
        .status(200)
        .json({ message: "Place unliked successfully.", place });
    }

    // If the user hasn't liked the place, like it
    user.favs.push(place._id);
    place.likes.push(user._id);

    await Promise.all([place.save(), user.save()]);

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
