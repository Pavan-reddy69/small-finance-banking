import React, { useState, useEffect } from 'react';
import './Details.css';
import TransactionTable from '../TransactionTable/TransactionTable';
import { useNavigate } from 'react-router-dom';

const DetailsComponent = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch user data from sessionStorage
    const storedUserData = JSON.parse(sessionStorage.getItem("userDetails"));

    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleClick = () => {
    navigate('/transactions', { state: { activeTab: 'passbook' } });
  };

  return (
    <div className="details-container">
      <div className="card-row">
        <div className="card1">
          <h2>Bank Account Details</h2>
          <p>Account Number: {userData.accNo}</p>
          <p>Account Holder: {userData.firstName} {userData.lastName}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
        </div>

        <div className="card1">
          <h2>Financial Details</h2>
          <p>Balance: ${userData.balance}</p>
          <p>Loan Amount: ${userData.loanAmount}</p>
          <p>Deposit Amount: ${userData.depositAmount}</p>
        </div>
      </div>

      <div className="transaction-table">
        <TransactionTable />
      </div>
      <button className="view-all-button" onClick={handleClick}>
        View All Transactions
      </button>
    </div>
  );
};

export default DetailsComponent;
