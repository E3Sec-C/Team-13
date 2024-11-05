import React from "react";
import Sidebar from "./Sidebar";
import "./../styles/dashboard.css";

// Main Layout Component
const Layout = ({isSidebarCollapsed}) => {
  
  return (
    <div className="layout-container">
      <Sidebar isCollapsed = {isSidebarCollapsed} />
      <div className="page-container">
          <h1>This is a Heading</h1>
      </div>
    </div>
  );
};

export default Layout;
