import React, { useState, useEffect } from "react";
import api from "../../Api/api";

export default function TransferTab() {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [recipientAccount, setRecipientAccount] = useState("");
  const [otp, setOtp] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [error, setError] = useState(null);

  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails")) || {};
  const accountNumber = storedUserData.accNo || sessionStorage.getItem("accountNumber");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(api + 'Account/getBalance?accNo=' + storedUserData.accNo);
        const data = await response.json();
        setBalance(data);

        storedUserData.balance = data;
        sessionStorage.setItem('userDetails', JSON.stringify(storedUserData));
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  const handleGenerateOtp = async () => {
    setError(null);

    try {
      const otpResponse = await fetch(api + "otp/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountNumber: accountNumber,
        }),
      });

      if (otpResponse.ok) {
        setOtpGenerated(true);
        alert("OTP generated successfully!");
      } else {
        setError("Error generating OTP");
        alert("Failed to generate OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP generation error:", error);
      setError("Error generating OTP");
      alert("An error occurred while generating OTP. Please try again.");
    }
  };

  const handleTransfer = async () => {
    setError(null);

    if (!amount || isNaN(amount) || amount <= 0) {
      setError("Please enter a valid transfer amount");
      return;
    }

    if (amount > balance) {
      setError("Transfer amount exceeds available balance");
      return;
    }

    if (!recipientAccount) {
      setError("Please enter a valid recipient's account number");
      return;
    }

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    try {
      const otpResponse = await fetch(api + "otp/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountNumber: accountNumber,
          otp: otp,
        }),
      });
    
      if (!otpResponse.ok) {
        setError("Entered OTP is incorrect");
        return;
      }

      const transferResponse = await fetch(api + "transaction/transfer?accNo=" + storedUserData.accNo, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: recipientAccount,
          amount: amount,
          type: "TRANSFER",
        }),
      });

      if (transferResponse.ok) {
        const responseData = await transferResponse.json();
        console.log("Transfer response:", responseData);

        setBalance(balance - parseFloat(amount));
        setAmount("");
        setRecipientAccount("");
        setOtp("");
        setOtpGenerated(false);

        alert("Transfer successful!");
      } else {
        setError("Error processing transfer");
        alert("Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      setError("Error processing transfer");
      alert("An error occurred while processing transfer. Please try again.");
    }
  };

  return (
    <div>
      <h2>Transfer</h2>
      <div className="card">
        <div className="card-header">
          Account Number: <span>{accountNumber}</span>
        </div>
        <div className="card-body">
          <p>Available Balance: {balance !== null ? balance : 0}</p>
          <div className="form-group">
            <label htmlFor="recipientAccount">Recipient's Account Number:</label>
            <input
              type="text"
              id="recipientAccount"
              value={recipientAccount}
              pattern="[0-9]{17}"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                if (e.target.value.length > 17) {
                  e.target.value = e.target.value.slice(0, 17);
                }
              }}
              onChange={(e) => setRecipientAccount(e.target.value)}
              placeholder="Enter recipient's account number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount to Transfer:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={handleGenerateOtp}>
              Generate OTP
            </button>
          </div>
          {otpGenerated && (
            <div className="form-group">
              <label htmlFor="otp">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
            </div>
          )}
          {otpGenerated && (
            <div className="form-group">
              <button className="btn btn-primary" onClick={handleTransfer}>
                Transfer
              </button>
            </div>
          )}
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
}
