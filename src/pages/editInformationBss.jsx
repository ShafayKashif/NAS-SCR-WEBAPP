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

function EditInformationBss() {
  const location = useLocation();
  

  const [name, setName]=useState('');
  const [cnic, setCnic]=useState('');
  const [email, setEmail]=useState('');
  const [stationAssigned, setStationAssigned]=useState('')
  const [phone, setPhone]=useState('')

  const [error, setError]=useState('')

  const [obtainedUserInfo,setObtainedUserInfo]=useState(null)
  const [obtainedBssInfo,setObtainedBssInfo]=useState(null)

  const [userId, setUserId]=useState('')
  const [bssId, setBssId]=useState('')

  const [changesSaved, setChangesSaved]=useState(false)

  useEffect(()=>{
    const obtainDetails=async()=>{

            try{
              const obtainedUser = await getRecord('Details User', [where("email", "==", location.state.email)]);
              const obtainedOfficer= await getRecord('Bss Officer', [where("email", "==", location.state.email)]);

              setObtainedUserInfo(obtainedUser)
              setObtainedBssInfo(obtainedOfficer)

              setName(obtainedUser.name);
              setPhone(obtainedUser.phone);
              setCnic(obtainedUser.cnic);
              setEmail(obtainedUser.email);

              setStationAssigned(obtainedOfficer.station)

              setUserId(obtainedUser.id)
              setBssId(obtainedOfficer.id)
              
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

      let newRecordBss = {
        ...obtainedBssInfo,
        station: stationAssigned
      };

      updateRecord('Details User', userId, newRecordData);
      updateRecord('Bss Officer',  bssId, newRecordBss)

      setChangesSaved(true)
    } catch (err) {
      setError(err.message)
    }
  };


  return (
    <div className="summary-page">
    <Homepage />
    <h1 className="heading">Edit Information Bss</h1>
       
    <Container maxWidth="sm">
    <div style={{marginTop:200}}/>
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
          value={stationAssigned}
          onChange={(e) => setStationAssigned(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />

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

export default EditInformationBss;
