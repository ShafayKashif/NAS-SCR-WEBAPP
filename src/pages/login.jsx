import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './highlevelcomponents/landingpage.css';
import { Container, Typography, TextField, Button, Link } from '@mui/material';
import {auth} from  '../config/firebase';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { getRecordById } from '../global/firebaseFunctions';

import rectangleImage from './assets/img/rectangle.png';
import logoImage from './assets/img/logo.png';

const LandingPage = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg,setErrorMsg] = useState('');
  const navigate = useNavigate();


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Create a new user with email and password using Firebase
      await signInWithEmailAndPassword(auth, email, password);
      const isAdmin=await getRecordById("DONOTDELETE", "ADMIN");

      if (isAdmin.email!==auth.currentUser.email){
        await auth.signOut();
        throw new Error("Firebase: Error (auth/user-not-found).");
      }
      // User registration successful
      console.log('User registered successfully!');
      navigate("/landing");
    } catch (error) {
      // Error occurred during user registration
      console.log('Error registering user:', error.message);
      setErrorMsg('Error '+error.message);
    }
  };

  return (
    <div className="landing-page">
      <div className="image-container">
        <img src={rectangleImage} alt="Landing" />
      </div>
      <div className="content-container">
        <img src={logoImage} alt="Logo" className="logo" />
        <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>

      <Typography>{errorMsg}</Typography>
      </form>
      </div>
    </div>
  );
};

export default LandingPage;
