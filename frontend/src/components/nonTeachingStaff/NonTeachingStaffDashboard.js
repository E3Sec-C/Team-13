import React, { useState } from "react";
import NonTeachingStaffNavbar from "./NonTeachingStaffNavbar";
import NonTeachingStaffLayout from "./NonTeachingStaffLayout";
import { Outlet } from "react-router-dom";

// Dashboard content
const NonTeachingStaffDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prevState => !prevState);
  };

  return (
    <div className="dashboard-content">
      <NonTeachingStaffNavbar onSidebarToggle={toggleSidebar} />
      <NonTeachingStaffLayout isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
};

export default NonTeachingStaffDashboard;