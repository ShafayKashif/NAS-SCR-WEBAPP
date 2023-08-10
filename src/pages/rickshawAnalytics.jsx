import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

import {getRecords} from '../global/firebaseFunctions'
import {searchList} from '../utils/searchList'

import './highlevelcomponents/summarypg.css';
import Homepage from './highlevelcomponents/homepage';

function RickshawAnalytics() {
  const navigate = useNavigate();
  function createData(assigned, driver, swapsToday, swapsMonth, swapsTotal) {
    return { assigned, driver, swapsToday, swapsMonth, swapsTotal };
  }



  const [rickshawInfo, setRickshawInfo] = useState([]);
  const [detailsUser, setDetailsUser] = useState([]);
  const [rickshawDrivers, setRickshawDrivers] = useState([]);

  const fetchObtainedState = async () => {
    try {
      const obtainedDetailsUser= await getRecords("Details User")
      const obtainedRickshaw= await getRecords("Rickshaw")
      const obtainedDrivers= await getRecords("Rickshaw Driver")

      setDetailsUser(obtainedDetailsUser)
      setRickshawInfo(obtainedRickshaw)
      setRickshawDrivers(obtainedDrivers)
      console.log(obtainedDrivers)
    }
    catch(err){
      console.log(err)
    }
  };



  //make a function that appends to the rows array

  // fix what is displayed
  const [rows, setRows]=useState([]);

  const createRows=()=>{

    let myRows=[]
    console.log(rickshawDrivers)
    rickshawDrivers.forEach((user)=>{
        let name=searchList(detailsUser, "email", user.email).name
        let rickshawDetails=searchList(rickshawInfo, "id", user.assigned)
        myRows.push(createData(user.assigned, name, rickshawDetails.swapsToday, rickshawDetails.swapsThisMonth, rickshawDetails.totalSwaps))
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
    <h1 className="heading">Rickshaw Analytics</h1>
    <div style={{marginTop:200}}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rickshaw Plate</TableCell>
              <TableCell align="right">Driver</TableCell>
              <TableCell align="right">Total Swaps Today</TableCell>
              <TableCell align="right">Total Swaps This Month</TableCell>
              <TableCell align="right">Total Swaps Overall</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.assigned}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.assigned}
                </TableCell>
                <TableCell align="right">{row.driver}</TableCell>
                <TableCell align="right">{row.swapsToday}</TableCell>
                <TableCell align="right">{row.swapsMonth}</TableCell>
                <TableCell align="right">{row.swapsTotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RickshawAnalytics;
