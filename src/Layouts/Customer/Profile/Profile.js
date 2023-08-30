import React, { useState, useEffect } from 'react';
import './Profile.css';
import api from '../../../Api/api';

function Profile() {
  const [userDetails, setUserDetails] = useState({});


  useEffect(() => {
  
    const storedUserDetails = sessionStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }

  }, []);
  const maskedAadharNumber = userDetails.aadharCardNumber
  ? userDetails.aadharCardNumber.substring(0, 4) + '-XXXX-XXXX'
  : '';

const maskedPanNumber = userDetails.panCardNumber
  ? userDetails.panCardNumber.substring(0, 4) + 'XXXX'
  : '';

  const handlePasswordChange = () => {
    
    fetch(api+'user/resetPassword?email='+userDetails.accNo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), 
    })
      .then(response => {
        if (response.ok) {

          alert('Reset link sent to your mail.');
        } else {

          console.error('POST request failed:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error performing POST:', error);
      });
  };
  

  return (
    <div className="profile-container">
      <div className="card">
        <h2>User Details</h2>
        <p>First Name: {userDetails.firstName}</p>
        <p>Last Name: {userDetails.lastName}</p>
        <p>Email: {userDetails.email}</p>
        <p>Phone: {userDetails.phoneNumber}</p>
        <p>Aadhar Number: {maskedAadharNumber}</p>
        <p>PAN Number: {maskedPanNumber}</p>
      </div>

      <div className="card">
        <h2>Bank Details</h2>
        <p>Account Number: {userDetails.accNo}</p>
        <p>Account Balance: {userDetails.balance}</p>
        <p>Loan Amount: {userDetails.loanAmount}</p>
        <p>Deposit Amount: {userDetails.depositAmount}</p>
      </div>

      <button className="button" onClick={handlePasswordChange}>Change Your Password</button>
    </div>
  );
}

export default Profile;
