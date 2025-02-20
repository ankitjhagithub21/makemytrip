import axios from "axios"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHotels, setIsLoading } from "../redux/slices/hotelSlice";
axios.defaults.withCredentials = true;

const useFetchHotels = () => {
  const dispatch = useDispatch()

  const fetchData = async () => {
    dispatch(setIsLoading(true))
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/hotels`);
      dispatch(setHotels(data))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

}

export default useFetchHotels