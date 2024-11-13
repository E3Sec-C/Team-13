import React, { useState } from 'react';
import axios from 'axios';

const GenerateCredentials = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:5000/api/v1/user/signup';

    try {
      const response = await axios.post(url, formData);

      if (response.status === 200) {
        alert(`User login information stored for role: ${formData.role}`);
        setFormData({ userID: '', password: '', role: '' });
        // Reload the page to clear form data and reset state
        window.location.reload();
      } else {
        alert('Failed to store login data. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
      <div className="w-full mt-16 max-w-lg md:max-w-xl lg:max-w-2xl bg-white rounded-xl shadow-lg shadow-indigo-500/40 p-8 md:p-10 lg:p-12 bg-gradient-to-r from-gray-200 to-blue-300">
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">Generate Credentials</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* UserID Field */}
          <div className="space-y-1">
            <label htmlFor="userId" className="text-sm font-medium text-gray-600">
              <b>User ID</b>
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
  
          {/* Password Field */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-600">
              <b>Password</b>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
  
          {/* Role Selection */}
          <div className="space-y-1">
            <label htmlFor="role" className="text-sm font-medium text-gray-600">
              <b>Role</b>
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="" disabled>Select a role</option>
              <option value="Admin">Admin</option>
              <option value="Faculty">Faculty</option>
              <option value="Student">Student</option>
              <option value="NonTeachingStaff">Non-Teaching Staff</option>
              <option value="HOD">HOD</option>
            </select>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-6 font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-600 rounded-md shadow hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
  );
  
};

export default GenerateCredentials;