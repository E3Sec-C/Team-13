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

const Sidebar = ({ isCollapsed }) => {
  const [isUsersExpanded, setIsUsersExpanded] = useState(false);

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
        { segment: 'students', title: 'Students', icon: <PersonIcon /> },
        { segment: 'faculty', title: 'Faculty', icon: <PersonIcon /> },
        { segment: 'nonteachingstaff', title: 'Non-Teaching staff', icon: <PersonIcon /> },
        { segment: 'hod', title: 'HOD', icon: <PersonIcon /> },
      ],
    },
    {
      segment: 'logout',
      title: 'Logout',
      icon: <LogoutIcon />,
    },
  ];

  const handleToggleUsersDropdown = () => setIsUsersExpanded(prev => !prev);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <ul className="nav-list">
        {NAVIGATION.map((item, index) => (
          item.kind === 'header' ? (
            <li key={index} className="header">
              {!isCollapsed && <span className="header-text">{item.title}</span>}
            </li>
          ) : item.kind === 'divider' ? (
            <li key={index} className="divider" />
          ) : (
            <li key={index} className="nav-item">
              <div className="nav-item-wrapper">
                <NavLink
                  to={`/${item.segment}`}
                  className="nav-link"
                  onClick={item.segment === 'users' ? handleToggleUsersDropdown : undefined}
                >
                  <div className="nav-content">
                    <div className="icon-wrapper">{item.icon}</div>
                    {!isCollapsed && <span className="nav-title">{item.title}</span>}
                  </div>
                  {item.segment === 'users' && !isCollapsed && (
                    <div className="dropdown-toggle">
                      {isUsersExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                    </div>
                  )}
                </NavLink>
              </div>

              {item.children && isUsersExpanded && !isCollapsed && (
                <ul className="sub-nav">
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex} className="sub-nav-item">
                      <NavLink to={`/${child.segment}`} className="sub-nav-link">
                        <div className="icon-wrapper">{child.icon}</div>
                        <span className="nav-title">{child.title}</span>
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
