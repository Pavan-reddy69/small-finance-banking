import React, { useState, useEffect } from "react";
import api from "../../Api/api";

export default function WithdrawTab() {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null); 
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails")) || {}; // Initialize with an empty object
  const accountNumber = storedUserData.accNo || sessionStorage.getItem("accountNumber");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(api+'Account/getBalance?accNo='+storedUserData.accNo); 
        const data = await response.json();
        setBalance(data);

        // Update local storage with the retrieved balance
        storedUserData.balance = data;
        sessionStorage.setItem("userDetails", JSON.stringify(storedUserData));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  const handleWithdraw = async () => {
    setError(null);
  
    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid withdrawal amount");
      return;
    }
  
    if (amount > balance) {
      setError("Withdrawal amount exceeds available balance");
      return;
    }
  
    const withdrawalData = {
      to: accountNumber,
      amount: amount,
      type:"WITHDRAW"
    };
  
    try {
      const response = await fetch(api + "transaction/transfer?accNo="+storedUserData.accNo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(withdrawalData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Withdrawal response:", responseData);
  
       
        const newBalance = balance - amount;
        setBalance(newBalance);
        storedUserData.balance = newBalance;
        sessionStorage.setItem("userDetails", JSON.stringify(storedUserData));
  
        setAmount(""); // Clear the amount input field
        alert("Withdrawal successful!"); // Show a success alert
      } else {
        setError("Error processing withdrawal");
        alert("Withdrawal failed. Please try again."); // Show an error alert
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      setError("Error processing withdrawal");
      alert("An error occurred while processing withdrawal. Please try again."); // Show an error alert
    }
  };
  

  return (
    <div>
      <h2>Withdraw</h2>
      <div className="card">
        <div className="card-header">
          Account Number: <span>{accountNumber}</span>
        </div>
        <div className="card-body">
          <p>Available Balance: {balance !== null ? balance : 0}</p>
          <div className="form-group">
            <label htmlFor="amount">Amount to Withdraw:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button className="btn btn-primary" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
