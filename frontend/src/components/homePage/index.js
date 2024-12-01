import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import Footer from './Footer';
import AboutUs from './AboutUs';
import Timeline from './Timeline';
import StatsSection from './StatsSection';
import Testimonials from './Testimonials';
import Hero from './Hero';
import BallSpinner from '../loaders/BallSpinner';
// import Highlights from '../Highlights';

function HomePage() {
  localStorage.clear();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a delay of 3 seconds
  }, []);
  return (
    <>
      {loading ? (
        <BallSpinner />
      ) : (
        <div>
          <div id="navbar">
            <Navbar/>
          </div>
          <Hero />
          <Timeline />
          <div id="aboutus">
            <AboutUs/>
          </div>
          <div id="stats">
            <StatsSection />
          </div>
          <Testimonials />
          <div id="contact">
            <Footer/>
          </div>
        </div>
      )}
      
    </>
  )
}

export default HomePage