import React,{useEffect, useState} from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, access }) => {
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
        return <Navigate to="/" />;
      }
    
      return role === access ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;