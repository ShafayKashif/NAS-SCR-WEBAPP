import React from 'react';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './landingpage';
import homepage from './homepage';
import summarypg from './summarypg'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage/>} />
        <Route exact path="/summarypg" Component={summarypg} />
      </Routes>
    </Router>
  );
}

export default App;
