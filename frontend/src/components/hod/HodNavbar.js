import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const Navbar = ({ onSidebarToggle }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId); // Clean up interval on unmount
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
        <h1 className="ml-4 text-xl font-semibold text-white">University Department Information System</h1>
      </div>

      <div className="flex items-center space-x-4 ml-auto text-white">
        <h2>{time}</h2>
      </div>
    </nav>
  );
};

export default Navbar;