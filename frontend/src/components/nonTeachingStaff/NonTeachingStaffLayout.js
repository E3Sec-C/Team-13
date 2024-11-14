import React from "react";
import NonTeachingStaffSidebar from "./NonTeachingStaffSidebar";
import "../../styles/dashboard.css";
import { Outlet } from "react-router-dom";

// Main Layout Component
const Layout = ({ isSidebarCollapsed }) => {
  return (
    <div className={`layout-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <NonTeachingStaffSidebar isCollapsed={isSidebarCollapsed} />
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;