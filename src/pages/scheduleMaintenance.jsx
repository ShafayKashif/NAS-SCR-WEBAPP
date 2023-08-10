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


import './highlevelcomponents/summarypg.css';
import Homepage from './highlevelcomponents/homepage';

function ScheduleMaintenance() {
  const navigate = useNavigate();
  function createData(email, name, station, phone, cnic, date, time, resolved) {
    return { email, name, station, phone, cnic, date, time, resolved };
  }

  const [scheduleMaintenance, setScheduleMaintenance] = useState([]);
  const [detailsUser, setDetailsUser] = useState([]);
 

  const fetchObtainedState = async () => {
    try {
      const obtainedScheduleMaintenance= await getRecords("Schedule Maintenance")
      setScheduleMaintenance(obtainedScheduleMaintenance)
  
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
      resolved: true,
    };
    
    updateRecord('Schedule Maintenance', id, newRecordData)
    
  }

  const createRows=()=>{

    let myRows=[]

    scheduleMaintenance.forEach((user)=>{
        myRows.push(createData(user.email, user.name, user.station, user.phone, user.cnic, user.date, user.time, (user['resolved']?<div>Approved</div>:<a onClick={()=>handleSubmit(user.id, user)} style={{ textDecorationLine: 'underline', color: '#58AA42' }}>Mark as Approved</a>)))
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
    <h1 className="heading">Schedule Maintenance</h1>
    <div style={{marginTop:200}}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Station</TableCell>
              <TableCell align="right">CNIC</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Approve</TableCell>
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
                <TableCell align="right">{row.cnic}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.resolved}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ScheduleMaintenance;
