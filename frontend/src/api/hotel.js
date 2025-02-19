import axios from "axios"
axios.defaults.withCredentials = true;
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/hotels`

export const createHotel = async(hotel) => { 
    const {data} = await axios.post(baseUrl,hotel)
    return data;
}

export const updateHotel = async(hotelId,hotel) => { 
    const {data} = await axios.put(`${baseUrl}/${hotelId}`,hotel)
    return data;
}

export const removeHotel = async(hotelId) => { 
    const {data} = await axios.delete(`${baseUrl}/${hotelId}`)
    return data;
}


export const getHotelById = async(hotelId) => { 
    const {data} = await axios.get(`${baseUrl}/${hotelId}`)
    return data;
}

export const getHotels= async() => { 
    const {data} = await axios.get(baseUrl)
    return data;
}
