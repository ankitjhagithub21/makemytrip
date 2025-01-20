import React, { useEffect, useState } from "react";
import { getPlaceById, removePlace } from "../api/place";
import { useNavigate, useParams } from "react-router-dom";
import PlaceLoading from "../components/PlaceLoading";
import PlaceDetails from "../components/PlaceDetails";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { deleteReview } from "../api/review";
import NotFound from "./NotFound";

const Place = ({deletePlace}) => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [reviews,setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const {user} = useSelector(state=>state.user)

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const data = await getPlaceById(id);
        setPlace(data);
        setReviews(data.reviews)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaceData();
  }, [id]);

  const addNewReview = (newReview) => {
      setReviews((prev)=>[...prev,newReview])
  }

  const handleDeleteReview = async(reviewId) =>{
    if(!user){
      return toast.error("You are not logged in.")
    }
    

    try{
      const data = await deleteReview(reviewId,place?._id)
      setReviews(reviews.filter((review)=>review._id !== reviewId))
      toast.success(data.message)

    }catch(error){
      console.log(error)
    }
  }
  const handleDeletePlace = async(placeId) =>{
    if(!user){
      return toast.error("You are not logged in.")
    }

    if(user.role !== "admin"){
      return toast.error("Only admin can delete place.")
    }

    try{
      const data = await removePlace(placeId)
      deletePlace(placeId);
      toast.success(data.message)
      navigate("/")

    }catch(error){
      
      toast.error(error.response.data.message)
    }
  }

  


  if (loading) {
    return <PlaceLoading />;
  }

  if (error) {
    return (
     <NotFound/>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 my-12">
      <button onClick={()=>navigate(-1)} className="btn btn-success">
        
        Back</button>
      {place && <PlaceDetails place={place} deletePlace={handleDeletePlace}/>}

      <hr />
      <AddReview placeId={place._id} addNewReview={addNewReview}/>
      {reviews.length > 0 ? (
       <Reviews reviews={reviews} handleDelete={handleDeleteReview}/>
      ) : (
        <p className="text-gray-500 text-center">No reviews yet.</p>
      )}
    </div>
  );
};

export default Place;
