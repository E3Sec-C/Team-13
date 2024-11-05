import React from 'react';
import './App.css';
import Navbar from './components/homePage/Navbar'
import Carousel from './components/homePage/Carousel';
import Footer from './components/homePage/Footer';
import AboutUs from './components/homePage/AboutUs';

function App() {
  return (
    <div>
      
      <Navbar/>
      <Carousel/>
      <AboutUs/>
      <Footer/>
      
    </div>
  );
}

export default App;
