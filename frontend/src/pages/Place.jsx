import React, { useEffect, useState } from "react";
import { getPlaceById } from "../api/place";
import { useParams } from "react-router-dom";
import PlaceLoading from "../components/PlaceLoading";
import PlaceDetails from "../components/PlaceDetails";
import AddReview from "../components/AddReview";

const Place = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const data = await getPlaceById(id);
        setPlace(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaceData();
  }, [id]);

  if (loading) {
    return <PlaceLoading />;
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-5">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 my-12">
      {place && <PlaceDetails place={place} />}
      <hr />
      <AddReview placeId={place._id}/>
      {place.reviews && place.reviews.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mb-24 gap-5">
          {place.reviews.map((review) => (
            <div className="card bg-base-100 shadow-xl" key={review._id}>
              <div className="card-body">
                <div>
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <span key={index}>⭐</span>
                  ))}
                </div>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No reviews yet.</p>
      )}
    </div>
  );
};

export default Place;
