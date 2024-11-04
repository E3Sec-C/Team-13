// src/components/Navbar.js

import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or Brand Name */}
        <a href="/" className="text-2xl font-semibold tracking-wide">
          University Department Information System
        </a>
        
        {/* Links */}
        <div className="flex items-center space-x-6">
          <a href="#about" className="hover:text-gray-200">
            About Us
          </a>
          <a href="#contact" className="hover:text-gray-200">
            Contact Us
          </a>
        

        {/* Sign In Button */}
        
          <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
