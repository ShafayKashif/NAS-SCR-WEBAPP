import React from 'react';
import Navbar from './navbar';
import './homepage.css';

// Import your images using the correct paths
import backgroundImage from '../assets/img/background.png';
import logoImage from '../assets/img/logo.png';

const Homepage = () => {
  return (
    <div style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="top-bar"></div>
      {/* Use the imported image paths */}
      <img className="background-image" src={backgroundImage} alt="Background" />
      <div className="top-left-image">
        <img src={logoImage} alt="Top Left" />
      </div>
      
      <Navbar /> {/* Add the Navbar component */}


    
    </div>
  );
};

export default Homepage;
