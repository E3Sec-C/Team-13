import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import "./styles/dashboard.css";
import Dashboard from "./components/Dashboard";
import HomePage from './components/homePage/HomePage';
import SignIn from './components/signIn/SignIn';



const App = () => {
  
  return (

    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path = "/dashboard" element={<Dashboard />} />
      </Routes>
    

    // <div>
      
    //   <HomePage/>
    //   <Dashboard />

    // </div>

  );
}

export default App;
