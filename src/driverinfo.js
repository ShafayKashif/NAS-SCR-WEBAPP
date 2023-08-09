import React from 'react';
import { Link } from 'react-router-dom';
import Homepage from './homepage';
import './homepage.css';
import './summarypg.css';  //data container classes also inside this css file

const data = []


const DriverInfo = () => {
    return (
        <div className="summary-page">
            <Homepage />
            <h1 className="heading">Driver Information</h1>
            <div className="data-container">
                {data.map(item => (
                    <div key={item.id} className="data-item">
                        {item.content}
                        <Link to={`/details/${item.id}`} className="details-link">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
                
                
            
        </div>
    );
};

export default DriverInfo;