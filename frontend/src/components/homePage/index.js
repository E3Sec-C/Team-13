import React from 'react'
import Navbar from './Navbar'
import Carousel from './Carousel';
import Footer from './Footer';
import AboutUs from './AboutUs';
import Timeline from './Timeline';
// import Highlights from '../Highlights';

function HomePage() {
  return (
    <div>
      <div id="navbar">
        <Navbar/>
      </div>
      <div id="carousel">
        <Carousel />
      </div>
      <div id="aboutus">
        <AboutUs/>
      </div>
      {/* <Highlights/> */}
      <Timeline/>
      <div id="contactus">
        <Footer/>
      </div>
    </div>
  )
}

export default HomePage