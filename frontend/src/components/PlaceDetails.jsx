import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { setCurrPlace } from "../redux/slices/placeSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const PlaceDetails = ({ place, deletePlace }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)
  const handleDelete = () => {
    if (user?.role !== "admin") {
      return toast.error("You are not an admin.")
    }
    if (confirm("Are you sure ?")) {
      deletePlace(place._id);
    }
  };
  const handleUpdate = () => {
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
      <div
        dangerouslySetInnerHTML={{ __html: place.description }}
      />
      <p className="text-green-600 text-2xl">₹ {place.price} / day</p>


      {
        user && user.role === "admin" && <div className="flex gap-3 mt-4">
          <button className="btn btn-error text-white" onClick={handleDelete}>
            <MdDelete size={20} />
          </button>
          <button className="btn btn-info text-white" onClick={handleUpdate}>
            <MdEdit size={20} />
          </button>
        </div>
      }
    </div>
  );
};

export default PlaceDetails;
