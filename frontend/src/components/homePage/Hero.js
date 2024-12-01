import React, { useState } from 'react';

const Hero = () => {
  const [styles, setStyles] = useState({ transform: 'rotateX(0deg) rotateY(0deg)' });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = ((x / rect.width) - 0.5) * 2;
    const yPercent = ((y / rect.height) - 0.5) * 2;

    const rotationX = -yPercent * 15;
    const rotationY = xPercent * 15;

    setStyles({
      transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setStyles({ transform: 'rotateX(0deg) rotateY(0deg)' });
  };

  return (
    <section className="py-16 px-6 md:px-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        
        {/* Interactive Image Section */}
        <div
          className="md:w-1/2 flex justify-center"
          style={{ perspective: '1200px' }}
        >
          <div
            className="w-104 h-104 rounded-lg overflow-hidden animate-float"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              perspective: '1000px',
            }}
          >
            <img
              src="/hero3.jpg"
              alt="Interactive"
              className="w-full h-full object-cover rounded-lg"
              style={{
                transform: styles.transform,
                transition: 'transform 0.1s ease-out',
              }}
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="md:w-1/2">
          <h1 className="text-5xl font-extrabold leading-tight mb-6 text-transparent bg-clip-text bg-indigo-600">
            Welcome to the <br /> 
            <span className="text-indigo-600">CSE Department</span>
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Empowering students with a passion for <span className="font-semibold text-purple-600">technology</span>, <span className="font-semibold text-purple-600">innovation</span>, and <span className="font-semibold text-purple-600">critical thinking</span>. Our department is dedicated to creating future leaders in the tech industry.
          </p>
          <p className="text-lg text-gray-600">
            Join us to explore a journey of knowledge, hands-on learning, and growth in the ever-evolving world of <span className="font-bold text-purple-500">Computer Science</span>.
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
