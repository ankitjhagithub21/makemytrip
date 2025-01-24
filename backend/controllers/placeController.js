const Place = require("../models/place");
const User = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");

const createPlace = asyncHandler(async (req, res) => {
  const { title, description, image, location, country, price } = req.body;

  if (!title || !description || !image || !location || !country || !price) {
    return res.status(400).json({ message: "All fields are required." });
  }

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
});

const displayAllPlaces = asyncHandler(async (req, res) => {
  const places = await Place.find();
  res.status(200).json(places);
});

const getPlaceById = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id).populate({
    path: "reviews",
    populate: {
      path: "user",
      select: "fullName profileImg",
    },
  });

  if (!place) {
    return res.status(404).json({ message: "Place not found." });
  }

  res.status(200).json(place);
});

const updatePlace = asyncHandler(async (req, res) => {
  const { title, description, image, location, country, price } = req.body;

  if (!title || !description || !image || !location || !country || !price) {
    return res.status(400).json({ message: "All fields are required." });
  }

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
    { new: true, runValidators: true }
  );

  if (!updatedPlace) {
    return res.status(404).json({ message: "Place not found." });
  }

  res.status(200).json({
    message: "Place updated successfully.",
    place: updatedPlace,
  });
});

const deletePlace = asyncHandler(async (req, res) => {
  const deletedPlace = await Place.findByIdAndDelete(req.params.id);

  if (!deletedPlace) {
    return res.status(404).json({ message: "Place not found." });
  }

  res.status(200).json({ message: "Place deleted." });
});

const likeUnlikePlace = asyncHandler(async (req, res) => {
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
      (likeId) => likeId.toString() === userId.toString()
    );
    place.likes.splice(index, 1);

    const favIndex = user.favs.findIndex(
      (placeId) => placeId.toString() === place._id.toString()
    );

    if (favIndex !== -1) {
      user.favs.splice(favIndex, 1);
    }

    await Promise.all([place.save(), user.save()]);
    return res.status(200).json({ message: "Place unliked successfully.", place });
  }

  user.favs.push(place._id);
  place.likes.push(user._id);

  await Promise.all([place.save(), user.save()]);

  res.status(200).json({ message: "Place liked successfully.", place });
});

module.exports = {
  createPlace,
  displayAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
  likeUnlikePlace,
};
