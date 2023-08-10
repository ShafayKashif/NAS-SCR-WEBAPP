import React from 'react';
import { Link } from 'react-router-dom';
import '../highlevelcomponents/homepage.css';
import '../highlevelcomponents/summarypg.css';  //data container classes also inside this css file


const DriverInfo = ({data}) => {
    return (
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
    );
};

export default DriverInfo;