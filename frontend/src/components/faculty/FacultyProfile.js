import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSnackBar } from '../../store/features/snackbar/snackbar';

const FacultyProfile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    ID: '',
    name: '',
    email: '',
    mobile: '',
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_FACULTY_GET_BY_ID}/${localStorage.getItem("userId")}`
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

    if (!selectedFile.type.includes("jpeg")) {
      dispatch(setSnackBar({
        message: "Please select a JPG file.",
        variant: "error"
      }));
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      dispatch(setSnackBar({
        message: "File size must be less than 10MB.",
        variant: "error"
      }));
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_FACULTY_UPDATE}/${localStorage.getItem("userId")}`,
        editedData
      );

      if (file) {
        const formData = new FormData();
        formData.append("faculty", file);
        const params = {
          ID: profileData.ID,
          role: "faculty",
        };
        await axios.post(
          process.env.REACT_APP_API_FACULTY_UPLOAD_IMAGE,
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
      dispatch(setSnackBar({
        message: "Profile updated successfully!",
        variant: "success"
      }));
      setIsEditing(false);
    } catch (error) {
      dispatch(setSnackBar({
        message: "Failed to update profile.",
        variant: "error"
      }));
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 mt-20 border border-gray-300 rounded-lg bg-gray-100 bg-gradient-to-r from-gray-200 to-blue-300">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Faculty Profile
      </h2>
      <div className="flex flex-wrap gap-8">
        <img
          src={`${process.env.REACT_APP_API_FACULTY_GET_IMAGE}/${localStorage.getItem("userId")}/${localStorage.getItem("role")}`}
          alt="Profile"
          className="w-32 h-32 rounded object-cover mr-6"
        />
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <label className="font-semibold w-20">Name:</label>
            <p>{profileData.name}</p>
          </div>
          <div className="flex items-center mb-2">
            <label className="font-semibold w-20">ID:</label>
            <p>{profileData.ID}</p>
          </div>
          <div className="flex items-center mb-2">
            <label className="font-semibold w-20">Phone:</label>
            <p>{profileData.mobile}</p>
          </div>
          <div className="flex items-center mb-2">
            <label className="font-semibold w-20">Email:</label>
            <p>{profileData.email}</p>
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
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold text-center mb-6">
              Edit Profile
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div>
                {/* Profile Image */}
                <div className="mb-4 flex justify-center">
                  <img
                    src={file ? URL.createObjectURL(file) : `${process.env.REACT_APP_API_FACULTY_GET_IMAGE}/${localStorage.getItem("userId")}/${localStorage.getItem("role")}`}
                    alt="Profile"
                    className="w-32 h-32 rounded object-cover"
                  />
                </div>

                {/* Profile Image Upload */}
                <div className="mb-4">
                  <label className="block font-semibold mb-2">Profile Image:</label>
                  <input
                    name="faculty"
                    type="file"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-500 file:border file:border-gray-300 file:px-4 file:py-2 file:rounded-lg"
                    accept=".jpg"
                  />
                  <p className="text-xs pl-1">
                    Only .jpg files less than 10MB allowed
                  </p>
                </div>

                {/* Name Field */}
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
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-4">
                  <label className="block font-semibold mb-2">ID:</label>
                  <input
                    type="text"
                    name="ID"
                    value={editedData.ID}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

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
                  <label className="block font-semibold mb-2">Phone:</label>
                  <input
                    type="text"
                    name="mobile"
                    value={editedData.mobile}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
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

export default FacultyProfile;
