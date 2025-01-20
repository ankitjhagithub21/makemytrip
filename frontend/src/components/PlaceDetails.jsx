import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { setCurrPlace } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const PlaceDetails = ({ place, deletePlace }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleDelete = () => {
    if (confirm("Are you sure ?")) {
      deletePlace(place._id);
    }
  };
  const handleUpdate = () =>{
     dispatch(setCurrPlace(place))
    navigate(`/place/${place._id}/edit`)
  }
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


      <div className="flex gap-3 mt-4">
        <button className="btn btn-error text-white" onClick={handleDelete}>
          <MdDelete size={20}/>
        </button>
      <button className="btn btn-info" onClick={handleUpdate}>
      Update
      </button>
      </div>
    </div>
  );
};

export default PlaceDetails;
