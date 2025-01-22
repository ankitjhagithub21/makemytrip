import React from 'react'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { likeUnlikePlace } from '../api/place'


const PlaceCard = ({place,likeUnlike}) => {
  const {user} = useSelector(state=>state.user)
  const handleLikeUnlike = async() => {
      try{
        const data = await likeUnlikePlace(place._id);
        likeUnlike(place._id, data.place);
        toast.success(data.message)
        
      }catch(error){
        toast.error(error.response?.data?.message)
      }
  }
  return (
    <div className="card border-2 rounded-2xl p-3 cursor-pointer">
    <figure
      className="overflow-hidden rounded-2xl relative"
     
    >
      <button className='absolute top-3 right-3 text-2xl z-20 hover:scale-105 outline-none text-green-800' onClick={handleLikeUnlike}>
        {
          place?.likes.includes(user?._id) ? <IoIosHeart /> : <IoIosHeartEmpty/>
        }
      </button>
      <img
        src={place.image}
        className="rounded-2xl hover:opacity-90  transition h-52 w-full object-cover"
        alt={place.title}

      />
    </figure>
    <div className="card-body p-2">
      <Link to={`/place/${place._id}`} className='hover:underline text-blue-700'>
        {place.title}, {place.location}
      </Link>
      <p className="text-gray-800 text-2xl font-semibold">
        ₹{place.price}
      </p>
    </div>
  </div>
  )
}

export default PlaceCard