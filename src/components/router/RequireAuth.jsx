import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/context/useAuth";

export const RequireAuth = () => {
    const location = useLocation()
    const {auth} = useAuth()  
    return (auth?.username ? <Outlet/> : <Navigate to='/login' state={{from: location}} replace/> )
}

export default RequireAuth