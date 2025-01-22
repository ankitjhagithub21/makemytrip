import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {user,isLoading} = useSelector(state=>state.user)
    if(isLoading){
        return <p>Page is Loading.</p>
    }
    if(!user){
        return <Navigate to={"/"}/>
    }

  return children;
}

export default ProtectedRoute