
import React from "react";
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

export function DefaultSidebar() {
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
    <div className="updated-sidebar">
      <img className="logo-header" decoding="async" src={logoImage} alt="Logo" />
      <div className="updated-sidebar-content">
        <Link
          to="/customer-home"
          className={`sidebar-link ${
            location.pathname === "/customer-home" ? "selected" : ""
          }`}
        >
          <HomeIcon className="sidebar-icon" />
          Home
        </Link>
        <Link
          to="/transactions"
          className={`sidebar-link ${
            location.pathname === "/transactions" ? "selected" : ""
          }`}
        >
          <CreditCardIcon className="sidebar-icon" />
          Transaction
        </Link>
        <Link
          to="/loan"
          className={`sidebar-link ${
            location.pathname === "/loan" ? "selected" : ""
          }`}
        >
          <BuildingLibraryIcon className="sidebar-icon" />
          Loan
        </Link>
        <Link
          to="/deposit"
          className={`sidebar-link ${
            location.pathname === "/deposit" ? "selected" : ""
          }`}
        >
          <CurrencyRupeeIcon className="sidebar-icon" />
          Deposit
        </Link>
        <Link
          to="/profile"
          className={`sidebar-link ${
            location.pathname === "/profile" ? "selected" : ""
          }`}
        >
          <Cog6ToothIcon className="sidebar-icon" />
          Settings
        </Link>
        <Link
          to="/login"
          className="sidebar-link"
          onClick={() => handleLogout()}
        >
          <ArrowLeftOnRectangleIcon className="sidebar-icon" />
          Logout
        </Link>
      </div>
    </div>
  );
}
