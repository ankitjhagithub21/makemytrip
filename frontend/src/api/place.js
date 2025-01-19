import axios from "axios"
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/places`


export const getPlaceById = async(placeId) => { 
    const {data} = await axios.get(`${baseUrl}/${placeId}`)
    return data;
}