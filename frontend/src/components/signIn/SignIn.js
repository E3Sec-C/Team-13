import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed

function SignIn() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [role, setRole] = useState('student');

  const handleChange = (e) => {
    setRole(e.target.value); // Update the role when the Select input changes
  };

  const initialValues = {
    userId: '',
    password: '',
    role: 'student', // Set a default role
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
        console.log(response);

        if (response.data.success) {
          // Save user ID in localStorage
          localStorage.setItem('userID', response.data.userId); // Adjust based on actual response structure
          navigate('/dashboard'); // Redirect to dashboard if successful
        } else {
          setError(response.data.message); // Set the error message if the response is not successful
        }
      } catch (err) {
        console.error(err);
        setError("Error Logging In");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Sign in</h2>
        </div>
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">User Id</label>
            <input
              type="text"
              name="userId"
              value={formik.values.userId}
              onChange={formik.handleChange}
              placeholder="Enter your Id"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="••••••••"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <Select
              id="role-select"
              value={role}
              onChange={handleChange}
              className="mt-1 block w-full h-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="faculty">Faculty</MenuItem>
              <MenuItem value="nonTeachingStaff">Non-Teaching Staff</MenuItem>
              <MenuItem value="hod">HOD</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800"
          >
            Sign in
          </button>
        </form>

        {/* Popup for invalid credentials or errors */}
        {error && (
          <div className="popup">
            <p>{error}</p>
            <button onClick={() => setError(null)}> X </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignIn;
