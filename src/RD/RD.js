import React, { useState, useEffect } from 'react';
import './Rd.css';
import api from '../Api/api';

const RD = () => {
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState(6); 
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const storedUserData = JSON.parse(sessionStorage.getItem('userDetails')) || {};
  const accountNumber = storedUserData.accNo || sessionStorage.getItem('accountNumber');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(api + 'Account/getBalance?accNo=' + storedUserData.accNo);
        const data = await response.json();
        setBalance(data);

        // Update local storage with the retrieved balance
        storedUserData.balance = data;
        sessionStorage.setItem('userDetails', JSON.stringify(storedUserData));
      } catch (error) {
        console.error('Error fetching balance:', error);
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
        console.log('Creating new RD:', depositData); // Log the deposit data
  
        const response = await fetch(api + 'rd/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(depositData),
        });
  
        if (response.ok) {
          alert('RD Creation successful!');
          setBalance(balance - parseFloat(amount));
          setAmount('');
          setTenure(6);
        } else {
          setError('Error creating Recurring deposit');
        }
      } catch (error) {
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
