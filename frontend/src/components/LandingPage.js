import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  photoContainer: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  info: {
    textAlign: 'center',
  },
};

const LandingPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.photoContainer}>
        <img 
          src="https://via.placeholder.com/150" 
          alt="Profile" 
          style={styles.photo} 
        />
      </div>
      <div style={styles.info}>
        <h2>John Doe</h2>
        <p>Email: johndoe@example.com</p>
        <p>Location: New York, NY</p>
        <p>Bio: Software Developer with a passion for creating amazing web applications.</p>
      </div>
    </div>
  );
};



export default LandingPage;
