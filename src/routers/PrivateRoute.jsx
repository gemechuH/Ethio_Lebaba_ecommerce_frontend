import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children, role}) => {
    const { user } = useSelector((state) => state.auth);
    const { location } = useLocation()
    if (!user) {
        alert("you must loggin first")

        return <Navigate to="/login" state={{ form: location }} replace/>;
    }
    if (role && user.role !== role) {
        alert("you don't access this page")
        return <Navigate to="/login" state={{ form: location }} replace/>;
    
    }
  
  return children
};

export default PrivateRoute;
