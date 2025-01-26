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

export const logoutUser = async() => {
    await axios.get(`${baseUrl}/logout`)
    
}

export const getUser = async() => {
    const {data} = await axios.get(baseUrl)
    return data;
}

export const changeProfileImage = async(formData) => {
    const {data} = await axios.put(`${baseUrl}/change-profile-image`,formData)
    return data;
}

export const deleteProfileImage = async() => {
    const {data} = await axios.delete(`${baseUrl}/delete-profile-image`)
    return data;
}


export const changeName = async(fullName) => {
    const {data} = await axios.put(`${baseUrl}/change-name`,{fullName})
    return data;
}

export const changePassword = async(userData) => {
    const {data} = await axios.put(`${baseUrl}/change-password`,userData)
    return data;
}


export const getUserLikedPlaces = async() => {
    const {data} = await axios.get(`${baseUrl}/liked-places`)
    return data;
}

export const sendOtp = async(userData) => {
    const {data} = await axios.post(`${baseUrl}/forgot-password`,userData)
    return data;
}

export const resetPassword = async(password,token) => {
    const {data} = await axios.post(`${baseUrl}/reset-password/${token}`,{password})
    return data;
}

export const getAllUsers = async() => {
    const {data} = await axios.get(`${baseUrl}/all`)
    return data;
}


export const changeRole = async({userId,role}) => {
    const {data} = await axios.post(`${baseUrl}/role`,{userId,role})
    return data;
}

export const deleteUser = async(userId) => {
    const {data} = await axios.delete(`${baseUrl}/${userId}`)
    return data;
}









