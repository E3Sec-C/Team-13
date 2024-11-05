import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./styles/dashboard.css"; // Import the updated styles

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prevState => !prevState);
  };

  return (
    <div className="layout-container">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className="content">
        <Navbar onSidebarToggle={toggleSidebar} />
        {/* Main content will go here */}
      </div>
    </div>
  );
};

export default App;
