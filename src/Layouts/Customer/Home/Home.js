import React, { useState, useEffect } from "react";
import { DefaultSidebar } from "../../../components/SideNavbar/Sidebar";
import DetailsComponent from "../../../components/AccDetails/Detail";
import "./home.css";
import logoImage from "../../../assests/logo.png";

const Land = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);

  const toggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };

  const sidebarLinks = [
    { to: "/customer-home", label: "Home" },
    { to: "/transactions", label: "Transaction" },
    { to: "/loan", label: "Loan"},
    { to: "/deposit", label: "Deposit" },
    { to: "/profile", label: "Settings"},
    { to: "/login", label: "Logout" },
  ];


  useEffect(() => {
    const handleResize = () => {
      setIsHamburgerVisible(window.innerWidth <= 700); 
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
                  {link.icon}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="sidebar-and-details">
        {!isHamburgerVisible && (
          <DefaultSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <DetailsComponent />
      </div>
    </div>
  );
};

export default Land;
