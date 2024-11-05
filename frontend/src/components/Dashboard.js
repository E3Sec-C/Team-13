import React from "react";
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Layout from "./Layout";
import { useState } from "react";

// Dashboard content
const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((isSidebarCollapsed) => !isSidebarCollapsed);
  };

  return (
    <div className="dashboard-content">
      <Navbar onSidebarToggle={toggleSidebar}/>
      <Layout isSidebarCollapsed={isSidebarCollapsed}/>
    </div>
  );
};

export default Dashboard;
