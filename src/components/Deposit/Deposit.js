import React, { useState } from "react";
import axios from "axios";
import api from "../../Api/api";
import './DepositTab.css';
import Swal from 'sweetalert2';
import { TailSpin } from 'react-loader-spinner'; 

export default function DepositTab() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails"));

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const handlePaymentSuccess = async (paymentId) => {
    try {
      setLoading(true);

      const accessToken = storedUserData.accessToken;

      const apiResponse = await axios.post(
        api + "transaction/transfer?accNo=" + storedUserData.accNo,  
        {
          to: storedUserData.accNo,
          amount: amount,
          type: "DEPOSIT",
          paymentId: paymentId,
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'ngrok-skip-browser-warning': '69420',
          }
        }
      );

      setLoading(false);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Deposit Successful',
      });
      setAmount('');
    } catch (error) {
      setLoading(false);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Deposit failed. Please try again.',
      });
    }
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_j4qePTELNg4J1r",
      currency: "INR",
      amount: amount * 100,
      name: "APA Bank",
      description: "Thanks for Depositing",
      image: require("../../assests/icon.jpg"),
      handler: function (response) {
        handlePaymentSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: "Pavan Reddy",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="deposit-container">
      <h2 className="deposit-heading">Deposit</h2>
      <div className="card deposit-card">
        <div className="card-body">
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
          <div className="form-group">
            <label htmlFor="amount" className="deposit-label">
              Amount to Deposit:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="deposit-input"
            />
          </div>
      
          <button
            className="btn btn-primary deposit-button"
            onClick={() => displayRazorpay(amount)}
          >
            Initiate Deposit
          </button>
        </div>
      </div>
    </div>
  );
}
