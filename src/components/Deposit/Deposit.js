import React, { useState } from "react";
import api from "../../Api/api";

export default function DepositTab() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails")) || {};
  const accountNumber = storedUserData.accNo || sessionStorage.getItem("accountNumber");

  const handleDeposit = async () => {
    setError(null);

    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid deposit amount");
      return;
    }

  
    try {
      const response = await fetch(api + "transaction/transfer?accNo="+storedUserData.accNo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: accountNumber,
          amount: amount,
          type:"DEPOSIT"
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Deposit response:", responseData);

        // Update balance in local storage and state
        const newBalance = storedUserData.balance + parseFloat(amount);
        storedUserData.balance = newBalance;
        sessionStorage.setItem("userDetails", JSON.stringify(storedUserData));

        setAmount(""); // Clear the amount input field
        alert("Deposit successful!"); // Show a success alert
      } else {
        setError("Error processing deposit");
        alert("Deposit failed. Please try again."); // Show an error alert
      }
    } catch (error) {
      console.error("Deposit error:", error);
      setError("Error processing deposit");
      alert("An error occurred while processing deposit. Please try again."); // Show an error alert
    }
  };

  return (
    <div>
      <h2>Deposit</h2>
      <div className="card">
        <div className="card-header">
          Account Number: <span>{accountNumber}</span>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="amount">Amount to Deposit:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button className="btn btn-primary" onClick={handleDeposit}>
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
}
