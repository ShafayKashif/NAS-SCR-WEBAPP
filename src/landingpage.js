import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landingpage.css';


  

const LandingPage = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    // check sign in
    // console.log("Signed in successfully");
    navigate('/summarypg');
  };

  return (
    <div className="landing-page">
      <div className="image-container">
        <img src="/rectangle.png" alt="Landing" />
      </div>
      <div className="content-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h2>Please Log In</h2>
        <div className="login-form">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
