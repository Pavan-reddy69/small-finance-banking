import React, { useState } from "react";
import "./DepositHeader.css"; 
import DepositHistory from "../DepositHistory/DepositHistory";
import RD from "../../RD/RD";
import TermDeposit from "../TermDeposit/TermDeposit";

export function DepositHeader() {
  const [activeTab, setActiveTab] = useState("deposits");

  const data = [
    { label: "Deposits", value: "deposits" },
    { label: "Term Deposit", value: "Term Deposit" },
    { label: "Recurring Deposit", value: "Recurring Deposit" },
 
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
        {activeTab === "deposits" && <DepositHistory />}
        {activeTab === "Term Deposit" && <TermDeposit />}
        {activeTab === "Recurring Deposit" && <RD />}
       
      </div>
    </div>
  );
}
