import React from 'react'
import useFetch from '../hooks/useFetch'
import PlaceCard from './PlaceCard'

const LikedPlaces = ({likeUnlke}) => {
  const url = `${import.meta.env.VITE_SERVER_URL}/api/users/liked-places`
  const [data,setData,loading,error] = useFetch(url)

  if(loading){
    return <p>Loading...</p>
  }
  if(error){
    return <p>Something went wrong</p>
  }

  return (
    <div className='lg:w-3/4 w-full my-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
      {
      
      data.places.map((place)=>{
        return <PlaceCard key={place._id} place={place} likeUnlike={likeUnlke}/>
      })  
    }</div>
  )
}

export default LikedPlaces