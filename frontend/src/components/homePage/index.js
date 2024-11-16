import React from 'react'
import Navbar from './Navbar'
import Carousel from './Carousel';
import Footer from './Footer';
import AboutUs from './AboutUs';
// import TimeLine from './TimeLine';
// import Highlights from '../Highlights';

function HomePage() {
  localStorage.clear();
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
      {/* <div id="timeline">
        <TimeLine/>
      </div> */}
      <div id="contactus">
        <Footer/>
      </div>
    </div>
  )
}

export default HomePage