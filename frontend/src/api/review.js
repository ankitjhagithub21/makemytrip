import axios from "axios"
axios.defaults.withCredentials = true;
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/reviews`


export const addReview = async(review,placeId) => { 
    const {data} = await axios.post(`${baseUrl}/${placeId}`,review)
    return data;
}

export const deleteReview = async(reviewId,placeId) => { 
    const {data} = await axios.delete(`${baseUrl}/${placeId}/delete/${reviewId}`)
    return data;
}

export const editReview = async(reviewId,placeId,review) => { 
    const {data} = await axios.put(`${baseUrl}/${placeId}/edit/${reviewId}`,review)
    return data;
}