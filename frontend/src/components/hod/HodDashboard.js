import React, { useEffect, useState } from "react";
import HodNavbar from "./HodNavbar.js";
import HodLayout from "./HodLayout";
import { useNavigate } from "react-router-dom";

// Dashboard content
const HodDashboard = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (!userId || !role) {
      // Redirect to home page if logged in
      navigate("/", { replace: true });
    }
  },[navigate]);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const sessionStartTime = new Date();
  const toggleSidebar = () => {
    setIsSidebarCollapsed(prevState => !prevState);
  };

  return (
    <div className="dashboard-content">
      <HodNavbar onSidebarToggle={toggleSidebar} sessionStartTime={sessionStartTime}/>
      <HodLayout isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
};

export default HodDashboard;