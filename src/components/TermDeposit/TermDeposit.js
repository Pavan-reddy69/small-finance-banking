import React, { useState, useEffect } from 'react';
import './TermDeposit.css';
import api from '../../Api/api';
import Swal from 'sweetalert2';
import Loader, { TailSpin } from 'react-loader-spinner'; // Import the Loader component

const TermDeposit = () => {
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('0');
  const [interest, setInterest] = useState(0);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state and set it to true initially
  const storedUserData = JSON.parse(sessionStorage.getItem('userDetails')) || {};
  const accountNumber = storedUserData.accNo || sessionStorage.getItem('accountNumber');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const headers = new Headers({
          'Authorization': `Bearer ${storedUserData.accessToken}`,
          'ngrok-skip-browser-warning': '69420',
        });

        const response = await fetch(api + 'Account/getBalance?accNo=' + storedUserData.accNo, {
          method: 'GET',
          headers: headers,
        });

        const data = await response.json();
        setBalance(data);

        storedUserData.balance = data;
        sessionStorage.setItem('userDetails', JSON.stringify(storedUserData));
        setLoading(false); // Set loading to false after the API call is complete
      } catch (error) {
        console.error('Error fetching balance:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching balance',
        });
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchBalance();
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleTenureChange = (event) => {
    setTenure(event.target.value);
    const interestRates = {
      'ONE_MONTH': 1.5,
      'THREE_MONTHS': 3.5,
      'SIX_MONTHS': 5.0,
      'ONE_YEAR': 8.5,
    };
    setInterest(interestRates[event.target.value]);
  };

  const handleDeposit = async () => {
    if (parseFloat(amount) > balance) {
      setError('Insufficient balance.');
    } else {
      setError('');
      setLoading(true); // Set loading to true before making the API call
      try {
        const depositData = {
          accountNumber: accountNumber,
          tenures: tenure,
          amount: amount
        };
        console.log('Creating new FD:', depositData);
        const response = await fetch(api + 'fd/createFixedDeposit', {
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
            text: "FD Creation successful!",
          });

          setBalance(balance - parseFloat(amount));
          setAmount("");
          setTenure('0');
          setLoading(false); // Set loading to false after the API call is complete

        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error creating term deposit',
          });
          setError('Error creating term deposit');
          setLoading(false); // Set loading to false in case of an error
        }
      } catch (error) {
        console.error('Deposit creation error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error creating term deposit',
        });
        setError('Error creating term deposit');
        setLoading(false); // Set loading to false in case of an error
      }
    }
  };

  return (
    <div className="container">
      {loading ? ( 
        <div className='loader-container'>
        <TailSpin
          type="TailSpin"
          color="red"
          height={100}
          width={150}
        />
      </div>
      ) : (
        <div>
          <div className="basic-details">
            <h2>Basic Details</h2>
            <p>Account Number: {accountNumber}</p>
          </div>
          <div className="create-deposit">
            <h2>Create Term Deposit</h2>
            <br />
            <label>Amount:</label>
            <input type="text" value={amount} onChange={handleAmountChange} />
            <br />
            <label>Tenure:</label>
            <select value={tenure} onChange={handleTenureChange}>
              <option value="0">Select Tenure</option>
              <option value="ONE_MONTH">1 month</option>
              <option value="THREE_MONTHS">3 months</option>
              <option value="SIX_MONTHS">6 months</option>
              <option value="ONE_YEAR">1 year</option>
            </select>
            <br />
            <p>Interest Rate: {interest}%</p>
            <button onClick={handleDeposit}>Apply Deposit</button>
            {error && <p className="error-message">{error}</p>}
            <p className="balance">Balance: {balance}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermDeposit;
