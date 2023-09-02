import React, { useState, useEffect } from 'react';
import './Rd.css';
import api from '../Api/api';
import Swal from 'sweetalert2';

const RD = () => {
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState(6); 
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const storedUserData = JSON.parse(sessionStorage.getItem('userDetails')) || {};
  const accountNumber = storedUserData.accNo || sessionStorage.getItem('accountNumber');
  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${storedUserData.accessToken}`,
      'ngrok-skip-browser-warning': '69420',
    };
  
    const fetchBalance = async () => {
      try {
        const response = await fetch(api + 'Account/getBalance?accNo=' + storedUserData.accNo, {
          headers: headers,
        });
        const data = await response.json();
        setBalance(data);
  
        // Update local storage with the retrieved balance
        storedUserData.balance = data;
        sessionStorage.setItem('userDetails', JSON.stringify(storedUserData));
      } catch (error) {
        console.error('Error fetching balance:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching balance',
        });
      }
    };
  
    fetchBalance();
  }, []);
  
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTenureChange = (event) => {
    setTenure(parseInt(event.target.value));
    
  };

  const handleDeposit = async () => {
    if (parseFloat(amount) > balance) {
      setError('Insufficient balance.');
    } else if (tenure < 6) {
      setError('Tenure should be at least 6 months.');
    } else {
      setError('');
      try {
        const depositData = {
          accountNumber: accountNumber,
          monthTenure: tenure,
          monthlyPaidAmount: amount,
        };
        console.log('Creating new RD:', depositData);
  
        const response = await fetch(api + 'rd/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedUserData.accessToken}`,
            'ngrok-skip-browser-warning': '69420',
          },
          body: JSON.stringify(depositData),
        });
  
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "RD Creation successful!",
          });
          setBalance(balance - parseFloat(amount));
          setAmount('');
          setTenure(6);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error creating Recurring deposit',
          });
          setError('Error creating Recurring deposit');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error creating Recurring deposit',
        });
        console.error('Deposit creation error:', error);
        setError('Error creating Recurring deposit');
      }
    }
  };
  

  return (
    <div className="container">
      <div className="basic-details">
        <h2>Basic Details</h2>
        <p>Account Number: {accountNumber}</p>
        <p>Earn Upto 11%* Interest Rate annualy on your Recurring Deposit!!</p>
        <p>P.S. A Recurring Deposit can not be closed before the Tenure selected.</p>
      </div>
      <div className="create-deposit">
        <h2>Create Recurring Deposit</h2>
        <br />
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
        <br />
        <label>Tenure (months):</label>
        <input
          type="number"
          value={tenure}
          min="6" 
          max="60" 
          onChange={handleTenureChange}
        />
        <br />
        <button onClick={handleDeposit}>Apply Deposit</button>
        {error && <p className="error-message">{error}</p>}
        <p className="balance">Balance: {balance}</p>
      </div>
    </div>
  );
};

export default RD;
