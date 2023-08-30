import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDetailsPage.css'; // Import your CSS file
import api from '../../../../Api/api';

const UserDetailsPage = () => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(api + 'user/getById?id=' + userId)
            .then(response => {
                setUserDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }, [userId]);

    if (!userDetails) {
        return <p>Loading...</p>;
    }
    const handleVerifyKYC = () => {
        axios.get(api + 'Account/setKyc?accNo='+userDetails.accountNumber)
            .then(response => {
                window.alert('KYC is approved');
                navigate('/admin-home');
            })
            .catch(error => {
                console.error('Error verifying KYC:', error);
            });
    };
    return (
        <div className="user-details">
            <div className="card-container-user">
                <div className="card-user">
                    <p><strong>KYC Status:</strong> {userDetails.kyc ? 'Completed' : 'Pending'}</p>
                    <p><strong>Account Number:</strong> {userDetails.accountNumber}</p>
                    <p><strong>User ID:</strong> {userDetails.userId}</p>
                    <p><strong>First Name:</strong> {userDetails.firstName}</p>
                    <p><strong>Last Name:</strong> {userDetails.lastName}</p>
                    <p><strong>Date of Birth:</strong> {userDetails.dob}</p>
                    <p><strong>Age:</strong> {userDetails.age}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                </div>
                <div className="card">

                    <div className="image-container">
                        {userDetails.userPhoto ? (
                            <div>
                                <strong>User Photo:</strong>
                                <img src={userDetails.userPhoto} alt="User Photo" />
                            </div>
                        ) : (
                            <p>No User Photo Available</p>
                        )}
                    </div>
                </div>
                <div className="card">
                    <p><strong>Aadhar Card Number:</strong> {userDetails.aadharCardNumber}</p>
                    <div className="image-container">
                        {userDetails.aadharPhoto ? (
                            <img src={userDetails.aadharPhoto} alt="Aadhar Photo" />
                        ) : (
                            <p>No Aadhar Photo Available</p>
                        )}
                    </div>
                </div>
                <div className="card">
                    <p><strong>PAN Card Number:</strong> {userDetails.panCardNumber}</p>
                    <div className="image-container">
                        {userDetails.panPhoto ? (
                            <img src={userDetails.panPhoto} alt="PAN Photo" />
                        ) : (
                            <p>No PAN Photo Available</p>
                        )}
                    </div>
                </div>
                <div className="card">
                    <div className="image-container">
                        {userDetails.salarySlip ? (
                            <img src={userDetails.salarySlip} alt="Salary Slip" />
                        ) : (
                            <p>No Salary Slip Available</p>
                        )}
                    </div>
                </div>
                <div className="card">
                    <div className="image-container">
                        {userDetails.homeSlip ? (
                            <img src={userDetails.homeSlip} alt="Home Slip" />
                        ) : (
                            <p>No Home Slip Available</p>
                        )}
                    </div>
                </div>
                <div className="card">
                    <div className="image-container">
                        {userDetails.educationSlip ? (
                            <img src={userDetails.educationSlip} alt="Education Slip" />
                        ) : (
                            <p>No Education Slip Available</p>
                        )}
                    </div>
                </div>
            </div>
            {!userDetails.kyc && (
                <button className="verify-button" onClick={handleVerifyKYC}>
                    Verify KYC
                </button>
            )}
        </div>
    );
};

export default UserDetailsPage;
