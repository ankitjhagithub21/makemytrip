import { IoMdStar, IoMdStarOutline } from "react-icons/io";

const MAX_RATING = 5; // Define the maximum rating value

const Reviews = ({ reviews, handleDelete }) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-24 gap-5">
      {reviews.slice().reverse().map((review) => (
        <div className="card bg-base-100 shadow-xl" key={review._id}>
          <div className="card-body">
            {/* Display stars */}
            <div className="flex gap-1">
              {/* Filled stars */}
              {Array.from({ length: review.rating }).map((_, index) => (
                <span key={`filled-${index}`}>
                  <IoMdStar size={20} className="text-yellow-600" />
                </span>
              ))}
              {/* Outlined stars */}
              {Array.from({ length: MAX_RATING - review.rating }).map((_, index) => (
                <span key={`outlined-${index}`}>
                  <IoMdStarOutline size={20} className="text-yellow-600" />
                </span>
              ))}
            </div>

            {/* Review comment */}
            <p>{review.comment}</p>

            {/* Delete button */}
            <button
              className="btn btn-xs mt-2 btn-error w-fit text-white"
              onClick={() => handleDelete(review._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
