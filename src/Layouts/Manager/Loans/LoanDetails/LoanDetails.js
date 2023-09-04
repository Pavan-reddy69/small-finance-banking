import React, { useState, useEffect } from "react";
import LoanDetailsPage from "./LoanDetailsPage/LoanDetailsPage";
import { AdminHeader } from "../../../../components/AdminHeader/AdminHeader";
import './LoanDetails.css';
import logoImage from '../../../../assests/logo.png';
import { useNavigate } from "react-router-dom";

const LoanDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("userDetails");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };

  const sidebarLinks = [
    { to: "/admin-home", label: "Users" },
    { to: "/loans", label: "Loans" },
    { to: "/login", label: "Logout" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsHamburgerVisible(window.innerWidth <= 800);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`Home ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {isHamburgerVisible && (
        <div className="header">
          <div className="hamburger" onClick={() => toggleSidebar(!isSidebarOpen)}>
            ☰
          </div>
          <img className="logo-header" decoding="async" src={logoImage} alt="Logo" />
        </div>
      )}
      {isHamburgerVisible && isSidebarOpen && (
        <div className="navbar">
          <ul className={`navbar-links`}>
            {sidebarLinks.map((link, index) => (
              <li key={index}>
                <div
                  className="link-like-element"
                  onClick={() => (link.to === "/login" ? handleLogout() : navigate(link.to))}
                >
                  {link.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="sidebar-and-details">
        {!isHamburgerVisible && <AdminHeader />}
        <LoanDetailsPage />
      </div>
    </div>
  );
};

export default LoanDetails;
