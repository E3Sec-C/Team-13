import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import "../../styles/dashboard.css";
import FeedbackIcon from '@mui/icons-material/Feedback';
import SchoolIcon from '@mui/icons-material/School';
import BorderColorIcon from '@mui/icons-material/BorderColor';
// import BookIcon from '@mui/icons-material/Book';

const Sidebar = ({ isCollapsed }) => {

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
        segment: 'uploadMarks',
        title: 'uploadMarks',
        icon: <HowToRegIcon />,
    },
    {
      segment: 'uploadAttendance',
      title: 'uploadAttendance',
      icon: <BorderColorIcon />,
  },
    {
      kind: 'divider',
    },
    {
      kind: 'header',
      title: 'Analytics',
    },
    {
      segment: 'students',
      title: 'Students',
      icon: <SchoolIcon />,
    },
    // {
    //   segment: 'assignment',
    //   title: 'Assignment',
    //   icon: <BookIcon />,
    // },
    {
      segment: 'complaint',
      title: 'Complaint',
      icon: <FeedbackIcon />,
    },
    {
      segment: 'logout',
      title: 'Logout',
      icon: <LogoutIcon />,
    },
  ];

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
                  to={`/faculty/${item.segment}`}
                  className="nav-link"
                  onClick={item.segment === 'users'}
                >
                  <div className="nav-content">
                    <div className="icon-wrapper">{item.icon}</div>
                    {!isCollapsed && <span className="nav-title">{item.title}</span>}
                  </div>
                </NavLink>
              </div>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
