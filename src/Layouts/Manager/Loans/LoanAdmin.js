import React, { useState, useEffect } from "react";
import LoanTable from "./LoanTable/LoanTable";
import { AdminHeader } from "../../../components/AdminHeader/AdminHeader";
import './LoanAdmin.css';
import logoImage from '../../../assests/logo.png'
const LoanAdmin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const sidebarLinks = [
    { to: "/admin-home", label: "Users" },
    { to: "/loans", label: "Loans" },
   
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
                <a href={link.to} onClick={() => toggleSidebar(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="sidebar-and-details">
        {!isHamburgerVisible && <AdminHeader />}
                <LoanTable />
            </div>
        </div>
    );
};

export default LoanAdmin;