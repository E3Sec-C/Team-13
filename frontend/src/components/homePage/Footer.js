// src/components/Footer.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">University Department Information</h3>
          <p className="text-sm text-gray-400">
            Discover and explore information about our university departments, including academic programs, research initiatives, and student services.
          </p>
        </div>
        
        {/* Departments Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Departments</h3>
          <ul>
            <li><a href="/science" className="text-gray-400 hover:text-white">Science</a></li>
            <li><a href="/engineering" className="text-gray-400 hover:text-white">Engineering</a></li>
            <li><a href="/arts" className="text-gray-400 hover:text-white">Arts</a></li>
            <li><a href="/medicine" className="text-gray-400 hover:text-white">Medicine</a></li>
          </ul>
        </div>
        
        {/* Resources Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul>
            <li><a href="/library" className="text-gray-400 hover:text-white">Library</a></li>
            <li><a href="/admissions" className="text-gray-400 hover:text-white">Admissions</a></li>
            <li><a href="/events" className="text-gray-400 hover:text-white">Events</a></li>
            <li><a href="/career" className="text-gray-400 hover:text-white">Career Services</a></li>
          </ul>
        </div>
        
        {/* Contact & Social Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">123 University Ave, City, State, 12345</p>
          <p className="text-sm text-gray-400 mt-2">Phone: (123) 456-7890</p>
          <p className="text-sm text-gray-400">Email: info@university.edu</p>

          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} University Department Information System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
