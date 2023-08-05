

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Link } from '@mui/material';
import {auth} from  '../config/firebase';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword} from 'firebase/auth';

function Login() {
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
    <Container maxWidth="xs" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
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
        <Typography variant="body2" align="center" sx={{ marginTop: '10px' }}>
        Don't have an account?{' '}
        <Link href="/signup" color="primary">
          Sign up
        </Link>
      </Typography>
      <Typography>{errorMsg}</Typography>
      </form>
    </Container>
  );
}

export default Login;