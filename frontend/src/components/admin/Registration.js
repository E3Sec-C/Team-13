import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({});
  const [role, setRole] = useState(''); // State to manage selected role

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({}); // Reset formData when role changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration successful!', formData);
    alert(`Registration successful for ${role}!`);
  };

  return (
    <div className="registration-container">
      <h2 className='myHead'>User Registration</h2><br/>
      <form onSubmit={handleSubmit}>
        <div className="registration-form">

        {/* Role Selection */}
        <div className="role-select field">
          <label>
            Select Role:
            <select value={role} onChange={handleRoleChange} required>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Faculty">Faculty</option>
              <option value="Student">Student</option>
              <option value="NonTeachingStaff">Non-Teaching Staff</option>
              <option value="HOD">HOD</option>
            </select>
          </label>
        </div>

        {/* Conditionally Render Fields Based on Role */}
        {role && (
          <>
            {/* Image Upload Field */}
            <div className="field">
              <label>
                Upload Image:
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </>
        )}

        {role === "Admin" && (
          <>
            <div className="field">
              <label>
                ID:
                <input
                  type="text"
                  name="ID"
                  value={formData.ID || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
          </>
        )}

        {role === "Faculty" && (
          <>
            <div className="field">
              <label>
                ID:
                <input
                  type="text"
                  name="ID"
                  value={formData.ID || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Mobile:
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Education:
                <input
                  type="text"
                  name="education"
                  value={formData.education || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
          </>
        )}

        {role === "HOD" && (
          <>
            <div className="field">
              <label>
                ID:
                <input
                  type="text"
                  name="ID"
                  value={formData.ID || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Education:
                <input
                  type="text"
                  name="education"
                  value={formData.education || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
          </>
        )}

        {role === "NonTeachingStaff" && (
          <>
            <div className="field">
              <label>
                ID:
                <input
                  type="text"
                  name="ID"
                  value={formData.ID || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Mobile:
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
          </>
        )}

        {role === "Student" && (
          <>
            <div className="field">
              <label>
                ID:
                <input
                  type="text"
                  name="ID"
                  value={formData.ID || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Mobile:
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="field">
              <label>
                Blood Group:
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup || ""}
                  onChange={handleChange}
                />
              </label>
            </div>
          </>
        )}
        </div>
        {role !== '' && (
          <>
            <div className="field" style={{ textAlign: "center", width: "100%" }}>
              <button type="submit" className="register-button">
                Register
              </button>
            </div>
          </>
        )}
        
      </form>
    </div>
  );
};

export default RegistrationForm;