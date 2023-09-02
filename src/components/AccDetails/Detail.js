import React, { useState, useEffect } from 'react';
import './Details.css';
import TransactionTable from '../TransactionTable/TransactionTable';
import { useNavigate } from 'react-router-dom';
import api from '../../Api/api';

const DetailsComponent = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails")) || {};
  const accountNumber = storedUserData.accNo || sessionStorage.getItem("accountNumber");

  useEffect(() => {
    const storedUserData = JSON.parse(sessionStorage.getItem("userDetails"));

    if (storedUserData) {
      setUserDetails(storedUserData);
    }
  }, []);

  const handleClick = () => {
    navigate('/transactions', { state: { activeTab: 'passbook' } });
  };

  useEffect(() => {
    if (userDetails.accNo) {

      fetchUpdatedFields()
        .then((updatedFields) => {

          const updatedUserDetails = {
            ...userDetails,
            loanAmount: updatedFields.loanAmount,
            depositAmount: updatedFields.depositAmount,
            balance: updatedFields.balance,
            kyc: updatedFields.kyc,
          };

          setUserDetails(updatedUserDetails);
          sessionStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
        })
        .catch((error) => {
          console.error("Error fetching updated fields:", error);
        });
    }
  }, [userDetails.accNo]);


  const fetchUpdatedFields = async () => {
    try {
      const accessToken = storedUserData.accessToken; // Assuming the access token is stored in storedUserData
  
      const response = await fetch(api + 'Account/homePage?accNo=' + storedUserData.accNo, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'ngrok-skip-browser-warning': '69420',
        }
      });
  
      if (response.ok) {
        const updatedFields = await response.json();
        return updatedFields;
      } else {
        throw new Error("Failed to fetch updated fields");
      }
    } catch (error) {
      throw new Error("Failed to fetch updated fields");
    }
  };
  
  return (
    <div className="details-container">
      <div className="card-row">
        <div className="card1">
          <h2>Bank Account Details</h2>
          <p>Account Number: {userDetails.accNo}</p>
          <p>Account Holder: {userDetails.firstName} {userDetails.lastName}</p>
          <p>Phone Number: {userDetails.phoneNumber}</p>
        </div>

        <div className="card1">
          <h2>Financial Details</h2>
          <div className="column">
            <p>Balance: Rs.{userDetails.balance}</p>
            <p>KYC: {userDetails.kyc ? 'Verified' : 'Not Verified'}</p>
          </div>
          <div className="column">
            <p>Loan Amount: Rs.{userDetails.loanAmount}</p>
            <p>Deposit Amount: Rs.{userDetails.depositAmount}</p>
            
          </div>
        </div>


        <div className="transaction-table">
          <TransactionTable />
        </div>
        <button className="view-all-button" onClick={handleClick}>
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default DetailsComponent;
