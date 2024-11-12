import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homePage/index';
import SignIn from './components/signIn/SignIn';

import StudentDashboard from './components/student/StudentDashboard';
import StudentProfile from "./components/student/StudentProfile";

const App = () => {
  
  return (

    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path = "/student" element={<StudentDashboard />} >
          <Route path="profile" element={<StudentProfile />} />
          {/* <Route path="/registrations" element={<AdminProfile />} /> */}
          {/* <Route path="/users" element={<AdminProfile />} /> */}
        </Route>
        {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    
  );
}

export default App;