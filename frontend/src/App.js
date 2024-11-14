import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homePage/index';
import SignIn from './components/signIn/SignIn';

import StudentDashboard from './components/student/StudentDashboard';
import StudentProfile from "./components/student/StudentProfile";
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProfile from './components/admin/AdminProfile';
import RegistrationForm from './components/admin/Registration';
import GenerateCredentials from './components/admin/GenerateCredentials';
import ComplaintForm from './components/ComplaintForm';
import Logout from './components/Logout';
import HodDashboard from './components/hod/HodDashboard';
import HodProfile from './components/hod/HodProfile';
import ComplaintList from './components/hod/ComplaintList';
import ViewUsers from "./components/hod/ViewUsers"
import NonTeachingStaffDashboard from './components/nonTeachingStaff/NonTeachingStaffDashboard';
import NonTeachingStaffProfile from './components/nonTeachingStaff/NonTeachingStaffProfile';
const App = () => {
  
  return (

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path = "/student" element={<StudentDashboard />} >
          <Route path="profile" element={<StudentProfile />} />
          <Route path='complaint' element={<ComplaintForm/>} />
          {/* <Route path="/registrations" element={<AdminProfile />} /> */}
          {/* <Route path="/users" element={<AdminProfile />} /> */}
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path='/admin' element={<AdminDashboard/>}>
          <Route path='profile' element={<AdminProfile/>} />
          <Route path='registrations' element={<RegistrationForm/>} />
          <Route path='generateUser' element={<GenerateCredentials/>} />
          <Route path='complaint' element={<ComplaintForm/>} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path="/hod" element={<HodDashboard/>}>
          <Route path='profile' element={<HodProfile/>} />
          <Route path='viewUsers' element={<ViewUsers/>} />
          <Route path='viewComplaints' element={<ComplaintList/>} />
          <Route path="logout" element={<Logout />} />
        </Route>


        <Route path='/nonTeachingStaff' element={<NonTeachingStaffDashboard/>}>
          <Route path='profile' element={<NonTeachingStaffProfile/>} />
          {/* <Route path='registrations' element={<RegistrationForm/>} />
          <Route path='generateUser' element={<GenerateCredentials/>} /> */}
          <Route path='complaint' element={<ComplaintForm/>} />
        </Route>
      </Routes>
    
  );
}

export default App;