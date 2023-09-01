import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoanDetailsPage.css'; 
import api from '../../../../../Api/api';
import Swal from 'sweetalert2';


const LoanDetailsPage = () => {
    const { loanId } = useParams();
    const [loanAndUserDetails, setLoanAndUserDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(api + 'loan/getById?id=' + loanId)
            .then(response => {
                setLoanAndUserDetails(response.data);
                console.log(response)
            })
            .catch(error => {
                console.error('Error fetching loan and user details:', error);
            });
    }, [loanId]);

    if (!loanAndUserDetails) {
        return <p>Loading...</p>;
    }

    const handleApproveLoan = () => {
        axios.put(api + 'loan/set?id='+loanId+'&status=APPROVE' )
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Loan Approved!',
                        text: 'The loan has been approved successfully.',
                    });
                    navigate('/loans');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Approval Failed',
                        text: 'Failed to approve the loan. Please try again.',
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Approval Error',
                    text: 'An error occurred while approving the loan.',
                });
            });
    };


    const handleRejectLoan = () => {
        axios.put(api + 'loan/set?id='+loanId+'&status=REJECT' )
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Loan Rejected',
                        text: 'The loan has been rejected successfully.',
                    });
                    navigate('/loans');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Rejection Failed',
                        text: 'Failed to reject the loan. Please try again.',
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Rejection Error',
                    text: 'An error occurred while rejecting the loan.',
                });
            });
    };
    


    return (
        <div className="loan-details">
            <div className="card-container-loan">
                <div className="card-user">
                    <p><strong>Account Number:</strong> {loanAndUserDetails.accountNumber}</p>
                    <p><strong>First Name:</strong> {loanAndUserDetails.firstName}</p>
                    <p><strong>Last Name:</strong> {loanAndUserDetails.lastName}</p>
                    <p><strong>Date of Birth:</strong> {loanAndUserDetails.dob}</p>
                    <p><strong>Age:</strong> {loanAndUserDetails.age}</p>
                    <p><strong>Email:</strong> {loanAndUserDetails.email}</p>
                </div>

                <div className="card-loan">
                    <p><strong>Loan ID:</strong> {loanAndUserDetails.loanId}</p>
                    <p><strong>Loan Amount:</strong> {loanAndUserDetails.loanedAmount}</p>
                    <p><strong>Applied Date:</strong> {loanAndUserDetails.appliedDate}</p>
                    <p><strong>Tenure:</strong> {loanAndUserDetails.tenure}</p>
                    <p><strong>Interest:</strong> {loanAndUserDetails.interest}</p>
                    <p><strong>Type of Loan:</strong> {loanAndUserDetails.typeOfLoan}</p>
                </div>
            </div>

            <div className="card-container-docs">
                <div className="card-doc1">
                    <p>Document 1:</p>
                    <iframe
                        title="Document 1"
                        src={loanAndUserDetails.document1Url}
                        className="pdf-iframe"
                    />
                </div>
                <div className="card-doc2">
                    <p>Document 2:</p>
                    <iframe
                        title="Document 2"
                        src={loanAndUserDetails.document2Url}
                        className="pdf-iframe"
                    />
                </div>
            </div>
            <div className="approval-buttons-loan">
                <button className="approve-button-loan" onClick={handleApproveLoan}>
                    Approve
                </button>
                <button className="reject-button-loan" onClick={handleRejectLoan}>
                    Reject
                </button>
            </div>
        </div>
    );
};

export default LoanDetailsPage;
