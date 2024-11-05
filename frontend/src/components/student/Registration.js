import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    semester: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration successful!', formData);
    // Here, you can send the formData to an API or handle it as needed
    alert(`Registration successful for ${formData.name}!`);
  };

  return (
    <div className="registration-container">
      <h2>Course Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Course:
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select a course</option>
            <option value="math101">Mathematics 101</option>
            <option value="cs101">Computer Science 101</option>
            <option value="phy101">Physics 101</option>
          </select>
        </label>

        <label>
          Semester:
          <input
            type="number"
            name="semester"
            min="1"
            max="8"
            value={formData.semester}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className='register-button'>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;