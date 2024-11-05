import React from "react";
import Sidebar from "./Sidebar";
import "./../styles/dashboard.css";
import Profile from "./Profile";
import Registration from "./student/Registration";

// Main Layout Component
const Layout = ({isSidebarCollapsed}) => {
  
  const user = {
    ID: "R200591",
    section: "C",
    year: "E2",
    mobile: "7075690330",
    bloodGroup:"B+",
    address: "So and so",
    image:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcultivatedculture.com%2Flinkedin-profile-picture%2F&psig=AOvVaw3iPkFPccraQmjG-3pvcJOA&ust=1730911470550000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOCwiuvSxYkDFQAAAAAdAAAAABAE',

  }

  return (
    <div className="layout-container">
      <Sidebar isCollapsed = {isSidebarCollapsed} />
      <div className="page-container">
          <Registration/>
      </div>
    </div>
  );
};

export default Layout;
