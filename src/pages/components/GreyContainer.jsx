import React from 'react';
import PropTypes from 'prop-types';


const GreyContainer= ({ width, height, thickness, children }) => {
  const divStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: '#F6f6f4',
    borderRadius: '10px', // Adjust the value as needed
    border: `${thickness}px solid #58aa42`,
  };

  return <div className="silver-div" style={divStyle}>
    {children}
  </div>;
};


export default GreyContainer;
