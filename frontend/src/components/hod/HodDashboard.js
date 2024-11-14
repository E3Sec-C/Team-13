import React, { useState } from "react";
import HodNavbar from "./HodNavbar.js";
import HodLayout from "./HodLayout";

// Dashboard content
const HodDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prevState => !prevState);
  };

  return (
    <div className="dashboard-content">
      <HodNavbar onSidebarToggle={toggleSidebar} />
      <HodLayout isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
};

export default HodDashboard;