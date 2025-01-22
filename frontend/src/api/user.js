import axios from "axios";
axios.defaults.withCredentials = true;
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/users`


export const signup = async(userData) => {
    const {data} = await axios.post(`${baseUrl}/signup`,userData)
    
    return data;
}

export const login = async(userData) => {
    const {data} = await axios.post(`${baseUrl}/login`,userData)
    return data;
}

export const logoutUser = () => {
    const {data} = axios.get(`${baseUrl}/logout`)
    return data;
}

export const getUser = async() => {
    const {data} = await axios.get(baseUrl)
    return data;
}

export const changeProfileImage = async(formData) => {
    const {data} = await axios.put(`${baseUrl}/change-profile-image`,formData)
    return data;
}

export const changeName = async(fullName) => {
    const {data} = await axios.put(`${baseUrl}/change-name`,{fullName})
    return data;
}





