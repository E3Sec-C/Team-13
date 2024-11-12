import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    ID: '',
    name: '',
    email: '',
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(profileData);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/admin/R200591'); // Replace with actual API endpoint
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
    // Construct an object to hold only the modified fields
    const modifiedData = Object.keys(editedData).reduce((acc, key) => {
      if (editedData[key] !== profileData[key] && editedData[key] !== undefined) {
        acc[key] = editedData[key];
      }
      return acc;
    }, {});
  
    // Only proceed if there is actually data to update
    if (Object.keys(modifiedData).length === 0) {
      alert("No changes made to update.");
      return;
    }
  
    try {
      const response = await axios.put('http://localhost:5000/api/v1/admin/update/R200591', modifiedData); // Replace with actual API endpoint
      setProfileData((prevData) => ({ ...prevData, ...response.data })); // Update profileData with the server response
      alert('Profile updated successfully!');
      setIsEditing(false); // Close the edit popup
    } catch (error) {
      console.error("Error updating profile data:", error);
      alert('Failed to update profile.');
    }
  };
  

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-heading"><b>User Profile</b></h2>
      <div className="profile-content">
        <img
          src={profileData.image || 'no-profile-image.png'}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-field">
          <label>ID:</label>
          <p>{profileData.ID}</p>
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <p>{profileData.email}</p>
        </div>
        <div className="profile-field">
          <label>Name:</label>
          <p>{profileData.name}</p>
        </div>

        <button onClick={() => setIsEditing(true)} className="edit-button">
          Edit
        </button>
      </div>

      {isEditing && (
        <div className="edit-popup-overlay">
          <div className="edit-popup-content">
            <h2><b><center>Edit Profile</center></b></h2>
            <div className="edit-field">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-field">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-field">
              <label>Profile Image:</label>
              <input type="file" onChange={handleImageUpload} />
            </div>

            <button onClick={handleSave} className="save-button">
              Save Changes
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;