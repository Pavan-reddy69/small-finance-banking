import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assests/logo.png';
import './Header.css'; 

function Header() {
  return (
    <div className="nav">
      <img className='logo' decoding="async" src={logoImage} alt="Logo" />
      <div className='saving'>
        <a href='signup'>Create Your Savings Account Now</a>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/login"><button className="login-button" >Login</button></Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
