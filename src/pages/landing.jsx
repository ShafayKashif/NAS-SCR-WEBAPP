import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { createOrUpdateRecord } from "../global/firebaseFunctions";

function Landing() {
  const [formData, setFormData] = useState({
    fare: 0,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      // Add your submission logic here
      console.log(formData);
      // You can send the data to your server or handle the submission as needed
      createOrUpdateRecord("Day Fare", "Fare", formData)

    } catch (err) {
      setError(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Landing Page
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Fare"
          name="fare"
          value={formData.fare}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          type="number"
        />
        
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      <Typography sx={{ color: "red" }}>{error}</Typography>
    </Container>
  );
}

export default Landing;
