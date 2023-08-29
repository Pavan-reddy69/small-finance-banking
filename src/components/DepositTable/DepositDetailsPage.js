import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Api/api';
import { DefaultSidebar } from '../SideNavbar/Sidebar';
import './DepositDetailsPage.css'; // Import your custom CSS file here

const DepositDetailsPage = ({ deposit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fdDetails, setFDDetails] = useState(null);
  const storedUserData = JSON.parse(sessionStorage.getItem('userDetails')) || {};

  useEffect(() => {
    const fetchFDDetails = async () => {
      try {
        const response = await fetch(api + 'fd/getbyId?id='+id); // Update the API endpoint
        const data = await response.json();
        setFDDetails(data);
      } catch (error) {
        console.error('Error fetching FD details:', error);
      }
    };

    fetchFDDetails();
  }, [id]);

  const handleBreakDeposit = async () => {
    try {
      const response = await fetch(api + `fd/break?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Handle success
        console.log('Deposit broken successfully');
        alert('Deposit successfully broken');
        
        // Navigate back to the /deposits page
        navigate('/deposit');
      } else {
        console.error('Failed to break deposit');
      }
    } catch (error) {
      console.error('Error while breaking deposit:', error);
    }
  };
  
  
  return (
    <div className="deposit-details-page">
      <DefaultSidebar />
      <div className="deposit-details-content">
        <h2>Deposit Details</h2>

        {/* Display FD details */}
        {fdDetails ? (
          <div className="details">
            <p>ID: {fdDetails.fdId || fdDetails.rid}</p>
            <p>Amount: {fdDetails.amount || fdDetails.monthlyPaidAmount}</p>
            <p>Interest: {fdDetails.interestRate || fdDetails.interest}%</p>
            <p>Maturity Date: {fdDetails.maturityDate}</p>
            <p>Final Amount: {fdDetails.totalAmount || fdDetails.maturityAmount}</p>
          </div>
        ) : (
          <p>Loading FD details...</p>
        )}

      
        <button onClick={handleBreakDeposit}>Break Deposit</button>
      </div>
    </div>
  );
};

export default DepositDetailsPage;
