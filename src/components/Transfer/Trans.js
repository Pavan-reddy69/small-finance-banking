import React, { useState, useEffect } from "react";
import api from "../../Api/api";
import Swal from 'sweetalert2';
import { Alert } from '@mui/material';
import { TailSpin } from 'react-loader-spinner'; // Import the loader component

export default function TransferTab() {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [recipientAccount, setRecipientAccount] = useState("");
  const [otp, setOtp] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false); // Add a loading state
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails")) || {};
  const accountNumber = storedUserData.accNo || sessionStorage.getItem("accountNumber");
  const accessToken = storedUserData.accessToken;

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true); // Set loading to true before making the API call

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
        sessionStorage.setItem('userDetails', JSON.stringify(storedUserData));
      } catch (error) {
        console.error('Error fetching balance:', error);
      } finally {
        setLoading(false); // Set loading to false after the API call is complete
      }
    };

    fetchBalance();
  }, []);

  const handleGenerateOtp = async () => {
    setError(null);

    try {
      setLoading(true); // Set loading to true before making the API call

      const otpResponse = await fetch(api + "otp/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`,
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify({
          accountNumber: accountNumber,
        }),
      });

      if (otpResponse.ok) {
        setOtpGenerated(true);
        setSuccessMsg("OTP generated successfully!");
      } else {
        setError("Error generating OTP");
        setErrorMsg("Failed to generate OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP generation error:", error);
      setError("Error generating OTP");
      setErrorMsg("An error occurred while generating OTP. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
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
      setLoading(true); // Set loading to true before making the API call

      const otpResponse = await fetch(api + "otp/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`,
          'ngrok-skip-browser-warning': '69420',
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
          'Authorization': `Bearer ${accessToken}`,
          'ngrok-skip-browser-warning': '69420',
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

        setSuccessMsg("Amount Transfer Successful");
      } else {
        setError("Error processing transfer");
        setErrorMsg("Transfer Request failed. Please try again.");
      }
    } catch (error) {
      console.error("Transfer error:", error);
      setError("Error processing transfer");
      setErrorMsg("An error occurred while processing transfer. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
    }
  };

  return (
    <div>
      {errorMsg && (
        <div className='otperror' style={{marginTop:"-10px",paddingBottom:"10px"}}>
          <Alert severity="error" onClose={() => setErrorMsg(null)}>
            {errorMsg}
          </Alert>
        </div>
      )}
      {successMsg && (
        <div className='otpsuccess'>
          <Alert severity="success" onClose={() => setSuccessMsg(null)}>
            {successMsg}
          </Alert>
        </div>
      )}
      {loading && (
        <div className="loader-container">
          <TailSpin
            type="TailSpin"
            color="red"
            height={100}
            width={150}
          />
        </div>
      )}
      <h2>Transfer</h2>
      <div className="card">
        <div className="card-header">
          Account Number: <span>{accountNumber}</span>
        </div>
        <div className="card-body">
          <p>Available Balance: {balance !== null ? balance : 0}</p>
          <div className="form-grou">
            <label htmlFor="recipientAccount" style={{paddingRight:'10px',paddingBottom:'10px'}}>Recipient's Account Number:</label>
            <input
              type="text"
              id="recipientAccount"
              value={recipientAccount}
              pattern="[0-9]{16}"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                if (e.target.value.length > 16) {
                  e.target.value = e.target.value.slice(0, 16);
                }
              }}
              onChange={(e) => setRecipientAccount(e.target.value)}
              placeholder="Enter recipient's account number"
              className="deposit-input"
            />
          </div>
          <div className="form-grou">
            <label htmlFor="amount" style={{paddingRight:'10px',paddingBottom:'10px'}}>Amount to Transfer:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="deposit-input"
            />
          </div>
          <div className="form-grou">
            <button className="btn btn-primary" onClick={handleGenerateOtp}>
              Generate OTP
            </button>
          </div>
          {otpGenerated && (
            <div className="form-grou">
              <label htmlFor="otp" style={{paddingRight:'10px',paddingBottom:'10px'}}>Enter OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="deposit-input"
                style={{paddingRight:'10px',marginTop:'10px'}}
              />
            </div>
          )}
          {otpGenerated && (
            <div className="form-grou">
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
