import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

import './highlevelcomponents/summarypg.css';
import Homepage from './highlevelcomponents/homepage';

function StationMonitoringTable() {
  const navigate = useNavigate();
  function createData(stationName, Location, View) {
    return { stationName, Location, View };
  }

  function toStationMonitoring(stationto){
    navigate('/stationMonitoring',{state:{station: stationto}})
  }

  const rows = [
    createData('BSS001', 'LUMS', <a onClick={()=>toStationMonitoring('BSS001')} style={{ textDecorationLine: 'underline', color: '#58AA42' }}>Click here</a>),
  ];

  return (
    <div className="summary-page">
    <Homepage />
    <h1 className="heading">Station Monitoring Table</h1>
    <div style={{marginTop:200}}/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Station Name</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.stationName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.stationName}
                </TableCell>
                <TableCell align="right">{row.Location}</TableCell>
                <TableCell align="right">{row.View}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StationMonitoringTable;
