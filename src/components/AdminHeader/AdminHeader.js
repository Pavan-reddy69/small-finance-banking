import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  UsersIcon,
  BuildingLibraryIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/solid";
import "./AdminHeader.css"; // Use the same CSS file as DefaultSidebar
import logoImage from "../../assests/logo.png";

export function AdminHeader() {
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
    <div className="sidebar"> {/* Use the same "sidebar" class */}
      <img className="logo-header" decoding="async" src={logoImage} alt="Logo" />
      <div className="sidebar-content"> {/* Use the same "sidebar-content" class */}
        <Link
          to="/admin-home"
          className={`sidebar-link ${
            location.pathname === "/admin-home" ? "selected" : ""
          }`}
        >
          <UsersIcon className="sidebar-icon" />
          Users
        </Link>
        <Link
          to="/loans"
          className={`sidebar-link ${
            location.pathname === "/loans" ? "selected" : ""
          }`}
        >
          <BuildingLibraryIcon className="sidebar-icon" />
          Loan
        </Link>
        <Link
          to="/login"
          className="logout"
          onClick={() => handleLogout()}
        >
          <ArrowLeftOnRectangleIcon className="sidebar-icon" />
          Logout
        </Link>
      </div>
    </div>
  );
}
