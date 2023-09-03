import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Api/api';
import { DefaultSidebar } from '../SideNavbar/Sidebar';
import './DepositDetailsPage.css';
import Swal from 'sweetalert2';
import { TailSpin } from 'react-loader-spinner';

const storedUserData = JSON.parse(sessionStorage.getItem("userDetails")) || {};
const DepositDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fdDetails, setFDDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const fetchFDDetails = async () => {
      try {
        const headers = new Headers({
          'Authorization': `Bearer ${storedUserData.accessToken}`,
          'ngrok-skip-browser-warning': '69420',
        });

        const response = await fetch(api + 'fd/getbyId?id=' + id, {
          method: 'GET',
          headers: headers,
        });

        if (response.ok) {
          const data = await response.json();
          setFDDetails(data);
          setLoading(false); // Set loading to false when API call is complete
        } else {
          // Handle error cases
          setLoading(false); // Make sure to set loading to false in case of errors
          console.error('Failed to fetch FD details');
        }
      } catch (error) {
        // Handle network or other errors
        setLoading(false); // Make sure to set loading to false in case of errors
        console.error('Error while fetching FD details:', error);
      }
    };

    fetchFDDetails();
  }, [id]);

  const handleBreakDeposit = async () => {
    setLoading(true);
    try {
      const response = await fetch(api + `fd/break?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedUserData.accessToken}`,
          'ngrok-skip-browser-warning': '69420',
        },
      });

      if (response.ok) {
        setLoading(false); 
        console.log('Deposit broken successfully');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Fixed Deposit successfully broken',
        });
        navigate('/deposit');
      } else {
        setLoading(false); 
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to break deposit. Please try again.',
        });
        console.error('Failed to break deposit');
      }
    } catch (error) {
      setLoading(false); 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to break deposit. Please try again.',
      });
      console.error('Error while breaking deposit:', error);
    }
  };

  return (
    <div className="deposit-details-page">
      <DefaultSidebar />
      <div className="deposit-details-content">
        <h2>Deposit Details</h2>

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
          <>
            {fdDetails ? (
              <div className="details">
                <p>ID: {fdDetails.fdId || fdDetails.rid}</p>
                <p>Amount: {fdDetails.amount || fdDetails.monthlyPaidAmount}</p>
                <p>Interest: {fdDetails.interestRate || fdDetails.interest}%</p>
                <p>Maturity Date: {fdDetails.maturityDate}</p>
                <p>Final Amount: {fdDetails.totalAmount || fdDetails.maturityAmount}</p>
              </div>
            ) : (
              <p>No FD details available.</p>
            )}

            <button onClick={handleBreakDeposit}>Break Deposit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default DepositDetailsPage;
