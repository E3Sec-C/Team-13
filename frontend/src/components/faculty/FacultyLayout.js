import React from "react";
import FacultySidebar from "./FacultySidebar";
import "../../styles/dashboard.css";
import { Outlet } from "react-router-dom";

// Main Layout Component
const FacultyLayout = ({ isSidebarCollapsed }) => {
  return (
    <div className={`layout-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <FacultySidebar isCollapsed={isSidebarCollapsed} />
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default FacultyLayout;
