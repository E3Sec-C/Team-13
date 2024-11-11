import React from "react";
import Sidebar from "./Sidebar";
import "../styles/dashboard.css";
import { Routes,Route } from "react-router-dom";
import RegistrationForm from "./student/Registration";

// Main Layout Component
const Layout = ({ isSidebarCollapsed }) => {
  return (
    <div className={`layout-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <Routes>
        <Route path='/' element={<RegistrationForm/>} />
      </Routes>
    </div>
  );
};

export default Layout;
