import React from 'react';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { likeUnlikePlace } from '../api/place';
import { likeUnlike } from '../redux/slices/placeSlice';

const PlaceCard = ({ place}) => {
  
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const handleLikeUnlike = async () => {
    if (!user) {
      return toast.error("You are not logged in.");
    }

    try {
      const data = await likeUnlikePlace(place._id); // Call API to like/unlike the place
      dispatch(likeUnlike({_id:place._id,place:data.place}))
      toast.success(data.message); // Show success message
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="card border-2 rounded-2xl p-3 cursor-pointer">
      <figure className="overflow-hidden rounded-2xl relative">
        {/* Like/Unlike Button */}
        <button
          className="absolute top-3 right-3 text-2xl z-20 hover:scale-105 outline-none text-green-800"
          onClick={handleLikeUnlike}
        >
          {place?.likes.includes(user?._id) ? <IoIosHeart /> : <IoIosHeartEmpty />}
        </button>
        {/* Place Image */}
        <img
          src={place.image}
          className="rounded-2xl hover:opacity-90 transition h-52 w-full object-cover"
          alt={place.title}
        />
      </figure>
      <div className="card-body p-2">
        {/* Place Title and Location */}
        <Link to={`/place/${place._id}`} className="hover:underline text-blue-700">
          {place?.title}, {place?.location}
        </Link>
        {/* Place Price */}
        <p className="text-green-600 text-lg font-semibold">
          ₹{place?.price} / day
        </p>
        {/* Total Likes */}
        <p>{place?.likes?.length} likes</p>
      </div>
    </div>
  );
};

export default PlaceCard;
