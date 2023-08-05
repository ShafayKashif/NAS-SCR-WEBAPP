import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";
import { addRecord } from "../global/firebaseFunctions";

function EditInformationDriver() {
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    email: "",
    rickshawnumberplate: "",
    package: "",
    phone: "",
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
      addRecord("new", formData);
    } catch (err) {
      setError(err);
    }
  };

  const handleChangeOption = (event) => {
    formData.package=event.target.value;
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Submission Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="CNIC"
          name="cnic"
          value={formData.cnic}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="Rickshaw Number plate"
          name="rickshawnumberplate"
          value={formData.rickshawnumberplate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Package</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.package}
            label="Package"
            onChange={handleChangeOption}
          >
            <MenuItem value={'Gold'}>Gold</MenuItem>
            <MenuItem value={'Silver'}>Silver</MenuItem>
            <MenuItem value={'Bronze'}>Bronze</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Phone Number"
          name="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      <Typography sx={{ color: "red" }}>{error}</Typography>
    </Container>
  );
}

export default EditInformationDriver;
