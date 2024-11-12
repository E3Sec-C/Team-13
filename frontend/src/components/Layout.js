import React from "react";
import Sidebar from "./Sidebar";
import "../styles/dashboard.css";
import { Routes,Route } from "react-router-dom";
import RegistrationForm from "./admin/Registration";
import Profile from "./Profile";

// Main Layout Component
const Layout = ({ isSidebarCollapsed }) => {
  return (
    <div className={`layout-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <Routes>
        <Route path='/' element={<Profile/>} />
      </Routes>
    </div>
  );
};

export default Layout;
