import React, { useState, useEffect } from "react";
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
import { addRecord, getRecordById, updateRecord, getRecord } from "../global/firebaseFunctions";
import {useLocation} from 'react-router-dom';
import {where} from 'firebase/firestore';

import './highlevelcomponents/summarypg.css';
import Homepage from './highlevelcomponents/homepage';

function EditInformationDriver() {
  const location = useLocation();
  


  const [name, setName]=useState('');
  const [cnic, setCnic]=useState('');
  const [email, setEmail]=useState('');
  const [rickshawAssigned, setRickshawAssigned]=useState('')
  const [myPackage, setMyPackage]=useState('')
  const [phone, setPhone]=useState('')

  const [error, setError]=useState('')

  const [obtainedUserInfo,setObtainedUserInfo]=useState(null)
  const [obtainedRickshawInfo,setObtainedRickshawInfo]=useState(null)

  const [userId, setUserId]=useState('')
  const [rickshawId, setRickshawId]=useState('')

  const [changesSaved, setChangesSaved]=useState(false)

  useEffect(()=>{
    const obtainDetails=async()=>{

            try{
              const obtainedUser = await getRecord('Details User', [where("email", "==", location.state.email)]);
              const obtainedRickshaw = await getRecord('Rickshaw Driver', [where("email", "==", location.state.email)]);

              setObtainedUserInfo(obtainedUser)
              setObtainedRickshawInfo(obtainedRickshaw)

              setName(obtainedUser.name);
              setPhone(obtainedUser.phone);
              setCnic(obtainedUser.cnic);
              setEmail(obtainedUser.email);

              setMyPackage(obtainedRickshaw.package)
              setRickshawAssigned(obtainedRickshaw.assigned)

              setUserId(obtainedUser.id)
              setRickshawId(obtainedRickshaw.id)
              
          }catch(err){
              console.log(err)
          }
          
  }
  obtainDetails();
},[])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      
      let newRecordData = {
        ...obtainedUserInfo,
        name: name,
        phone: phone,
        cnic: cnic
      };

      let newRecordRickshaw = {
        ...obtainedRickshawInfo,
        package: myPackage,
        assigned: rickshawAssigned
      };

      updateRecord('Details User', userId, newRecordData);
      updateRecord('Rickshaw Driver',  rickshawId, newRecordRickshaw)

      setChangesSaved(true)
    } catch (err) {
      setError(err.message)
    }
  };


  const handlePackageChange = (event) => {
    setMyPackage(event.target.value);
  };
  return (
    <div className="summary-page">
    <Homepage />
    <h1 className="heading">Edit Information Driver</h1>
    <div style={{marginTop:200}}/>
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="CNIC"
          name="cnic"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <TextField
          label="Email"
          name="email"
          value={email}
          // onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          disabled
        />

        <TextField
          label="Assigned"
          name="Assigned"
          value={rickshawAssigned}
          onChange={(e) => setRickshawAssigned(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Package</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={myPackage}
            label="Package"
            onChange={handlePackageChange}
          >
            <MenuItem value={'gold'}>Gold</MenuItem>
            <MenuItem value={'weekly500'}>Weekly 500</MenuItem>
            <MenuItem value={'weekly630'}>Weekly 630</MenuItem>
            <MenuItem value={'weekly1000'}>Weekly 1000</MenuItem>
            <MenuItem value={'monthly2k'}>Monthly 2k</MenuItem>
            <MenuItem value={'Premium'}>Premium</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Phone Number"
          name="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Changes
        </Button>
      </form>

      {changesSaved?(<Typography sx={{color:"black"}}>Your changes have been saved</Typography>):null}

      <Typography sx={{ color: "red" }}>{error}</Typography>
    </Container>
    </div>
  );
}

export default EditInformationDriver;
