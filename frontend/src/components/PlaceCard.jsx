import React from 'react'

const PlaceCard = ({place,handleClick}) => {

  return (
    <div className="card border-2 rounded-2xl p-3 cursor-pointer">
    <figure
      className="overflow-hidden rounded-2xl"
      onClick={() => handleClick(place._id)}
    >
      <img
        src={place.image}
        className="rounded-2xl hover:scale-105 transition h-52 w-full object-cover"
        alt={place.title}
      />
    </figure>
    <div className="card-body p-2">
      <h2>
        {place.title}, {place.location}
      </h2>
      <p className="text-gray-800 text-2xl font-semibold">
        ₹{place.price}
      </p>
    </div>
  </div>
  )
}

export default PlaceCard