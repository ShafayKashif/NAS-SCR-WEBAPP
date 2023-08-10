import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import BssInformation from './pages/bssInformation';
import Comments from './pages/comments';
import DriverInformation from './pages/driverInformation';
import EditInformationBss from './pages/editInformationBss';
import EditInformationDriver from './pages/editInformationDriver';
import Feedback from './pages/feedback';
import Landing from './pages/landing';
import RickshawAnalytics from './pages/rickshawAnalytics';
import ScheduleMaintenance from './pages/scheduleMaintenance';
import StationMonitoring from './pages/stationMonitoring';
import StationMonitoringTable from './pages/stationMonitoringTable';
import TechnicalSupportBss from './pages/technicalSupportBss';
import TechnicalSupportRickshaw from './pages/technicalSupportRickshaw';

function App() {
  return (
      <Router>
           <Routes>
                 <Route exact path='/' element={< Login/>}></Route>
                 <Route exact path='/login' element={< Login/>}></Route>
                 <Route exact path='/bssInformation' element={< BssInformation/>}></Route>
                  <Route exact path='/comments' element={< Comments/>}></Route>
                  <Route exact path='/driverInformation' element={< DriverInformation/>}></Route>
                  <Route exact path='/editInformationBss' element={< EditInformationBss/>}></Route>
                  <Route exact path='/editInformationDriver' element={< EditInformationDriver/>}></Route>
                  <Route exact path='/feedback' element={< Feedback/>}></Route>
                  <Route exact path='/landing' element={< Landing/>}></Route>
                  <Route exact path='/rickshawAnalytics' element={< RickshawAnalytics/>}></Route>
                  <Route exact path='/scheduleMaintenance' element={< ScheduleMaintenance/>}></Route>
                  <Route exact path='/stationMonitoring' element={< StationMonitoring/>}></Route>
                  <Route exact path='/stationMonitoringTable' element={< StationMonitoringTable/>}></Route>
                  <Route exact path='/technicalSupportBss' element={< TechnicalSupportBss/>}></Route>
                  <Route exact path='/technicalSupportRickshaw' element={< TechnicalSupportRickshaw/>}></Route>
          </Routes>
       </Router>
  );
}

export default App;
