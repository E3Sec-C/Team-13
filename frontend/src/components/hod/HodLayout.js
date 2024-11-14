import React from "react";
import HodSidebar from "./HodSidebar";
import "../../styles/dashboard.css";
import { Outlet } from "react-router-dom";

// Main Layout Component
const Layout = ({ isSidebarCollapsed }) => {
  return (
    <div className={`layout-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <HodSidebar isCollapsed={isSidebarCollapsed} />
      <div className={`page-container`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;