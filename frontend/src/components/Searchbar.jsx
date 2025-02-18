import { GoSearch } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../redux/slices/placeSlice'
import { useNavigate } from 'react-router-dom'

const Searchbar = () => {
  const dispatch = useDispatch()
  const { searchTerm } = useSelector(state => state.place)
  const navigate = useNavigate()
  const handleSubmit = (e) =>{
    e.preventDefault();
    navigate("/places")
  }

  return (
    <div className='flex flex-col gap-5 items-center justify-center px-5 bg-gray-200 py-24'>
      <h2 className='text-5xl font-bold'>Where to ?</h2>
      <form className='flex shadow-xl bg-white max-w-xl mx-auto w-full pl-4  border  rounded-full' onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={(e) => dispatch(setSearchTerm(e.target.value))} className='w-full py-2 outline-none bg-transparent' placeholder='Search place..' />
        <button className=' py-3 outline-none pr-3 pl-2  rounded-r-full'>
          <GoSearch size={20} />
        </button>
      </form>
    </div>
  )
}

export default Searchbar