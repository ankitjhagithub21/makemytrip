import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'

const AdminRoute = ({children}) => {
    const {user,isLoading} = useSelector(state=>state.user)
    
    if(isLoading){
        return <LoadingPage/>
    }

    if(!user || user.role !== "admin"){
        return <Navigate to={"/"}/>
    }

  return children;
}

export default AdminRoute