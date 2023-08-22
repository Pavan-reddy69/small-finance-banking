import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Landing/Home';
import SignUpPage from './pages/sign up/Signup';
import Login from './pages/login/Login';
import Land from './pages/Home/Home';

function App() {
  return (

    <Router>
      <div>
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Land />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
