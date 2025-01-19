import React, { useEffect, useState } from "react";
import { getPlaceById } from "../api/place";
import { useParams } from "react-router-dom";
import PlaceLoading from "../components/PlaceLoading";
import PlaceDetails from "../components/PlaceDetails";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteReview } from "../api/review";

const Place = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user} = useSelector(state=>state.user)

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

  const handleDeleteReview = async(reviewId) =>{
    if(!user){
      return toast.error("You are not logged in.")
    }

    try{
      const data = await deleteReview(reviewId,place?._id)

      toast.success(data.message)

    }catch(error){
      console.log(error)
    }
  }

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
       <Reviews reviews={place.reviews} handleDelete={handleDeleteReview}/>
      ) : (
        <p className="text-gray-500 text-center">No reviews yet.</p>
      )}
    </div>
  );
};

export default Place;
