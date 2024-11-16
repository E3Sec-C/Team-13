import React, { useState, useEffect } from "react";
import StudentNavbar from "./StudentNavbar";
import StudentLayout from "./StudentLayout";
import { useNavigate } from "react-router-dom";

// Dashboard content
const StudentDashboard = () => {

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
      <StudentNavbar onSidebarToggle={toggleSidebar} sessionStartTime={sessionStartTime}/>
      <StudentLayout isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
};

export default StudentDashboard;
