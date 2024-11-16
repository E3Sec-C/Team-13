import React, { useState, useEffect } from "react";
import AdminNavbar from './AdminNavbar'
import AdminLayout from "./AdminLayout"
import { useNavigate } from "react-router-dom";

// Dashboard content
const AdminDashboard = () => {
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
      <AdminNavbar onSidebarToggle={toggleSidebar} sessionStartTime={sessionStartTime}/>
      <AdminLayout isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
};

export default AdminDashboard;