import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createHotel } from "../api/hotel";

const CreateHotel = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rooms, setRooms] = useState("");
  const [images, setImages] = useState([""]); // Initialize with one empty string
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index] = value;
    setImages(updatedImages);
  };

  const addImageField = () => {
    setImages([...images, ""]);
  };

  const removeImageField = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const hotel = {
      name,
      description,
      price,
      location,
      rooms,
      images: images.filter((img) => img.trim() !== ""), // Remove empty URLs
    };

    try {
      await createHotel(hotel);
      toast.success("Hotel created successfully!");
      navigate("/hotels");
    } catch (error) {
      toast.error("Failed to create hotel!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center auth px-5 py-12">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Create New Hotel</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Hotel Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Hotel Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-success w-full"
              required
            />
          </div>

          <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-4">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input input-success w-full"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-success w-full"
                required
              />
            </div>
          </div>

          {/* Image URLs */}
          <label htmlFor="images" className="block text-sm font-medium">Images</label>
          {images.map((image, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                className="input input-success w-full"
                placeholder="Enter image URL"
              />
              {index > 0 && (
                <button type="button" onClick={() => removeImageField(index)} className="btn btn-error">
                  X
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addImageField} className="btn btn-info">+ Add Image</button>

          {/* Rooms */}
          <div>
            <label className="block text-sm font-medium mb-1">Rooms</label>
            <input
              type="number"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              className="input input-success w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-success w-full resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner"></span> : "Create Hotel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHotel;
