import React from 'react';

const GreenBorderCase = ({ initialWidth, initialHeight, thickness, children }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: initialHeight,
          width: initialWidth,
          backgroundColor: '#F6F4F4',
          borderRadius: 16,
          border: `${thickness}px solid #58aa42`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GreenBorderCase;
