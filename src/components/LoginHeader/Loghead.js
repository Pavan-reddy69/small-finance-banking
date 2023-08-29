import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assests/logo.png';
import './LogHead.css'; 

function Header() {
  const storedUserData = JSON.parse(localStorage.getItem("userDetails"));
  
  // Get username from storedUserData
  const username = storedUserData ? storedUserData.firstName : '';

  // Get KYC status from storedUserData
  const isKYCVerified = storedUserData ? storedUserData.kyc === true : false;

  const handleLogout = () => {

  };

  return (
    <div className="nav">
      <div className="logo-marquee-container">
        <img className='logo' decoding="async" src={logoImage} alt="Logo" />
        <p className="Details1">
          {storedUserData &&
            (isKYCVerified
              ? `Welcome back, ${username}`
              : `Welcome back, ${username}. Please complete your KYC.`)}
        </p>
      </div>
      <div className="center-message">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">
                <button className="login-button" onClick={handleLogout}>LogOut</button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
