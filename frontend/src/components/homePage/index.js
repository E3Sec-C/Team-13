import React from 'react'
import Navbar from './Navbar'
import Carousel from './Carousel';
import Footer from './Footer';
import AboutUs from './AboutUs';
// import Highlights from '../Highlights';

function HomePage() {
  return (
    <div>
      <Navbar/>
      <Carousel/>
      <AboutUs/>
      {/* <Highlights/> */}
      <Footer/>
    </div>
  )
}

export default HomePage