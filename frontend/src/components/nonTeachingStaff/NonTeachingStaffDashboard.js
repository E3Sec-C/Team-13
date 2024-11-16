import React, { useState, useEffect } from "react";
import NonTeachingStaffNavbar from "./NonTeachingStaffNavbar";
import NonTeachingStaffLayout from "./NonTeachingStaffLayout";
import { useNavigate } from "react-router-dom";

// Dashboard content
const NonTeachingStaffDashboard = () => {

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
      <NonTeachingStaffNavbar onSidebarToggle={toggleSidebar} sessionStartTime={sessionStartTime}/>
      <NonTeachingStaffLayout isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
};

export default NonTeachingStaffDashboard;