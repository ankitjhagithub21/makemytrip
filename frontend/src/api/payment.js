import axios from "axios"
axios.defaults.withCredentials = true;
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/payments`


export const createPayment = async(paymentData) => { 
    const {data} = await axios.post(`${baseUrl}/create-intent`,paymentData)
    return data;
}

