import React from "react";
import AdminSidebar from "./AdminSidebar";
import "../../styles/dashboard.css";
import { Outlet } from "react-router-dom";

// Main Layout Component
const Layout = ({ isSidebarCollapsed }) => {
  return (
    <div className={`layout-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <AdminSidebar isCollapsed={isSidebarCollapsed} />
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;