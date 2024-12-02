import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import axios from "axios";

import { setSnackBar } from "../../store/features/snackbar/snackbar";
import { useDispatch } from "react-redux";
const Profile = () => {
  const dispatch = useDispatch();
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
          `${process.env.REACT_APP_API_STUDENT_GET_BY_ID}/${localStorage.getItem(
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
      dispatch(
        setSnackBar({
          message:"Please provide a jpg image",
          variant:"warning"
        })
      )
      event.target.value = ""; // Reset the file input
      return;
    }

    // Validate file size (10MB = 10 * 1024 * 1024 bytes)
    if (selectedFile.size > 10 * 1024 * 1024) {
      dispatch(
        setSnackBar({
          message:"File is too large",
          variant:"warning"
        })
      )
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
        `${process.env.REACT_APP_API_STUDENT_UPDATE}/${localStorage.getItem(
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
          process.env.REACT_APP_API_STUDENT_UPLOAD_IMAGE,
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
      dispatch(
        setSnackBar({
          message:"Profile updated successfully",
          variant:"success"
        })
      )
      setIsEditing(false); // Close the edit popup
    } catch (error) {
      dispatch(
        setSnackBar({
          message:"Error updating the profile",
          variant:"error"
        })
      )
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 mt-20 border border-gray-300 rounded-lg bg-gray-100 bg-gradient-to-r from-gray-200 to-blue-300">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Student Profile
      </h2>
      <div className="flex flex-wrap gap-8">
        <img
          src={
            `${process.env.REACT_APP_API_STUDENT_GET_IMAGE}/${localStorage.getItem(
              "userId"
            )}/${localStorage.getItem("role")}` ||
            "http://via.placeholder.com/250x250"
          }
          alt="Profile"
          className="w-32 h-32 rounded object-cover mr-6"
        />
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <label className="font-semibold w-20">ID:</label>
            <p>{profileData.ID}</p>
          </div>
          <div className="flex items-center mb-2">
            <label className="font-semibold w-20">Name:</label>
            <p>{profileData.name}</p>
          </div>
          <div className="flex items-center mb-2">
            <label className="font-semibold w-20">Phone:</label>
            <p>{profileData.mobile}</p>
          </div>
          <div className="flex items-center mb-2">
            <label className="font-semibold w-20">Email:</label>
            <p>{profileData.email}</p>
          </div>
          <div className="flex flex-row gap-20 items-center mb-2">
            <div className="flex flex-row ">
              <label className="font-semibold w-20">Year:</label>
              <p>E{profileData.year}</p>
            </div>
            <div className="flex felx-row">
              <label className="font-semibold w-20">Section:</label>
              <p>{profileData.section}</p>
            </div>
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
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-2">
            <h2 className="col-span-2 text-xl font-bold text-center mb-6">
              Edit Profile
            </h2>
            {/*Profile Image*/}
            {file ? (<div className="mb-4 justify-center ml-10">
              <img
                src={URL.createObjectURL(file)}
                alt="Profile"
                className="w-32 h-32 rounded object-cover ml-10"
              />
            </div>) : (<div className="mb-4 justify-center ml-10">
              <img
                src={
                  `${process.env.REACT_APP_API_STUDENT_GET_IMAGE}/${localStorage.getItem(
                    "userId"
                  )}/${localStorage.getItem("role")}` ||
                  "http://via.placeholder.com/250x250"
                }
                alt="Profile"
                className="w-32 h-32 rounded object-cover ml-10"
              />
            </div>)}
            
            {/* Profile Image Upload */}
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

            {/* Email Field */}
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

            {/* Section & Year Fields (2 in a row) */}
            <div className="flex flex-row gap-2">
              <div className="mb-4">
                <label className="block font-semibold mb-2">Section:</label>
                <input
                  type="text"
                  name="section"
                  value={editedData.section}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Year:</label>
                <input
                  type="text"
                  name="year"
                  value={editedData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            {/* Sem & Phone Fields (2 in a row) */}
            <div className="flex flex-row gap-2">
              <div className="mb-4">
                <label className="block font-semibold mb-2">Sem:</label>
                <input
                  type="text"
                  name="sem"
                  value={editedData.sem}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              {/* Blood Group Field */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">Blood Group:</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={editedData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Phone:</label>
              <input
                type="text"
                name="phone"
                value={editedData.mobile}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Address Field (Full-width, text area) */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">Address:</label>
              <textarea
                name="address"
                value={editedData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows="1"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 col-span-2">
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
