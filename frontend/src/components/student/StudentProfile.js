import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    ID: "",
    name: "",
    year: "",
    sem: "",
    email: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/student/${localStorage.getItem(
            "userId"
          )}`
        );
        setProfileData(response.data);
        setEditedData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSave = async () => {
    // Construct an object to hold only the modified fields
    const modifiedData = Object.keys(editedData).reduce((acc, key) => {
      if (
        editedData[key] !== profileData[key] &&
        editedData[key] !== undefined
      ) {
        acc[key] = editedData[key];
      }
      return acc;
    }, {});

    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/student/update/${localStorage.getItem(
          "userId"
        )}`,
        modifiedData
      );

      if (file) {
        const formData = new FormData();
        formData.append("student", file);

        const params = {
          ID: profileData.ID,
          role: "student",
        };
        await axios.post(
          `http://localhost:5000/api/v1/student/upload/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: params,
          }
        );
      }

      setProfileData((prevData) => ({ ...prevData, ...response.data })); // Update profileData with the server response
      alert("Profile updated successfully!");
      setIsEditing(false); // Close the edit popup
    } catch (error) {
      console.error("Error updating profile data:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg bg-gradient-to-r from-gray-200 to-gray-300">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="flex items-center">
        <img
          src={
            `http://localhost:5000/api/v1/student/image/${localStorage.getItem(
              "userId"
            )}/${localStorage.getItem('role')}` || "http://via.placeholder.com/250x250"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mr-6"
        />
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <label className="font-semibold w-20">ID:</label>
            <p>{profileData.ID}</p>
          </div>
          <div className="flex items-center mb-2">
            <label className="font-semibold w-20">Email:</label>
            <p>{profileData.email}</p>
          </div>
          <div className="flex items-center mb-2">
            <label className="font-semibold w-20">Name:</label>
            <p>{profileData.name}</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsEditing(true)}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Edit
      </button>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-center mb-6">Edit Profile</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Profile Image:</label>
              <input
                name="student"
                type="file"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-lg"
                accept=".jpg"
              />
              <p className="text-xs pl-1">
                only .jpg files less than 10MB allowed
              </p>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
