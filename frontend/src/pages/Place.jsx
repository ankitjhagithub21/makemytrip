import { useEffect, useState,lazy } from "react";
import { getPlaceById, removePlace } from "../api/place";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteReview, editReview } from "../api/review";

const PlaceLoading = lazy(() => import('../components/PlaceLoading'));
const PlaceDetails = lazy(() => import('../components/PlaceDetails'));
const AddReview = lazy(() => import('../components/AddReview'));
const Reviews = lazy(() => import('../components/Reviews'));
const NotFound = lazy(() => import('./NotFound'));

const Place = () => {
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
      toast.error(error.response?.data?.message || "An error occured.")
      console.log(error)
    }
  }
  const handleEditReview = async(reviewId,review) =>{
    
    if(!user){
      return toast.error("You are not logged in.")
    }
    

    try{
      const data = await editReview(reviewId,id,review)
       setReviews(reviews.map((review)=>review._id === reviewId ? data.review : review ));
      toast.success(data.message)

    }catch(error){
      toast.error(error.response?.data?.message || "An error occured.")
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
      navigate("/")    
      toast.success(data.message)
     
    }catch(error){
      toast.error(error.response?.data?.message)
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
      <button onClick={()=>navigate("/places")} className="btn btn-success">
        
        Back</button>
      {place && <PlaceDetails place={place} deletePlace={handleDeletePlace}/>}

      <hr />
      <AddReview placeId={place._id} addNewReview={addNewReview}/>
      {reviews.length > 0 ? (
       <Reviews reviews={reviews} handleDelete={handleDeleteReview} handleEdit={handleEditReview}/>
      ) : (
        <p className="text-gray-500 text-center">No reviews yet.</p>
      )}
    </div>
  );
};

export default Place;
