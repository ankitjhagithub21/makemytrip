import { useState } from "react";
import { addReview } from "../api/review";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AddReview = ({ placeId,addNewReview }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!user) return toast.error("You are not logged in.");
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    setLoading(true);
    try {
      const data = await addReview(formObject, placeId);
      addNewReview(data.review);
      toast.success("Review added.");
      e.target.reset();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-12">
      <h1 className="text-2xl mb-3">Rating & Reviews</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="rating">Rating</label>
          <input
            type="range"
            min="1"
            max="5"
            name="rating"
            id="rating"
            className="range mt-1 range-xs"
            step="1"
            defaultValue={1}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="comment">Comment</label>
          <textarea
            name="comment"
            className="textarea mt-1 textarea-bordered w-full resize-none"
            id="comment"
            placeholder="Write your comment here..."
            rows={4}
            required
          ></textarea>
        </div>
        <button className="btn bg-gray-800 text-white hover:bg-black w-fit">
          {loading && <span className="loading loading-spinner"></span>}
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddReview;
