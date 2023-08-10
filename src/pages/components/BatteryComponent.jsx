import React from 'react';
import BatteryDisplay from './BatteryDisplay';

const BatteryComponent = ({ batteryNumber, charge, timeHoursLeft, timeMinutesLeft }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <p style={{ margin: '0', marginRight: '1px' }}>{batteryNumber}</p>
    <BatteryDisplay charge={charge} />
    <p style={{ margin: '0', fontSize: '16px' }}>{charge}%</p>
    <p style={{ margin: '0', marginRight: '3px', fontSize: '12px' }}>
      {timeHoursLeft}h {timeMinutesLeft}m
    </p>
  </div> 
  );
};

export default BatteryComponent;
