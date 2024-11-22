// src/components/Navbar.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md py-4 px-6 fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or Brand Name */}
        <Link to="/" className="text-2xl font-semibold tracking-wide">
          University Department Information System
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-6 whitespace-nowrap">
          <button 
            onClick={() => scrollToSection('about')} 
            className="hover:text-gray-200 focus:outline-none"
          >
            About Us
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-gray-200 focus:outline-none"
          >
            Contact Us
          </button>

          {/* Sign In Button */}
          <button 
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100" 
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;