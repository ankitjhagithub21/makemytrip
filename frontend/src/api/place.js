import axios from "axios"
axios.defaults.withCredentials = true;
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/places`

export const createPlace = async(place) => { 
    const {data} = await axios.post(baseUrl,place)
    return data;
}

export const updatePlace = async(placeId,place) => { 
    const {data} = await axios.put(`${baseUrl}/${placeId}`,place)
    return data;
}

export const removePlace = async(placeId) => { 
    const {data} = await axios.delete(`${baseUrl}/${placeId}`)
    return data;
}


export const getPlaceById = async(placeId) => { 
    const {data} = await axios.get(`${baseUrl}/${placeId}`)
    return data;
}

export const likeUnlikePlace = async(placeId) => { 
    const {data} = await axios.post(`${baseUrl}/${placeId}/like`)
    return data;
}
