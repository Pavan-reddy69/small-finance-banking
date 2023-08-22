import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assests/logo.png';
import './LogHead.css'; 

function Header() {
  return (
    <div className="nav">
      <img className='logo' decoding="async" src={logoImage} alt="Logo" />
      <div className="marquee-container">
        <p className="marquee">
          Limited Time Offer: APA Bank offers the highest interest rate!{" "}
          <a href="/login">Login</a> now to secure your savings.
        </p>
        </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/login"><button className="login-button" >LogOut</button></Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
