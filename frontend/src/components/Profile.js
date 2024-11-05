import React from "react";
import '../styles/profile.css'

const Profile = ({userData}) =>{

    if (!userData) return <p>Loading...</p>

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <img src={userData.image} alt="Profile" className="profile-image" />
                    <h2>{userData.ID}</h2>
                    <p className="profile-title">{userData.year} {userData.section}</p>
                </div>
                
                <div className="profile-details">
                <div className="profile-row">
                    <span className="label">Mobile:</span>
                    <span className="value">{userData.mobile}</span>
                </div>
                <div className="profile-row">
                    <span className="label">BloodGroup:</span>
                    <span className="value">{userData.bloodGroup}</span>
                </div>
                <div className="profile-row">
                    <span className="label">Address:</span>
                    <span className="value">{userData.address}</span>
                </div>
                <div className="profile-row">
                    <span className="label">Address:</span>
                    <span className="value">{userData.address}</span>
                </div>
                </div>
            </div>
    </div>
    );
}

export default Profile;