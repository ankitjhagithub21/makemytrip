import { GoSearch } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../redux/slices/hotelSlice'



const HotelSearch = () => {
  const dispatch = useDispatch()
  const { searchTerm } = useSelector(state => state.hotel)

 

  return (
    <div className='flex shadow-xl bg-white max-w-xl mx-auto  pl-4  border  rounded-full'>
      <input type="text" value={searchTerm} onChange={(e) => dispatch(setSearchTerm(e.target.value))} className='w-full py-2 outline-none bg-transparent' placeholder='Search hotel..' />
      <button className=' py-3 outline-none pr-3 pl-2  rounded-r-full'>
        <GoSearch size={20} />
      </button>
    </div>
  )
}

export default HotelSearch