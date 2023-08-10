import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';

import { getRecords } from '../global/firebaseFunctions'
import {searchList} from '../utils/searchList'

import './highlevelcomponents/summarypg.css';
import Homepage from './highlevelcomponents/homepage';


function Comments() {
  // const navigate = useNavigate();
  const location=useLocation()

  function createData(email, station, datetime, rating, comment) {
    return { email, station, datetime, rating, comment };
  }

  const [feedbackReport, setFeedbackReport] = useState([]);


  const fetchObtainedState = async () => {
    try {
      const obtainedFeedbackReport= await getRecords("Feedback Report")
      setFeedbackReport(obtainedFeedbackReport)
  
    }
    catch(err){
      console.log(err)
    }
  };

  const [rows, setRows]=useState([]);


  const createRows = () => {
    let myRows = [];
    
    feedbackReport.forEach((report)=>{
      if (report.station===location.state.station){
        myRows.push(createData(report.email, report.station, report.Date, report.rating, report.comments))
      }
    })
  
    setRows(myRows);
  };


  useEffect(() => {
    setTimeout(() => {
      fetchObtainedState().then(()=>{
        createRows()
      });
    }, 1000);
  });
 

  return (
    <div>
       <div className="summary-page">
            <Homepage />
            <h1 className="heading">Comments</h1>
            <div style={{marginTop:200}}/>
      <Typography>Overall Rating: {location.state.rating}</Typography>
      <div style={{width:500}}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="right">Station</TableCell>
              <TableCell align="right">Date/Time</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">Comments</TableCell>
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
                <TableCell align="right">{row.station}</TableCell>
                <TableCell align="right">{row.datetime}</TableCell>
                <TableCell align="right">{row.rating}</TableCell>
                <TableCell align="right">{row.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      </div>
    </div>
  );
}

export default Comments;
