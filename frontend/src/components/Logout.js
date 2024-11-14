// logoutHandler.js
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from local storage or any other storage mechanism
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    // Redirect to home page
    navigate("/");
  }, [navigate]);

  return null; // No UI component needed for this
};

export default Logout;