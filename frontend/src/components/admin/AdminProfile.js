import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [profileData, setProfileData] = useState({
    ID: "",
    name: "",
    email: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/admin/${localStorage.getItem("userId")}`
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
        `http://localhost:5000/api/v1/admin/update/${localStorage.getItem(
          "userId"
        )}`,
        modifiedData
      );
      if (file) {
        const formData = new FormData();
        formData.append("admin", file);

        const params = {
          ID: profileData.ID,
          role: "admin",
        };
        await axios.post(
          `http://localhost:5000/api/v1/admin/upload/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: params,
          }
        );
      }

      setProfileData((prevData) => ({ ...prevData, ...response.data }));
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile data:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 mt-20 border border-gray-300 rounded-lg bg-gray-100 bg-gradient-to-r from-gray-200 to-blue-300">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Admin Profile
      </h2>
      <div className="flex flex-wrap gap-8">
        <img
          src={
            `http://localhost:5000/api/v1/admin/image/${localStorage.getItem(
              "userId"
            )}/${localStorage.getItem("role")}` ||
            "http://via.placeholder.com/250x250"
          }
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover mb-6"
        />

        <div className="flex-grow">
          <div className="mb-4 flex items-center justify-between">
            <label className="block font-semibold mb-1 w-1/3">ID:</label>
            <p className="text-gray-700 w-2/3">{profileData.ID}</p>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="block font-semibold mb-1 w-1/3">Email:</label>
            <p className="text-gray-700 w-2/3">{profileData.email}</p>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="block font-semibold mb-1 w-1/3">Name:</label>
            <p className="text-gray-700 w-2/3">{profileData.name}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Edit
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-center mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Profile Image:</label>
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
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
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

export default AdminProfile;
