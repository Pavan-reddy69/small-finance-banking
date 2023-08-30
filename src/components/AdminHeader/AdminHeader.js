import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UsersIcon,
  BuildingLibraryIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/solid";
import "./AdminHeader.css";
import logoImage from '../../assests/logo.png';

export function AdminHeader() {
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
          to="/admin-home"
          className={`sidebar-link ${location.pathname === "/admin-home" ? "selected" : ""}`}
          onClick={closeSidebar}
        >
          <UsersIcon className="sidebar-icon" />
          Users
        </Link>
        <Link
          to="/loans"
          className={`sidebar-link ${location.pathname === "/loans" ? "selected" : ""}`}
          onClick={closeSidebar}
        >
          <BuildingLibraryIcon className="sidebar-icon" />
          Loan
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
