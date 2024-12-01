import React,{useEffect, useState} from "react";
import { Navigate } from "react-router-dom";

import { setSnackBar } from "./store/features/snackbar/snackbar";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children, access }) => {

    const dispatch = useDispatch();

    const [role, setRole] = useState(localStorage.getItem("role"));
    useEffect(() => {
        const interval = setInterval(() => {
          const updatedRole = localStorage.getItem("role");
          if (updatedRole !== role) {
            setRole(updatedRole);
          }
        }, 1000); // Checking every second
        return () => clearInterval(interval); // Cleanup on unmount
      }, [role]);
    if (!role) {
        dispatch(
          setSnackBar({
            message: "Unauthorized access denied",
            variant: "error",
          })
        )
        return <Navigate to="/" />;
      }
    
      return role === access ? children : (
        dispatch(
          setSnackBar({
            message: "Unauthorized access denied",
            variant: "error",
          })
        ) && 
      <Navigate to="/signin" />);
};

export default ProtectedRoute;