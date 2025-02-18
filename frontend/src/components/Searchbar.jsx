import { GoSearch } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../redux/slices/placeSlice'
import { useNavigate } from 'react-router-dom'
import {FaHome,FaPlane,FaTrain, FaGlobe} from "react-icons/fa"
const Searchbar = () => {
  const dispatch = useDispatch()
  const { searchTerm } = useSelector(state => state.place)
  const navigate = useNavigate()
  const handleSubmit = (e) =>{
    e.preventDefault();
    navigate("/places")
  }

  return (
    <div className='flex items-center justify-center px-5 border hero  py-24'>
     
     <div className="overlay md:w-fit w-full p-5 rounded-xl shadow-xl ">
     <h2 className='text-4xl font-bold text-center text-white mb-5'>Where to ?</h2>
      <div className="flex md:gap-8 mb-5 gap-5 text-lg text-white no-scrollbar overflow-x-scroll w-full items-center sm:justify-center justify-start">
        <div className="flex gap-2 min-w-fit items-center">
          <FaGlobe/>
          Search All
        </div>
        <div  className="flex gap-2 min-w-fit items-center">
          <FaHome/>
          Hotels
        </div>
        <div  className="flex gap-2 min-w-fit items-center">
          <FaTrain/>
          Trains
        </div>
        <div  className="flex gap-2 min-w-fit items-center">
          <FaPlane/>
          Flights
        </div>
      </div>
      <form className='flex shadow-xl bg-white max-w-xl mx-auto w-full pl-4  border  rounded-full' onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={(e) => dispatch(setSearchTerm(e.target.value))} className='w-full py-2 outline-none bg-transparent' placeholder='Search place..' />
        <button className=' py-3 outline-none pr-3 pl-2  rounded-r-full'>
          <GoSearch size={20} />
        </button>
      </form>
     </div>
    </div>
  )
}

export default Searchbar