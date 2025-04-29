
import { lazy, useEffect, useState } from 'react'
const PlaceCard = lazy(()=>import("./PlaceCard"))
import { getUserLikedPlaces } from '../api/user';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaces } from '../redux/slices/placeSlice';

const LikedPlaces = () => {

  const [loading, setLoading] = useState(true);
 
   const {places} = useSelector(state=>state.place)
   const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {

      try {
        const data = await getUserLikedPlaces();
        dispatch(setPlaces(data.places))
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }


  return (
    <div className='w-full max-w-6xl mx-auto mb-10'>
      <h1 className='text-xl font-semibold mb-5'>Your Liked Places</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {
         places.map((place) => {
          return <PlaceCard key={place._id} place={place} />
        })
      }
      </div>
      </div>
  )
}

export default LikedPlaces