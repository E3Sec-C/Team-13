import React,{useState} from 'react';

const AboutUs = () => {
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
    <section className="bg-gradient-to-b from-gray-100 to-indigo-200 py-16 px-6 md:px-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">

        {/* Brief Description */}
        <div className="w-full md:w-1/2 md:pl-10 space-y-6">
          <h2 className="text-4xl font-semibold mb-4 text-black-500 tracking-wide">Computer Science and Engineering Department</h2>
          <p className="text-lg text-indigo-500 leading-relaxed">
            The CSE Department at RGUKT RK Valley focuses on providing students with a solid foundation in computer science, equipping them with the skills needed for a successful career in technology. Our faculty members are dedicated to innovative teaching and research, fostering an environment that promotes technical excellence and hands-on learning.
          </p>

          <div className="flex items-center space-x-4 mt-6">
            <div className="flex items-center text-indigo-600">
              <i className="fa fa-check-circle mr-2 text-lg"></i>
              <span className="text-xl">Innovative Teaching</span>
            </div>
            <div className="flex items-center text-indigo-600">
              <i className="fa fa-check-circle mr-2 text-lg"></i>
              <span className="text-xl">Hands-on Learning</span>
            </div>
          </div>

          <div className="flex justify-center md:justify-start mt-8">
            <button className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-full shadow-md transform transition-all duration-300 hover:bg-indigo-600 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div
              className="w-102 h-102 rounded-lg overflow-hidden animate-float"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: '1000px',
              }}
            >
            <img 
              src="/hero4-bg.png" // Ensure this image is in the public folder or adjust the path as needed
              alt="Computer Science and Engineering Department"
              className="w-full h-full object-cover rounded-lg"
              style={{
                transform: styles.transform,
                transition: 'transform 0.1s ease-out',
              }}
            />
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default AboutUs;
