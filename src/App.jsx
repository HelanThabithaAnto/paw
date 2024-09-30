import React from 'react';
import './App.css'; // Import the styles from App.css
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login'; // Import the Login component
import Signup from './components/Signup'; // Import the Signup component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Top-right buttons for Login and Sign up */}
        <div className="top-right-buttons">
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </div>

        {/* Container for logo and subtitle */}
        <div className="container">
          <div className="logo mulish-unique">PAW & ME</div>
          <div className="subtitle">PET CARE CENTRE</div>
        </div>

        {/* Define Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
