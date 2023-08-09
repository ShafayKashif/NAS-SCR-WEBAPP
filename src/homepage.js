import React from 'react';
import Navbar from './navbar';
import './homepage.css';



const Homepage = () => {
  return (
    <div className="container">
      <div className="top-bar"></div>
      <img className="background-image" src="/background.png" alt="Background" />
      <div className="top-left-image">
        <img src="/logo.png" alt="Top Left" />
      </div>
      
      <Navbar /> {/* Add the Navbar component */}
    
    </div>
  );
};

export default Homepage;
