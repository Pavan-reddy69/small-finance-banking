import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoanDetailsPage.css';
import api from '../../../../../Api/api';
import Swal from 'sweetalert2';
import { TailSpin } from 'react-loader-spinner';
import PDFViewer from '../../../../../components/PDFviewer/PDFviewer';
const LoanDetailsPage = () => {
    const { loanId } = useParams();
    const [loanAndUserDetails, setLoanAndUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const storedUserData = JSON.parse(sessionStorage.getItem("userDetails"));

    const headers = {
        'Authorization': `Bearer ${storedUserData.accessToken}`,
        'ngrok-skip-browser-warning': '69420',
    };

    useEffect(() => {
        axios.get(api + 'loan/getById?id=' + loanId, { headers })
            .then(response => {
                setLoanAndUserDetails(response.data);
                console.log(response);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching loan and user details:', error);
                setLoading(false);
            });
    }, [loanId]);

    const handleApproveLoan = () => {
        setLoading(true);
        axios.put(api + 'loan/set?id=' + loanId + '&status=APPROVE', {}, { headers })
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Loan Approved!',
                        text: 'The loan has been approved successfully.',
                    });
                    setLoading(false);
                    navigate('/loans');
                } else {
                    setLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Approval Failed',
                        text: 'Failed to approve the loan. Please try again.',
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Approval Error',
                    text: 'An error occurred while approving the loan.',
                });
            });
    };

    const handleRejectLoan = () => {
        setLoading(true);
        axios.put(api + 'loan/set?id=' + loanId + '&status=REJECT', {}, { headers })
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Loan Rejected',
                        text: 'The loan has been rejected successfully.',
                    });
                    navigate('/loans');
                } else {
                    setLoading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Rejection Failed',
                        text: 'Failed to reject the loan. Please try again.',
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Rejection Error',
                    text: 'An error occurred while rejecting the loan.',
                });
            });
    };


    if (loading) {
        return (
            <div className='loader-container'>
                <TailSpin
                    type="TailSpin"
                    color="red"
                    height={100}
                    width={150}
                />
            </div>
        );
    }
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
       
        <iframe
            title="Document 1"
            src={loanAndUserDetails.loanSuppliment1}
            className="pdf-iframe"
            style={{ display: 'none' }}
        />
    </div>
    <div className="card-doc2">
     
        <iframe
            title="Document 2"
            src={loanAndUserDetails.loanSuppliment2}
            className="pdf-iframe"
            style={{ display: 'none' }}
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
