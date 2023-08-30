// DefaultSidebar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  CreditCardIcon,
  CurrencyRupeeIcon,
  Cog6ToothIcon,
  BuildingLibraryIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/solid";
import "./Sidebar.css";
import logoImage from '../../assests/logo.png';

export function DefaultSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const updateSidebarState = () => {
    if (window.innerWidth <= 800) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    updateSidebarState();
    window.addEventListener("resize", updateSidebarState);
    return () => {
      window.removeEventListener("resize", updateSidebarState);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth <= 800) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userDetails");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      {window.innerWidth <= 800 && (
        <div className="hamburger" onClick={toggleSidebar}>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
        </div>
      )}
      <img className="logo" decoding="async" src={logoImage} alt="Logo" />

      <div className="sidebar-content">
        <Link
          to="/customer-home"
          className={`sidebar-link ${location.pathname === "/customer-home" ? "selected" : ""}`}
          onClick={closeSidebar}
        >
          <HomeIcon className="sidebar-icon" />
          Home
        </Link>
        <Link
          to="/transactions"
          className={`sidebar-link ${location.pathname === "/transactions" ? "selected" : ""}`}
          onClick={closeSidebar}
        >
          <CreditCardIcon className="sidebar-icon" />
          Transaction
        </Link>
        <Link
          to="/loan"
          className={`sidebar-link ${location.pathname === "/loan" ? "selected" : ""}`}
          onClick={closeSidebar}
        >
          <BuildingLibraryIcon className="sidebar-icon" />
          Loan
        </Link>
        <Link
          to="/deposit"
          className={`sidebar-link ${location.pathname === "/deposit" ? "selected" : ""}`}
          onClick={closeSidebar}
        >
          <CurrencyRupeeIcon className="sidebar-icon" />
          Deposit
        </Link>
        <Link
          to="/profile"
          className={`sidebar-link ${location.pathname === "/profile" ? "selected" : ""}`}
          onClick={closeSidebar}
        >
          <Cog6ToothIcon className="sidebar-icon" />
          Settings
        </Link>
        <Link
          to="/login"
          className="logout"
          onClick={() => {
            closeSidebar();
            handleLogout();
          }}
        >
          <ArrowLeftOnRectangleIcon className="sidebar-icon" />
          Logout
        </Link>
      </div>
    </div>
  );
}
