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

import './highlevelcomponents/homepage.css';
import './highlevelcomponents/summarypg.css';  //data container classes also inside this css file


function DriverInformation() {
  const [detailsUser, setDetailsUser] = useState([]);
  const [rickshawDriver, setRickshawDriver]=useState([])

  const fetchObtainedState = async () => {
    try {
      const users = await getRecords("Details User");
      const drivers=await getRecords("Rickshaw Driver")
      console.log(users)
      setDetailsUser(users);
      setRickshawDriver(drivers)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchObtainedState();
  }, []);

  const navigate = useNavigate();

  const toEditInformationDriver=(passedId, email)=>{
    navigate('/editInformationDriver',{state:{id:passedId, email:email}})
  }

  return (
    <div>
       <div className="summary-page">
            <Homepage />
            <h1 className="heading">Driver Information</h1>
            <div style={{marginTop:200}}/>
      {detailsUser.map((user) => {
        if (user.designation === "Rickshaw Driver") {
          return (
            <div key={user.id} style={{ marginVertical: 10 }} className="data-item">
              <h3>Name: {user.name}</h3>
              <h3>Email: {user.email}</h3>
              <h3>Phone: {user.phone}</h3>
              <h3>CNIC: {user.cnic}</h3>
              <h3>Rickshaw Assigned: {searchList(rickshawDriver, "email",user.email).assigned}</h3>
              <h3>Package: {searchList(rickshawDriver, "email",user.email).package}</h3>
              <a onClick={()=>{toEditInformationDriver(user.id, user.email)}} style={{textDecorationLine: 'underline', color: '#58AA42'}}>View More Details</a>
            </div>
          );
        }
        return null;
      })}
      </div>
    </div>
  );
}

export default DriverInformation;
