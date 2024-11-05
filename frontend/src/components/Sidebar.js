import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import "../styles/dashboard.css";

// Sidebar component
const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const [isUsersExpanded, setIsUsersExpanded] = useState(false); // State for Users dropdown
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true); // To track sidebar expansion

  // Navigation structure
  const NAVIGATION = [
    {
      kind: 'header',
      title: 'Quick Actions',
    },
    {
      segment: 'profile',
      title: 'Profile',
      icon: <DashboardIcon />,
    },
    {
      segment: 'registrations',
      title: 'Registrations',
      icon: <HowToRegIcon />,
    },
    {
      kind: 'divider',
    },
    {
      kind: 'header',
      title: 'Analytics',
    },
    {
      segment: 'users',
      title: 'Users',
      icon: <GroupIcon />,
      children: [
        {
          segment: 'students',
          title: 'Students',
          icon: <PersonIcon />,
        },
        {
          segment: 'faculty',
          title: 'Faculty',
          icon: <PersonIcon />,
        },
        {
          segment: 'nonteachingstaff',
          title: 'Non-Teaching staff',
          icon: <PersonIcon />,
        },
        {
          segment: 'hod',
          title: 'HOD',
          icon: <PersonIcon />,
        },
      ],
    },
    {
      segment: 'logout',
      title: 'Logout',
      icon: <LogoutIcon />,
    },
  ];

  // Handle toggle for expanding/collapsing Users dropdown
  const handleToggleUsersDropdown = () => {
    setIsUsersExpanded(!isUsersExpanded);
  };

  // Handle sidebar expansion when clicking the Users icon in the collapsed state
  const handleUsersClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    if (isCollapsed) {
      setIsSidebarExpanded(true); // Expand the sidebar
    }
    handleToggleUsersDropdown();
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isSidebarExpanded ? "" : "expanded"}`}>
      <ul>
        {NAVIGATION.map((item, index) => (
          item.kind === 'header' ? (
            <li key={index} className="header">{!isCollapsed && item.title}</li> // Hide header titles in collapsed state
          ) : item.kind === 'divider' ? (
            <li key={index} className="divider"></li>
          ) : (
            <li key={index} className="nav-item">
              <NavLink 
                to={`/${item.segment}`} 
                className={`nav-link ${item.segment === 'users' && isUsersExpanded ? 'active' : ''}`} 
              >
                <div className="icon">{item.icon}</div>
                {!isCollapsed && item.title} {/* Show title only in expanded state */}
              </NavLink>

              {item.segment === 'users' && (
                <div className="dropdown-toggle" onClick={handleUsersClick}>
                  {item.segment === 'users' && (isUsersExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
                </div>
              )}

              {item.children && isUsersExpanded && (
                <ul className="sub-nav">
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex} className="sub-nav-item">
                      <NavLink to={`/${child.segment}`} className="sub-nav-link">
                        <div className="icon">{child.icon}</div>
                        {!isCollapsed && child.title} {/* Show title only in expanded state */}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
