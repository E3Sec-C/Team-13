import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({});

  const courseData = {
    ca2201: 'Operating System',
    ca2202: 'Computer Networks',
    ca2203: 'Software Engineering',
  };

  const handleChange = (e, courseKey) => {
    setFormData({
      ...formData,
      [courseKey]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration successful!', formData);
    // Here, you can send the formData to an API or handle it as needed
    alert(`Registration successful !`);
  };

  return (
    <div className="registration-container">
      <h2 className='myHead'>Course Registration</h2><br/>
      <form onSubmit={handleSubmit} className="registration-form">
      {Object.entries(courseData).map(([courseKey, courseName]) => (
          <div key={courseKey} className="course-select">
            <label>
              {courseName}:
              <select
                name={courseKey}
                value={formData[courseKey] || ""}
                onChange={(e) => handleChange(e, courseKey)}
                required
              >
                <option value="">Select an option</option>
                <option value={courseName}>{courseName}</option>
              </select>
            </label>
          </div>
        ))}

        <button type="submit" className='register-button'>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;