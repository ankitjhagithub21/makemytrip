import React from "react";

const PlaceDetails = ({ place,deletePlace }) => {
 
   return (
    <div className="flex flex-col gap-3 my-12">
      <h1 className="text-2xl font-semibold">
        {place.title} : {place.location} {place.country}
      </h1>
      <img
        src={place.image}
        alt={place.title}
        className="rounded-2xl lg:h-[400px] h-auto object-center w-full object-cover"
      />
      <p className="text-lg">{place.description}</p>
      <p className="text-green-600 text-2xl">₹ {place.price} / day</p>

      <div>
        <button className="btn btn-error text-white" onClick={()=>deletePlace(place._id)}>Delete Place</button>
      </div>
    </div>
  );
};

export default PlaceDetails;
