import { useState } from 'react'
import {GoSearch} from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../redux/slices/placeSlice'

const Searchbar = () => {
    const dispatch = useDispatch()
    const {searchTerm} = useSelector(state=>state.place)
  return (
    <div className='w-full md:h-[40vh] h-[30vh] flex auth items-center justify-center p-5'>
        <div className='flex shadow-xl max-w-xl mx-auto w-full pl-4  bg-gray-200 rounded-full'>
        <input type="text" value={searchTerm} onChange={(e)=>dispatch(setSearchTerm(e.target.value))} className='w-full py-2 outline-none bg-transparent' placeholder='Search place..'/>
        <button className='bg-green-500 py-2 outline-none pr-3 pl-2  rounded-r-full'>
        <GoSearch size={20}/>
        </button>
        </div>
    </div>
  )
}

export default Searchbar