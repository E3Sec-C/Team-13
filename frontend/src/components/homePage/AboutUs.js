// src/components/AboutUs.js

import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        
        {/* Image */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
          <img 
            src="/aboutus.jpeg" // Ensure this image is in the public folder or adjust the path as needed
            alt="Computer Science and Engineering Department"
            className="max-w-xs md:max-w-sm w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Brief Description */}
        <div className="w-full md:w-1/2 md:pl-8 text-gray-800">
          <h2 className="text-3xl font-bold mb-4">Computer Science and Engineering Department</h2>
          <p className="text-lg">
            The CSE Department at RGUKT RK Valley focuses on providing students with a solid foundation in computer science, equipping them with the skills needed for a successful career in technology. Our faculty members are dedicated to innovative teaching and research, fostering an environment that promotes technical excellence and hands-on learning.
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default AboutUs;
