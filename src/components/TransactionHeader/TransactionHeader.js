import React, { useState } from "react";
import "./th.css"; 
import DepositTab from "../Deposit/Deposit";
import WithdrawTab from "../Withdraw/WithdrawTab";
import TransferTab from "../Transfer/Trans";
import Passbook from "../Passbook/Passbook";
export function TabsCustomAnimation() {
  const [activeTab, setActiveTab] = useState("deposit");

  const data = [
    { label: "Deposit", value: "deposit" },
    { label: "Withdraw", value: "withdraw" },
    { label: "Transfer", value: "transfer" },
    { label: "Passbook", value: "passbook" },
  ];

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="tabs-container">
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
        {activeTab === "deposit" && <DepositTab />}
        {activeTab === "withdraw" && <WithdrawTab />}
        {activeTab === "transfer" && <TransferTab />}
        {activeTab === "passbook" && <Passbook/>}
        
      </div>
    </div>
  );
}
