import React, { useState, useEffect } from "react";
import FacultyLayout from './FacultyLayout';
import FacultyNavbar from './FacultyNavbar';
import { useNavigate } from "react-router-dom";

const FacultyDashboard = () => {

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
    <>
      <div className="dashboard-content">
        <FacultyNavbar onSidebarToggle={toggleSidebar} sessionStartTime={sessionStartTime}/>
        <FacultyLayout isSidebarCollapsed={isSidebarCollapsed} />
      </div>
    </>
  );
};

export default FacultyDashboard;
