import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CreditCardIcon,
  CurrencyRupeeIcon,
  Cog6ToothIcon,
  BuildingLibraryIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/solid";
import "./Sidebar.css";
import logoImage from "../../assests/logo.png";

export function DefaultSidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await new Promise((resolve) => {
        sessionStorage.removeItem("userDetails");
        resolve();
      });
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };

  return (
    <div className={`updated-sidebar ${isOpen ? "open" : ""}`}>
      <img
        className="logo-header"
        decoding="async"
        src={logoImage}
        alt="Logo"
      />
      <div className="updated-sidebar-content">
        <Link
          to="/customer-home"
          className={`sidebar-link ${
            location.pathname === "/customer-home" ? "selected" : ""
          }`}
          onClick={() => toggleSidebar(false)}
        >
          <HomeIcon className="sidebar-icon" />
          Home
        </Link>
        <Link
          to="/transactions"
          className={`sidebar-link ${
            location.pathname === "/transactions" ? "selected" : ""
          }`}
          onClick={() => toggleSidebar(false)}
        >
          <CreditCardIcon className="sidebar-icon" />
          Transaction
        </Link>
        <Link
          to="/loan"
          className={`sidebar-link ${
            location.pathname === "/loan" ? "selected" : ""
          }`}
          onClick={() => toggleSidebar(false)}
        >
          <BuildingLibraryIcon className="sidebar-icon" />
          Loan
        </Link>
        <Link
          to="/deposit"
          className={`sidebar-link ${
            location.pathname === "/deposit" ? "selected" : ""
          }`}
          onClick={() => toggleSidebar(false)}
        >
          <CurrencyRupeeIcon className="sidebar-icon" />
          Deposit
        </Link>
        <Link
          to="/profile"
          className={`sidebar-link ${
            location.pathname === "/profile" ? "selected" : ""
          }`}
          onClick={() => toggleSidebar(false)}
        >
          <Cog6ToothIcon className="sidebar-icon" />
          Settings
        </Link>
        <Link
          to="/login"
          className="sidebar-link"
          onClick={() => {
            toggleSidebar(false);
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
