import React from "react";

const Reviews = ({ reviews,handleDelete }) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-24 gap-5">
      {reviews.map((review) => (
        <div className="card bg-base-100 shadow-xl" key={review._id}>
          <div className="card-body">
            <div>
              {Array.from({ length: review.rating }).map((_, index) => (
                <span key={index}>⭐</span>
              ))}
            </div>
            <p>{review.comment}</p>
            <button className="btn btn-xs mt-2 btn-error w-fit text-white" onClick={()=>handleDelete(review._id)}>
                Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
