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

function Feedback() {
  const navigate = useNavigate();
  function createData(name, overallrating, viewcomments) {
    return { name, overallrating, viewcomments };
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

  //make a function that appends to the rows array

  const handleRedirect=(station, rating)=>{
    navigate('/comments', {state: {station: station, rating: rating}})
  }

  const [rows, setRows]=useState([]);


  const createRows = () => {
    let myRows = [];
    let ratingTotal = {};
    let ratingLength = {};
  
    feedbackReport.forEach((location) => {
      if (ratingTotal[location.station]) {
        ratingTotal[location.station] += location.rating;
        ratingLength[location.station] += 1;
      } else {
        ratingTotal[location.station] = location.rating;
        ratingLength[location.station] = 1;
      }
    });
  
    Object.keys(ratingTotal).forEach((station) => {
      // Calculate average rating
      const averageRating = ratingTotal[station] / ratingLength[station];
  
      // Create the "View Comments" link
      const viewCommentsLink = (
        <a
          onClick={() => handleRedirect(station, averageRating)}
          style={{ textDecorationLine: 'underline', color: '#58AA42' }}
        >
          View Comments
        </a>
      );
  
      // Add the row data
      myRows.push(createData(station, averageRating, viewCommentsLink));
    });
  
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
  
    <div className="summary-page">
    <Homepage />
    <h1 className="heading">Feedback</h1>
    <div style={{marginTop:200}}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Station Name</TableCell>
              <TableCell align="right">Overall Rating</TableCell>
              <TableCell align="right">Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.overallrating}</TableCell>
                <TableCell align="right">{row.viewcomments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Feedback;
