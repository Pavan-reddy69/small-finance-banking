import React, { useState, useEffect } from "react";
import api from "../../Api/api";
import Swal from 'sweetalert2';
import { TailSpin } from 'react-loader-spinner';

export default function WithdrawTab() {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add a loading state
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails")) || {};
  const accountNumber = storedUserData.accNo || sessionStorage.getItem("accountNumber");

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true); // Set loading to true before making the API call

      const accessToken = storedUserData.accessToken;
      try {
        const headers = new Headers({
          'Authorization': `Bearer ${accessToken}`,
          'ngrok-skip-browser-warning': '69420',
        });

        const response = await fetch(api + 'Account/getBalance?accNo=' + storedUserData.accNo, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }

        const data = await response.json();
        setBalance(data);
        storedUserData.balance = data;
        sessionStorage.setItem("userDetails", JSON.stringify(storedUserData));
      } catch (error) {
        console.error("Error fetching balance:", error.message);
      } finally {
        setLoading(false); // Set loading to false after the API call is complete
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
      type: "WITHDRAW"
    };

    try {
      setLoading(true); // Set loading to true before making the API call

      const response = await fetch(api + "transaction/transfer?accNo=" + storedUserData.accNo, {
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
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
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
            <label htmlFor="amount" style={{ paddingRight: '10px', paddingBottom: '10px' }}>Amount to Withdraw:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="deposit-input"
            />
          </div>
          {loading && ( // Render the loader when loading is true
            <div className="loader-container">
              <TailSpin
                type="TailSpin"
                color="red"
                height={100}
                width={150}
              />
            </div>
          )}
          {error && <p className="text-danger">{error}</p>}
          <button className="btn btn-primary" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}