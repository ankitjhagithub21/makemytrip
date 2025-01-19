import { useEffect, useState } from "react"
import axios from "axios"
axios.defaults.withCredentials = true;

const useFetch = (url) => {
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
    
    const fetchData = async() => {
        try{
            const {data} = await axios.get(url);
            setData(data)
        }catch(error){
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }
  useEffect(()=>{
    fetchData()
  },[])
  return [data,loading,error]
}

export default useFetch