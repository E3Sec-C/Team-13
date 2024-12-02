import React, {Suspense} from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import SnackbarListener from "./components/SnackbarListener";

import HomePage from "./components/homePage/index";
import SignIn from "./components/signIn/SignIn";
import StudentDashboard from "./components/student/StudentDashboard";
import StudentProfile from "./components/student/StudentProfile";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminProfile from "./components/admin/AdminProfile";
import RegistrationForm from "./components/admin/Registration";
import GenerateCredentials from "./components/admin/GenerateCredentials";
import ComplaintForm from "./components/ComplaintForm";
import Logout from "./components/Logout";
import HodDashboard from "./components/hod/HodDashboard";
import HodProfile from "./components/hod/HodProfile";
import ComplaintList from "./components/hod/ComplaintList";
import ViewUsers from "./components/hod/ViewUsers";
import NonTeachingStaffDashboard from "./components/nonTeachingStaff/NonTeachingStaffDashboard";
import NonTeachingStaffProfile from "./components/nonTeachingStaff/NonTeachingStaffProfile";
import NonTeachingStaffInfrastructure from "./components/nonTeachingStaff/Infrastructure";
import ViewResults from "./components/student/ViewResults";

// Faculty Components
import FacultyDashboard from "./components/faculty/FacultyDashboard";
import FacultyProfile from "./components/faculty/FacultyProfile";
import StudentsData from "./components/faculty/StudentsData";
import UploadMarks from "./components/faculty/UploadMarks";
import UploadAttendance from "./components/faculty/UploadAttendance";



import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const role = localStorage.getItem("role");
  return (
    <>
      <SnackbarListener />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/student" 
            element={
              <ProtectedRoute access={"student"}>
                <StudentDashboard />
              </ProtectedRoute>
              }
          >
          
            <Route index element={<StudentProfile />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="complaint" element={<ComplaintForm />} />
            <Route path="results" element={<ViewResults />} />
            <Route path="logout" element={<Logout />} />
          </Route>
          <Route path="/faculty" element={<FacultyDashboard />}>
          <Route index element={<FacultyProfile />} />
          <Route path="profile" element={<FacultyProfile />} />
          <Route path="uploadMarks" element={<UploadMarks />} />
          <Route path="uploadAttendance" element={<UploadAttendance />} />
          <Route path="students" element={<StudentsData />} />
          <Route path="complaint" element={<ComplaintForm />} />
          <Route path="logout" element={<Logout />} />
        </Route>

          <Route path="/admin" element={
              <ProtectedRoute access={"admin"}>
              <AdminDashboard />
            </ProtectedRoute>
          }
            >
            <Route index element={<AdminProfile />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="registrations" element={<RegistrationForm />} />
            <Route path="generateUser" element={<GenerateCredentials />} />
            <Route path="complaint" element={<ComplaintForm />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          <Route path="/hod" element={
            <ProtectedRoute access={"hod"}>
            <HodDashboard />
          </ProtectedRoute>
          }>
            <Route index element={<HodProfile />} />
            {/* Default to HOD Profile */}
            <Route path="profile" element={<HodProfile />} />
            <Route path="viewUsers" element={<ViewUsers />} />
            <Route path="viewComplaints" element={<ComplaintList />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          <Route path="/nonTeachingStaff" element={
            <ProtectedRoute access={"nonTeachingStaff"}>
            <NonTeachingStaffDashboard />
          </ProtectedRoute>
          }>
          <Route index element={<NonTeachingStaffProfile />} />

            <Route path="profile" element={<NonTeachingStaffProfile />} />
            <Route path="infrastructure" element={<NonTeachingStaffInfrastructure />}/>
            {/* <Route path='registrations' element={<RegistrationForm/>} />
            <Route path='generateUser' element={<GenerateCredentials/>} /> */}
            <Route path="complaint" element={<ComplaintForm />} />
            <Route path="logout" element={<Logout />} />

          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
