import React, { useState, useEffect } from "react";
import { DefaultSidebar } from "../../../components/SideNavbar/Sidebar";
import { LoanHeader } from "../../../LoanHeader/LoanHeader";
import '../Home/home.css';
import logoImage from "../../../assests/logo.png";

const Loan = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const sidebarLinks = [
    { to: "/customer-home", label: "Home" },
    { to: "/transactions", label: "Transaction" },
    { to: "/loan", label: "Loan" },
    { to: "/deposit", label: "Deposit" },
    { to: "/profile", label: "Settings" },
    { to: "/login", label: "Logout" },
  ];

  // Check screen width to determine when to show/hide the hamburger menu
  useEffect(() => {
    const handleResize = () => {
      setIsHamburgerVisible(window.innerWidth <= 700); // Adjust the breakpoint as needed
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
      <div className="sidebar-and-details">
        {isHamburgerVisible && isSidebarOpen && (
          <div className="navbar">
            {/* Display navbar links below the header */}
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
        {!isHamburgerVisible && (
          <DefaultSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <LoanHeader />
      </div>
    </div>
  );
};

export default Loan;
