import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Ensure you have react-router-dom installed

import { setSnackBar } from "../../store/features/snackbar/snackbar";
import { useDispatch } from "react-redux";

function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (userId && role) {
      // Redirect to home page if logged in
      // navigate("/signin", { replace: true });
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('sessionStartTime');
    }
  }, [navigate])

  const dispatch = useDispatch();

  const [role, setRole] = useState("");

  const initialValues = {
    userId: "",
    password: "",
    role: "student", // Set a default role
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        // Manually set the role in Formik values before sending data
        const data = {
          userId: values.userId,
          password: values.password,
          role: role, // Directly use the state value
        };

        const url = `http://localhost:5000/api/v1/user/signin`;
        const response = await axios.post(url, data);

        if (response && response.data.success) {
          // Save user ID in localStorage
          const sessionStartTime = new Date().toISOString(); // Current timestamp
          localStorage.setItem("sessionStartTime", sessionStartTime); // Save session star
          localStorage.setItem("userId", response.data.userId); // Adjust based on actual response structure
          localStorage.setItem("role", response.data.role);
          if(role==='student'){
            navigate('/student'); 
          }else if(role==='hod'){
            navigate('/hod');
          }else if(role==='faculty'){
            navigate('/faculty');
          }
          else if(role==='nonTeachingStaff'){
            navigate('/nonTeachingStaff');
          }else{
            navigate('/admin'); 
          }
        } else {
          dispatch(
            setSnackBar({
              message: "Invalid Credentials provided",
              variant: "error",
            })
          );
        }
      } catch (err) {
        dispatch(
          setSnackBar({
            message: "Faied to LogIn",
            variant: "error",
          })
        );
      }
    },
  });

  const roles = ["admin", "faculty", "student", "nonTeachingStaff", "hod"];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Sign in</h2>
        </div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Id
            </label>
            <input
              type="text"
              name="userId"
              value={formik.values.userId}
              onChange={formik.handleChange}
              placeholder="Enter your Id"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <Autocomplete
              disablePortal
              options={roles}
              sx={{ width: 385 }}
              onChange={(event, newValue) => setRole(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="role"
                  required
                  className="mt-1 block w-full px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800"
          >
            Sign in
          </button>
        </form>

      </div>
    </div>
  );
}

export default SignIn;
