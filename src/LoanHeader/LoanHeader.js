import React, { useState } from "react";
import "./LoanHeader.css"; 
import EducationLoanComponent from "../components/Loan/Education/Education";
import HomeLoanComponent from "../components/Loan/Home/HomeLoan"
import PersonalLoanComponent from "../components/Loan/Mortgage/MortgageLoan";

export function LoanHeader() {
  const [activeTab, setActiveTab] = useState("Education Loan");

  const data = [
    { label: "Education Loan", value: "Education Loan" },
    { label: "Home Loan", value: "Home Loan" },
    { label: "Personal loan", value: "Personal loan" },
 
  ];

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="tab-container">
      <div className="tabs-header">
        {data.map(({ label, value }) => (
          <div
          key={value}
          className={`tab ${activeTab === value ? "active slide-active" : ""}`}
          onClick={() => handleTabClick(value)}
        >
            {label}
          </div>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "Education Loan" && <EducationLoanComponent />}
        {activeTab === "Home Loan" && < HomeLoanComponent/>}
        {activeTab === "Personal loan" && <PersonalLoanComponent/>}
       
      </div>
    </div>
  );
}
