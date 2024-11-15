import React, { useState } from "react";
import AdminNavbar from './AdminNavbar'
import AdminLayout from "./AdminLayout"

// Dashboard content
const AdminDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prevState => !prevState);
  };

  return (
    <div className="dashboard-content">
      <AdminNavbar onSidebarToggle={toggleSidebar} />
      <AdminLayout isSidebarCollapsed={isSidebarCollapsed} />
    </div>
  );
};

export default AdminDashboard;