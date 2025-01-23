import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { updatePlace } from "../api/place";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

const UpdatePlace = () => {

  const { currPlace } = useSelector((state) => state.place);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!user) {
      return toast.error("You are not logged in.");
    }

    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries()); // Get form entries as an object

    setLoading(true); // Set loading to true
    try {
      const data = await updatePlace(currPlace?._id, formEntries);
      toast.success("Place updated.");
      navigate(`/place/${currPlace._id}`); // Navigate to the home page
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  if (!currPlace) {
    return <NotFound />;
  }

  return (
    <div className="auth min-h-screen px-5 flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full bg-white my-24 px-5 py-8 border rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold">Update Place</h1>
          <button className="btn btn-success" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={currPlace.title}
              className="input input-success w-full"
              placeholder="Enter place title"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              defaultValue={currPlace.description}
              className="textarea textarea-success w-full resize-none"
              placeholder="Enter place description"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              id="image"
              defaultValue={currPlace.image}
              className="input input-success w-full"
              placeholder="Enter image URL"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-1"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                defaultValue={currPlace.location}
                className="input input-success w-full"
                placeholder="Enter location"
                required
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium mb-1"
              >
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                defaultValue={currPlace.country}
                className="input input-success w-full"
                placeholder="Enter country"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              defaultValue={currPlace.price}
              className="input input-success w-full"
              placeholder="Enter price per day"
              min="0"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="btn btn-success">
            {loading && <span className="loading loading-spinner"></span>}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlace;
