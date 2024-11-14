import React, { useState } from "react";
import StudentNavbar from "./StudentNavbar";
import StudentLayout from "./StudentLayout";
import { Outlet } from "react-router-dom";

// Dashboard content
const StudentDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prevState => !prevState);
  };

  return (
    <div className="dashboard-content">
      <StudentNavbar onSidebarToggle={toggleSidebar} />
      <StudentLayout isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
};

export default StudentDashboard;
