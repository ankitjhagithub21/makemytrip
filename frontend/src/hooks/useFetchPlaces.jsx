import axios from "axios"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setIsLoading, setPlaces } from "../redux/slices/placeSlice";
axios.defaults.withCredentials = true;

const useFetchPlaces = () => {
    const dispatch = useDispatch()
    
    const fetchData = async() => {
        dispatch(setIsLoading(true))
        try{
            const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/places`);
            dispatch(setPlaces(data))
        }catch(error){
            console.log(error)
        }finally{
           dispatch(setIsLoading(false))
        }
    }
  useEffect(()=>{
    fetchData()
  },[])
  
}

export default useFetchPlaces