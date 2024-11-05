import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = ({ onSidebarToggle }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center h-16 bg-blue-600 px-4 shadow-md z-10">
      {/* Left section with toggle button */}
      <div className="flex items-center">
        <button
          onClick={onSidebarToggle}
          className="p-2 rounded-lg text-white hover:bg-blue-700 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Title */}
        <h1 className="ml-4 text-xl font-semibold text-white">My Dashboard</h1>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Add your right-side components here */}
      </div>
    </nav>
  );
};

export default Navbar;