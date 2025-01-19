import axios from "axios"
axios.defaults.withCredentials = true;
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/places`


export const addReview = async(review,placeId) => { 
    const {data} = await axios.post(`${baseUrl}/${placeId}/reviews`,review)
    return data;
}