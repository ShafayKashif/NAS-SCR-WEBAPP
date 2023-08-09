



import React from 'react';
import Homepage from './homepage';
import './homepage.css';
import './summarypg.css';

const summaryPg = () => {
    return (
        <div className="summary-page">
            <Homepage />
            <h1 className="heading2">Today's Summary</h1>
            
            <div className="sub-container center-top">
                <img src="/rickshaw.png" alt="Image 1" />
                <div class='sub container txt' id='rickshaw-summary'>
                Rickshaw summary
                </div>
                {/* <p>Rickshaw summary</p> */}
            </div>
            <div className="sub-container center-bottom">
                <img src="/battery.png" alt="Image 2" />
                <p>Battery info</p>
            </div>
            <div className="sub-container center-left">
                <img src="/bell.png" alt="Image 3" />
                <p>Number of support reqs</p>
            </div>
            <div className="sub-container center-right">
                <img src="/fin.png" alt="Image 4" />
                <p>Finances</p>
            </div>
        </div>
    );
};

export default summaryPg;
