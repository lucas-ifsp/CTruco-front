import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";


export const ProtectedRoute = ({ children }) => {
    const {isAuthenticated} = useContext(UserContext)
    console.log('route')
    console.log(isAuthenticated())
    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }
    return children;
};

export default ProtectedRoute