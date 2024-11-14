import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve user ID from localStorage
    const ID = localStorage.getItem('userID');
    const role = localStorage.getItem('role');
    console.log(role);
    if (!ID || !role) {
      alert('User is not logged in.');
      return;
    }

    try {
      // Sending complaint data to the backend
      const response = await axios.post('http://localhost:5000/api/v1/complaint', {
        "ID":ID,"role":role,
        "description":description,
      });

      if (response.status === 200) {
        alert('Complaint submitted successfully!');
        setDescription(''); // Clear the form after submission
      } else {
        alert('Failed to submit complaint. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('An error occurred while submitting your complaint.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg shadow-indigo-500/40 p-8 md:p-10 lg:p-12 bg-gradient-to-r from-gray-200 to-blue-300">
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">Submit a Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Complaint Description Field */}
          <div className="space-y-1">
            <label htmlFor="description" className="text-sm font-medium text-gray-600">
              <b>Description</b>
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              placeholder="Describe your complaint here..."
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-600 rounded-md shadow hover:from-indigo-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
          >
            Raise Complaint
          </button>
        </form>
      </div>
    </div>
  );
    
};

export default ComplaintForm;