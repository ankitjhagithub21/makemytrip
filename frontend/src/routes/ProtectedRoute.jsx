import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'

const ProtectedRoute = ({children}) => {
    const {user,isLoading} = useSelector(state=>state.user)
    if(isLoading){
        return <LoadingPage/>
    }
    if(!user){
        return <Navigate to={"/"}/>
    }

  return children;
}

export default ProtectedRoute