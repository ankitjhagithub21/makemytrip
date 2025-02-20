import axios from "axios"
axios.defaults.withCredentials = true;
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/bookings`

export const createBooking = async(bookingData) => { 
    const {data} = await axios.post(baseUrl,bookingData)
    return data;
}

export const getUserBookings = async (userId) => {
    return await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/bookings/user/${userId}`);
};