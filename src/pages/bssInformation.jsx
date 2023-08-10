import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
} from "@mui/material";

import { getRecords } from "../global/firebaseFunctions";
import { auth } from '../config/firebase';
import {searchList} from '../utils/searchList';
import {Link, useNavigate} from 'react-router-dom';

import './highlevelcomponents/summarypg.css';
import Homepage from './highlevelcomponents/homepage';

function BssInformation() {
  const [detailsUser, setDetailsUser] = useState([]);
  const [officers, setOfficer]=useState([])

  const fetchObtainedState = async () => {
    try {
      const users = await getRecords("Details User");
      const officersList=await getRecords("Bss Officer")
      console.log(users)
      console.log(officersList)
      setDetailsUser(users);
      setOfficer(officersList)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchObtainedState();
  }, []);

  const navigate = useNavigate();

  const toEditInformationBss=(passedId, email)=>{
    navigate('/editInformationBss',{state:{id:passedId, email:email}})
  }

  return (
    <div>
    <div className="summary-page">
    <Homepage />
    <div style={{marginTop:200}}/>
    <h1 className="heading">BSS Information</h1>
      {detailsUser.map((user) => {
        if (user.designation === "BSS Officer") {
          return (
            <div className="data-item" key={user.id}>
              <h3>Name: {user.name}</h3>
              <h3>Email: {user.email}</h3>
              <h3>Phone: {user.phone}</h3>
              <h3>CNIC: {user.cnic}</h3>
              <h3>Station: {searchList(officers, "email",user.email).station}</h3>
              <a style={{zIndex:10}} onClick={()=>{toEditInformationBss(user.id, user.email)}} style={{textDecorationLine: 'underline', color: '#58AA42'}}>View More Details</a>
            </div>
          );
        }
        return null;
      })}
    </div>
    </div>
  );
}

export default BssInformation;
