import React from 'react';
import '../pages/highlevelcomponents/summarypg.css';
import Homepage from '../pages/highlevelcomponents/homepage';

const Layout=({children, pagetitle})=>{
    return (
        <div className="summary-page">
            <Homepage />
            <h1 className="heading">{pagetitle}</h1>
            {children}
        </div>
    );
}

export default Layout;