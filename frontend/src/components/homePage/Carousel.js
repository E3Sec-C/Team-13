import React from "react";
import "react-responsive-carousel/lib/styles/carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import { AdminPanelSettings, School, Person, Engineering, SupervisorAccount, Support } from '@mui/icons-material';

const CarouselComponent = () => {
  const carouselItems = [
    {
      title: "Administrator",
      icon: <AdminPanelSettings sx={{ fontSize: 60 }} />,
      description: "Manages user registrations, generates credentials, and oversees system administration.",
      color: "bg-blue-600",
    },
    {
      title: "Faculty",
      icon: <School sx={{ fontSize: 60 }} />,
      description: "Handles course management, assignments, and student grading with an intuitive dashboard.",
      color: "bg-green-600",
    },
    {
      title: "Student",
      icon: <Person sx={{ fontSize: 60 }} />,
      description: "Access course materials, view results, and submit assignments through a personalized interface.",
      color: "bg-purple-600",
    },
    {
      title: "HOD",
      icon: <SupervisorAccount sx={{ fontSize: 60 }} />,
      description: "Oversees department activities, manages faculty, and handles administrative decisions.",
      color: "bg-red-600",
    },
    {
      title: "Non-Teaching Staff",
      icon: <Support sx={{ fontSize: 60 }} />,
      description: "Manages infrastructure, maintains records, and supports administrative operations.",
      color: "bg-yellow-600",
    },
  ];

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div style={{ marginTop: "64px" }}>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={5000}
        showThumbs={false}
        showStatus={false}
        transitionTime={1000}
        swipeable={true}
        emulateTouch={true}
        dynamicHeight={false}
        className="carousel-container"
      >
        {carouselItems.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="carousel-slide h-[500px] flex items-center justify-center"
          >
            <div className={`max-w-3xl mx-auto p-8 rounded-lg shadow-2xl ${item.color} text-white transform transition-all duration-500 hover:scale-105`}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                {item.icon}
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mb-4"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </Carousel>
      <style jsx>{`
        .carousel-container {
          background: linear-gradient(135deg, #f6f8fb 0%, #e9f0f7 100%);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .carousel-slide {
          padding: 2rem;
          background: transparent;
        }
        .carousel .control-arrow {
          background: rgba(0, 0, 0, 0.3);
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        .carousel .control-arrow:hover {
          background: rgba(0, 0, 0, 0.5);
        }
        .carousel .control-dots .dot {
          box-shadow: none;
          background: #000;
          opacity: 0.3;
          transition: all 0.3s ease;
        }
        .carousel .control-dots .dot.selected {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default CarouselComponent;
