import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

import {getRecords, updateRecord} from '../global/firebaseFunctions'
import {searchList} from '../utils/searchList'
import userEvent from '@testing-library/user-event';

import './highlevelcomponents/summarypg.css';
import Homepage from './highlevelcomponents/homepage';

function TechnicalSupportBss() {
  const navigate = useNavigate();
  function createData(email, name, station, phone, problemType, problemDetails, resolve) {
    return { email, name, station, phone, problemType, problemDetails, resolve };
  }

  const [techSupportInfo, setTechSupportInfo] = useState([]);
  const [detailsUser, setDetailsUser] = useState([]);
 

  const fetchObtainedState = async () => {
    try {
      const obtainedDetailsUser= await getRecords("Details User")
      const obtainedTechSupport= await getRecords("Technical Support BSS")
  
      setTechSupportInfo(obtainedTechSupport)
      setDetailsUser(obtainedDetailsUser)
  
    }
    catch(err){
      console.log(err)
    }
  };



  //make a function that appends to the rows array

  const [rows, setRows]=useState([]);

  const handleSubmit=(id, obj)=>{
    let newRecordData = {
      ...obj,
      Resolved: true,
    };
    updateRecord('Technical Support BSS', id, newRecordData)
    
  }

  const createRows=()=>{

    let myRows=[]

    techSupportInfo.forEach((user)=>{
        let obj=searchList(detailsUser, "email", user.email)
        let name=obj.name
        let phone=obj.phone
        myRows.push(createData(user.email, name, user.station, phone, user['Problem Type'], user['Problem Detail'], (user['Resolved']?<div>Resolved</div>:<a onClick={()=>handleSubmit(user.id, user)} style={{ textDecorationLine: 'underline', color: '#58AA42' }}>Mark as Resolved</a>)))
    })
    setRows(myRows)
  }

  useEffect(() => {
    setTimeout(() => {
      fetchObtainedState().then(()=>{
        createRows()
      });
    }, 1000);
  });
 

  return (
    <div className="summary-page">
    <Homepage />
    <h1 className="heading">Technical Support BSS</h1>
    <div style={{marginTop:200}}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Station</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Problem Type</TableCell>
              <TableCell align="right">Problem Details</TableCell>
              <TableCell align="right">Resolve</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.email}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.station}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.problemType}</TableCell>
                <TableCell align="right">{row.problemDetails}</TableCell>
                <TableCell align="right">{row.resolve}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TechnicalSupportBss;
