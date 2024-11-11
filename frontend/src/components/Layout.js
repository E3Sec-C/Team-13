import React from "react";
import Sidebar from "./Sidebar";
import "../styles/dashboard.css";

// Main Layout Component
const Layout = ({ isSidebarCollapsed }) => {
  return (
    <div className={`layout-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div className="page-container">
        <p>There is a heading</p>
      </div>
    </div>
  );
};

export default Layout;
