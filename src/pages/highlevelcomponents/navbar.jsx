import React, { useState } from 'react';
import './navbar.css'; 
import { NavLink, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {auth} from '../../config/firebase'

export const handleLogout = async () => {
  try {
    await auth.signOut();
    // The user is now logged out
    console.log("User logged out successfully!");
  } catch (error) {
    // An error occurred during the logout process
    console.log("Error logging out:", error);
  }
};

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
              to="/driverInformation"
              className={`nav-item ${activeTab === 'Driver Information' ? 'active' : ''}`}
              onClick={() => handleTabClick('Driver Information')}
            >
              Driver Information
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bssInformation"
              className={`nav-item ${activeTab === 'BSS Information' ? 'active' : ''}`}
              onClick={() => handleTabClick('BSS Information')}
            >
              BSS Information
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rickshawAnalytics"
              className={`nav-item ${activeTab === 'Rickshaws Menu' ? 'active' : ''}`}
              onClick={() => handleTabClick('Rickshaws Menu')}
            >
              Rickshaws Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stationMonitoringTable"
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
                <NavLink to="/technicalSupportRickshaw" className="settings-dropdown-item">
                  Technical Support Driver
                </NavLink>
              </li>
              <li>
                <NavLink to="/technicalSupportBss" className="settings-dropdown-item">
                  Tech Support Officer
                </NavLink>
              </li>
              <li>
                <NavLink to="/scheduleMaintenance" className="settings-dropdown-item">
                  Maintenance
                </NavLink>
              </li>
              <li>
                <NavLink to="/feedback" className="settings-dropdown-item">
                  Feedback
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="settings-dropdown-item" onClick={handleLogout}>
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


// const App = () => (
//   <div>
//     <Navbar />
//     <Routes>
//       <Route path="/driver-info" component={DriverInfo} />
//       <Route path="/bss-info" component={BSSInfo} />
//       <Route path="/rickshaws-menu" component={RickshawsMenu} />
//       <Route path="/station-monitoring" component={StationMonitoring} />
//       <Route path="/settings" component={Settings} />
//     </Routes>
//   </div>
// );

export default Navbar;


