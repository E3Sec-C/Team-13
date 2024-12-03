import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const FacultyNavbar = ({ onSidebarToggle }) => {
  const [sessionTime, setSessionTime] = useState('00:00:00');

  useEffect(() => {
    const sessionStartTime = localStorage.getItem("sessionStartTime");

    if (!sessionStartTime) return;

    const calculateSessionTime = () => {
      const now = new Date();
      const startTime = new Date(sessionStartTime);
      const diff = Math.max(0, now - startTime);

      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
      const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

      setSessionTime(`${hours}:${minutes}:${seconds}`);
    };

    calculateSessionTime();
    const intervalId = setInterval(calculateSessionTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center h-16 bg-blue-600 px-4 shadow-md z-10">
      <div className="flex items-center">
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-lg text-white hover:bg-blue-700 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="ml-4 text-xl font-semibold text-white">Faculty Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4 ml-auto text-white">
        <h2>Session Time: {sessionTime}</h2>
      </div>
    </nav>
  );
};

export default FacultyNavbar;
