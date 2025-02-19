import { GoSearch } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../redux/slices/placeSlice'
import { useNavigate } from 'react-router-dom'


const Searchbar = () => {
  const dispatch = useDispatch()
  const { searchTerm } = useSelector(state => state.place)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/places")
  }

  return (
    <form className='flex shadow-xl bg-white max-w-xl mx-auto  pl-4  border  rounded-full' onSubmit={handleSubmit}>
      <input type="text" value={searchTerm} onChange={(e) => dispatch(setSearchTerm(e.target.value))} className='w-full py-2 outline-none bg-transparent' placeholder='Search place..' />
      <button className=' py-3 outline-none pr-3 pl-2  rounded-r-full'>
        <GoSearch size={20} />
      </button>
    </form>
  )
}

export default Searchbar