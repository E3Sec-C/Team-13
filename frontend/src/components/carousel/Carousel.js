// src/components/Carousel.js

import React from 'react';
import Slider from 'react-slick';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const slides = [
    {
      mainText: "Welcome to the University Department Information System",
      subText: "Explore various departments and learn more about our academic offerings.",
      image: "/carousel1.jpg", // Correct path for public folder image
    },
    {
      mainText: "Research and Innovation",
      subText: "Discover our commitment to research and the latest innovations.",
      image: "/carousel2.jpg", // Correct path for public folder image
    },
    {
      mainText: "Student Services and Support",
      subText: "Providing resources and support for student success.",
      image: "/carousel3.jpg", // Correct path for public folder image
    },
  ];

  return (
    <div className="w-full mx-auto mt-10">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className="relative flex items-center justify-center h-96 bg-cover bg-center rounded-lg shadow-lg"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div> {/* Optional overlay */}
            <div className="relative text-center text-white p-4">
              <h2 className="text-3xl font-bold mb-2">{slide.mainText}</h2>
              <p className="text-lg">{slide.subText}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
