import React from "react";
import Sidebar from "./Sidebar";
import "./../styles/dashboard.css";

// Main Layout Component
const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="page-container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
