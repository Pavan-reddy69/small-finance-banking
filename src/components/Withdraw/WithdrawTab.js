import React, { useState, useEffect } from "react";
import api from "../../Api/api";
import Swal from 'sweetalert2';

export default function WithdrawTab() {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null); 
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails")) || {}; 
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
        const newBalance = balance - amount;
        setBalance(newBalance);
        storedUserData.balance = newBalance;
        sessionStorage.setItem("userDetails", JSON.stringify(storedUserData));
  
        setAmount(""); 
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Money Withdrawal Successful',
        });
      } else {
        setError("Error processing withdrawal");
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Money Withdrawal failed. Please try again.',
        });
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      setError("Error processing withdrawal");
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while processing withdrawal. Please try again',
      });
    }
  };
  

  return (
  <div className="withdraw-container">
      <h2>Withdraw</h2>
      <div className="card">
        <div className="card-header">
          Account Number: <span>{accountNumber}</span>
        </div>
        <div className="card-body">
          <p>Available Balance: {balance !== null ? balance : 0}</p>
          <div className="form-body">
            <label htmlFor="amount" style={{paddingRight:'10px',paddingBottom:'10px'}}>Amount to Withdraw:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="deposit-input"
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
