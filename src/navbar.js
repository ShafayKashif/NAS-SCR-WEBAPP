import React, { useState } from 'react';
import './navbarr.css'; 
import { NavLink, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// const Navbar = () => {
//   const [activeTab, setActiveTab] = useState('Driver Information');

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//   };

//   return (
//     <nav className="navbar">
//       <ul className="nav-list">
//         <li className={`nav-item ${activeTab === 'Driver Information' ? 'active' : ''}`} onClick={() => handleTabClick('Driver Information')}>
//           Driver Information
//         </li>
//         <li className={`nav-item ${activeTab === 'BSS Information' ? 'active' : ''}`} onClick={() => handleTabClick('BSS Information')}>
//           BSS Information
//         </li>
//         <li className={`nav-item ${activeTab === 'Rickshaws Menu' ? 'active' : ''}`} onClick={() => handleTabClick('Rickshaws Menu')}>
//           Rickshaws Menu
//         </li>
//         <li className={`nav-item ${activeTab === 'Station Monitoring' ? 'active' : ''}`} onClick={() => handleTabClick('Station Monitoring')}>
//           Station Monitoring
//         </li>
        
//         <li className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => handleTabClick('Settings')}>
//           Settings
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;



const DriverInfo = () => <div>Driver Information Page</div>;
const BSSInfo = () => <div>BSS Information Page</div>;
const RickshawsMenu = () => <div>Rickshaws Menu Page</div>;
const StationMonitoring = () => <div>Station Monitoring Page</div>;
const Settings = () => <div>Settings Page</div>;

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleSettingsDropdown = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
  };

  return (
    
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <NavLink
              to="/driver-info"
              className={`nav-item ${activeTab === 'Driver Information' ? 'active' : ''}`}
              onClick={() => handleTabClick('Driver Information')}
            >
              Driver Information
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bss-info"
              className={`nav-item ${activeTab === 'BSS Information' ? 'active' : ''}`}
              onClick={() => handleTabClick('BSS Information')}
            >
              BSS Information
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rickshaws-menu"
              className={`nav-item ${activeTab === 'Rickshaws Menu' ? 'active' : ''}`}
              onClick={() => handleTabClick('Rickshaws Menu')}
            >
              Rickshaws Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/station-monitoring"
              className={`nav-item ${activeTab === 'Station Monitoring' ? 'active' : ''}`}
              onClick={() => handleTabClick('Station Monitoring')}
            >
              Station Monitoring
            </NavLink>
          </li>
          <li className="settings-dropdown" onClick={toggleSettingsDropdown}>
          <div className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`}>
            Settings
          </div>
          {showSettingsDropdown && (
            <ul className="settings-dropdown-content">
              <li>
                <NavLink to="/technical-support-driver" className="settings-dropdown-item">
                  Technical Support Driver
                </NavLink>
              </li>
              <li>
                <NavLink to="/tech-support-officer" className="settings-dropdown-item">
                  Tech Support Officer
                </NavLink>
              </li>
              <li>
                <NavLink to="/maintenance" className="settings-dropdown-item">
                  Maintenance
                </NavLink>
              </li>
              <li>
                <NavLink to="/feedback" className="settings-dropdown-item">
                  Feedback
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" className="settings-dropdown-item">
                  Logout
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        </ul>
      </nav>
    
  );
};

{/* <Routes>
<Route exact path="/driver-info" component={DriverInfo} />
<Route exact path="/bss-info" component={BSSInfo} />
<Route exact path="/rickshaws-menu" component={RickshawsMenu} />
<Route exact path="/support-requests" component={StationMonitoring} />
<Route exact path="/settings" component={Settings} />
</Routes> */}

const App = () => (
  <div>
    <Navbar />
    <Routes>
      <Route path="/driver-info" component={DriverInfo} />
      <Route path="/bss-info" component={BSSInfo} />
      <Route path="/rickshaws-menu" component={RickshawsMenu} />
      <Route path="/station-monitoring" component={StationMonitoring} />
      <Route path="/settings" component={Settings} />
    </Routes>
  </div>
);

export default App;


