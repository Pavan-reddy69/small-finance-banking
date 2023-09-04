import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DefaultSidebar } from "../../../components/SideNavbar/Sidebar";
import DetailsComponent from "../../../components/AccDetails/Detail";
import "./home.css";
import logoImage from "../../../assests/logo.png";

const Land = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);
const navigate=useNavigate();
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

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("userDetails");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };

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
        {!isHamburgerVisible && (
          <DefaultSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <DetailsComponent />
      </div>
    </div>
  );
};

export default Land;
