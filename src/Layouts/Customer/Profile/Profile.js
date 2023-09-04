import React, { useState, useEffect } from 'react';
import './Profile.css';
import api from '../../../Api/api';
import Loader, { TailSpin } from 'react-loader-spinner'; // Import the Loader component
import Swal from 'sweetalert2';
function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(false); // Add a loading state and set it to false initially
  const storedUserDetails =  JSON.parse(sessionStorage.getItem("userDetails"));

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
    setLoading(true); // Set loading to true before making the API call
    fetch(api + 'user/resetPassword?email=' + userDetails.accNo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${storedUserDetails.accessToken}`,
        'ngrok-skip-browser-warning': '69420',
      },
      body: JSON.stringify({}),
    })
      .then(response => {
        setLoading(false); // Set loading to false after the API call is complete
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Reset link sent to your mail!",
          });
        } else {
          console.error('POST request failed:', response.statusText);
        }
      })
      .catch(error => {
        setLoading(false); // Set loading to false in case of an error
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

      {loading && ( 
        <div className='loader-container'>
        <TailSpin
          type="TailSpin"
          color="red"
          height={100}
          width={150}
        />
      </div>
      )}
    </div>
  );
}

export default Profile;
