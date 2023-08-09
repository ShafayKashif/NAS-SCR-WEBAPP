import React from 'react';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './landingpage';
import summarypg from './summarypg'
import DriverInfo from './driverinfo';
import BSSInfo from './bssinfo'
import RickshawsMenu from './rickshawsmenu';
import StationMonitoring from './stationmonitor';
import technicalsupportdriver from './tcsdriver';
import technicalsupportofficer from './tcsoff';
import feedback from './feedback';
import maintenance from './maintenance';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage/>} />
        <Route exact path="/summarypg" Component={summarypg} />
        <Route exact path="/driver-info" Component={DriverInfo} />
        <Route exact path="/bss-info" Component={BSSInfo} />
        <Route exact path="/rickshaws-menu" Component={RickshawsMenu} />
        <Route exact path="/station-monitoring" Component={StationMonitoring} />
        <Route exact path="/technical-support-driver" Component={technicalsupportdriver} />
        <Route exact path="/tech-support-officer" Component={technicalsupportofficer} />
        <Route exact path="/feedback" Component={feedback} />
        <Route exact path="/maintenance" Component={maintenance} />

      </Routes>
    </Router>
  );
}

export default App;
