import React from 'react';
import './App.css';
import Navbar from './components/homePage/Navbar'
import Carousel from './components/homePage/Carousel';
import Footer from './components/homePage/Footer';
import AboutUs from './components/homePage/AboutUs';
import "./styles/dashboard.css";
import Dashboard from "./components/Dashboard";



const App = () => {
  
  return (
    <div>
      
      <Navbar/>
      <Carousel/>
      <AboutUs/>
      <Footer/>
      {/* <Dashboard /> */}

    </div>

  );
}

export default App;
