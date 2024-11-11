import React, { useState } from "react";
import Navbar from "./Navbar";
import Layout from "./Layout";

// Dashboard content
const Dashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prevState => !prevState);
  };

  return (
    <div className="dashboard-content">
      <Navbar onSidebarToggle={toggleSidebar} />
      <Layout isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
};

export default Dashboard;
