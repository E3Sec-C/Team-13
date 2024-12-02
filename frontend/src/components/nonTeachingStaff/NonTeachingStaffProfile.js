import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSnackBar } from '../../store/features/snackbar/snackbar';

const NonTeachingStaffProfile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    ID: '',
    name: '',
    email: '',
    mobile: '',
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/nonTeachingStaff/${localStorage.getItem('userId')}`);
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

  const handleImageUpload = (e) => {
    setEditedData((prevData) => ({
      ...prevData,
      image: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleSave = async () => {
    const modifiedData = Object.keys(editedData).reduce((acc, key) => {
      if (editedData[key] !== profileData[key] && editedData[key] !== undefined) {
        acc[key] = editedData[key];
      }
      return acc;
    }, {});

    if (Object.keys(modifiedData).length === 0) {
      dispatch(setSnackBar({
        message: "No changes made to update.",
        variant: "info"
      }));
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/v1/nonTeachingStaff/update/${localStorage.getItem('userId')}`, modifiedData);
      setProfileData((prevData) => ({ ...prevData, ...response.data }));
      dispatch(setSnackBar({
        message: "Profile updated successfully!",
        variant: "success"
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile data:", error);
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
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">User Profile</h2>
      <div className="flex flex-wrap gap-8">
        {/* <img
          src={profileData.image || 'no-profile-image.png'}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover mb-6"
        /> */}
        <div className="flex items-center justify-center mb-6">
        {profileData.image ? (
            // If profile image exists, display the image
            <img
            src={profileData.image}
            alt="Profile"
            className="w-36 h-36 rounded-full bg-gray-300 object-cover"
            />
        ) : (
            // If no profile image, display a gray circle with text inside
            <div className="w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
            <p>No Profile Image</p>
            </div>
        )}
        </div>

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
            <div className="mb-4 flex items-center justify-between">
                <label className="block font-semibold mb-1 w-1/3">Mobile:</label>
                <p className="text-gray-700 w-2/3">{profileData.mobile}</p>
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
              <label className="block font-semibold mb-1">Mobile:</label>
              <input
                type="text"
                name="mobile"
                value={editedData.mobile}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Profile Image:</label>
              <input type="file" onChange={handleImageUpload} className="w-full px-3 py-2 border border-gray-300 rounded" />
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

export default NonTeachingStaffProfile;