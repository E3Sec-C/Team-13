import React from 'react'
import Navbar from './Navbar'
import Carousel from './Carousel';
import Footer from './Footer';
import AboutUs from './AboutUs';
import Timeline from './Timeline';
import StatsSection from './StatsSection';
import PollSection from './PollSection';
import Testimonials from './Testimonials';
// import Highlights from '../Highlights';

function HomePage() {
  localStorage.clear();
  return (
    <div>
      <div id="navbar">
        <Navbar/>
      </div>
      {/* <div id="carousel">
        <Carousel />
      </div> */}
      <Timeline/>
      <div id="aboutus">
        <AboutUs/>
      </div>
      <div id="stats">
        <StatsSection />
      </div>
      <div id="contactus">
      {/* <Highlights/> */}
      <div id="about">
        <Timeline/>
      </div>
      <Testimonials />
      <div id="contact">
        <Footer/>
      </div>
    </div>
  )
}

export default HomePage