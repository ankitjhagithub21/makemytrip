import { useState } from "react";
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import { format } from "date-fns";

const MAX_RATING = 5;

const Reviews = ({ reviews, handleDelete, handleEdit }) => {
  const { user } = useSelector((state) => state.user);
  const [editableReviewId, setEditableReviewId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleEditClick = (review) => {

    setEditableReviewId(review._id);
    setEditContent(review.comment); // Set the current review's comment to edit input
  };

  const handleEditSubmit = (e, review) => {
    e.preventDefault();
    handleEdit(review._id, {
      comment: editContent,
      rating: review.rating, // Use the existing rating
    });
    setEditableReviewId(null); // Exit edit mode
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-24 gap-5">
      {reviews
        .slice()
        .reverse()
        .map((review) => (
          <div className="card bg-base-100 shadow-xl" key={review._id}>
            <div className="card-body">
              {/* Display user info */}
              <div className="flex items-center gap-2">
                <img
                  src={review.user?.profileImg}
                  alt="profile"
                  className="rounded-full w-12 h-12 object-cover object-center border"
                />
                <div>
                  <h2 className="text-sm font-semibold">
                    {user?._id === review?.user?._id ? "You" : review?.user?.fullName}
                  </h2>
                  <span className="text-xs font-semibold">
                    {format(new Date(review?.createdAt), "MMMM d, yyyy")}
                  </span>
                </div>
              </div>

              {/* Display stars */}
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <IoMdStar key={`filled-${index}`} size={20} className="text-yellow-600" />
                ))}
                {Array.from({ length: MAX_RATING - review.rating }).map((_, index) => (
                  <IoMdStarOutline key={`outlined-${index}`} size={20} className="text-yellow-600" />
                ))}
              </div>

              {/* Display editable or static comment */}
              {editableReviewId === review._id ? (
                <form onSubmit={(e) => handleEditSubmit(e, review)}>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button type="submit" className="btn btn-success btn-sm mt-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm mt-2 ml-2"
                    onClick={() => setEditableReviewId(null)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <p>{review.comment}</p>
              )}

              {/* Actions: Delete and Edit */}
              {review?.user?._id === user?._id && (
                <div className="flex items-center gap-3 mt-2">
                  <button className="text-red-600" onClick={() => handleDelete(review._id)}>
                    <FaTrash />
                  </button>
                  <button
                    className="text-info"
                    onClick={() => handleEditClick(review)}
                  >
                    <FaEdit size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Reviews;
