import { useState } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(true)
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    return children;
};

export default ProtectedRoute