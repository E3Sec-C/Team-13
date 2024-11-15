import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({});
  const [role, setRole] = useState(''); // State to manage selected role
  const [file,setFile] = useState(null);
  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    // Validate file type (must be JPG or JPEG)
    if (!selectedFile.type.includes("jpeg")) {
      alert("Please select a JPG file.");
      event.target.value = ""; // Reset the file input
      return;
    }

    // Validate file size (10MB = 10 * 1024 * 1024 bytes)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.");
      event.target.value = ""; // Reset the file input
      return;
    }

    setFile(selectedFile);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({}); // Reset formData when role changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Determine the endpoint based on the role
    let url = '';
    switch (role) {
      case 'admin':
        url = 'http://localhost:5000/api/v1/admin';
        break;
      case 'faculty':
        url = 'http://localhost:5000/api/v1/faculty';
        break;
      case 'student':
        url = 'http://localhost:5000/api/v1/student';
        break;
      case 'nonTeachingStaff':
        url = 'http://localhost:5000/api/v1/nonTeachingStaff';
        break;
      case 'hod':
        url = 'http://localhost:5000/api/v1/hod';
        break;
      default:
        alert('Please select a valid role');
        return;
    }
    try {
      // Send the POST request with axios
      console.log("started registration");
      const response = await axios.post(url, formData);

      console.log("data uploaded successfully");

      if (file) {
        const imageFormData = new FormData();
        imageFormData.append(role, file);

        const params = {
          ID: formData.ID,
          role: role,
        };
        await axios.post(
          `${url}/upload/image`,
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: params,
          }
        );
      }
  
      if (response.status === 200) {
        console.log('Registration successful!', formData);
        alert(`Registration successful for ${role}!`);
        // Reload the page to clear form data and reset state
        window.location.reload();
      } else {
        console.error('Error registering user:', response.data);
        alert('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="w-4/5 max-w-4xl mx-auto p-6 mt-16 sm:mt-24 lg:mt-32 border border-gray-300 rounded-lg bg-gray-50 bg-gradient-to-r from-gray-200 to-blue-300">
      <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">User Registration</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Role Selection */}
          <div className="w-full">
            <label className="block font-semibold mb-2">Select Role:</label>
            <select
              value={role}
              onChange={handleRoleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="faculty">Faculty</option>
              <option value="student">Student</option>
              <option value="nonTeachingStaff">Non-Teaching Staff</option>
              <option value="hod">HOD</option>
            </select>
          </div>

          {/* Conditionally Render Fields Based on Role */}
          {role && (
            <div className="w-full">
              <label className="block font-semibold mb-2">Upload Image:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-lg"
                accept=".jpg"
              />
              <p className="text-xs pl-1">
                only .jpg files less than 10MB allowed
              </p>
            </div>
          )}

          {/* Fields based on role */}
          {role === "admin" && (
            <>
              <div className="w-full">
                <label className="block font-semibold mb-2">ID:</label>
                <input
                  type="text"
                  name="ID"
                  value={formData.ID || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}

          {role === "faculty" && (
            <>
              <div className="w-full">
                <label className="block font-semibold mb-2">ID:</label>
                <input
                  type="text"
                  name="ID"
                  value={formData.ID || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Mobile:</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Education:</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}

          {role === "hod" && (
            <>
              <div className="w-full">
                <label className="block font-semibold mb-2">ID:</label>
                <input
                  type="text"
                  name="ID"
                  value={formData.ID || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Education:</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}

          {role === "nonTeachingStaff" && (
            <>
              <div className="w-full">
                <label className="block font-semibold mb-2">ID:</label>
                <input
                  type="text"
                  name="ID"
                  value={formData.ID || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Mobile:</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}

          {role === "student" && (
            <>
              <div className="w-full">
                <label className="block font-semibold mb-2">ID:</label>
                <input
                  type="text"
                  name="ID"
                  value={formData.ID || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Mobile:</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">BloodGroup:</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full">
                <label className="block font-semibold mb-2">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full text-center">
          <button
            type="submit"
            className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;