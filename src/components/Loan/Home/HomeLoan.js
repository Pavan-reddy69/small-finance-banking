import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
} from '@mui/material';
import HomeHistoryTable from './HomeTable';
import './HomeLoan.css';
import api from '../../../Api/api';
import Swal from 'sweetalert2';
import { Alert } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';

function HomeLoanComponent() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loanAmount, setLoanAmount] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [tablRefresh, setTablRefresh] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [salarySlip, setSalarySlip] = useState(null);
  const [houseDocumentsFile, setHouseDocumentsFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const storedUserData = JSON.parse(sessionStorage.getItem('userDetails')) || {};
  const accountNumber = storedUserData.accNo || sessionStorage.getItem('accountNumber');
  const [error, setError] = useState(null);
  const steps = ['Loan Details', 'Upload Documents', 'Review and Submit'];

  const refreshTable = () => {
    setTablRefresh(true);
  };

  const generateOTP = async () => {
    setError(null);

    try {
      setLoading(true);

      const otpResponse = await fetch(api + 'otp/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedUserData.accessToken}`,
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify({
          accountNumber: accountNumber,
        }),
      });

      if (otpResponse.ok) {
        setOtpSent(true);
        setSuccessMsg('OTP generated successfully!');
      } else {
        setError('Error generating OTP');
        setErrorMsg('Failed to generate OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP generation error:', error);
      setError('Error generating OTP');
      setErrorMsg(
        'An error occurred while generating OTP. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setError(null);

    try {
      setLoading(true);

      const otpResponse = await fetch(api + 'otp/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedUserData.accessToken}`,
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify({
          accountNumber: accountNumber,
          otp: otp,
        }),
      });

      if (!otpResponse.ok) {
        setError('Entered OTP is incorrect');
        return;
      }

      setOtpVerified(true);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'OTP verified successfully!',
      });
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Error verifying OTP');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while verifying OTP. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const applyForLoan = () => {
    if (otpVerified) {
      const loanData = {
        accountNumber: accountNumber,
        loanAmount: loanAmount,
        type: 'HOME_LOAN',
        tenure: tenure,
      };
  
      setLoading(true);
  
      fetch(api + 'loan/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedUserData.accessToken}`,
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify(loanData),
      })
        .then((response) => {
          if (!response.ok) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while applying Loan. Please try again.',
            });
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const loanId = data.loanId;
          console.log('Loan ID:', loanId);
          uploadSupplements(loanId);
        })
        .catch((error) => {
          console.error('Error applying for loan:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error applying for loan',
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log('Please verify OTP before applying for the loan.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please verify OTP before applying for the loan.',
      });
    }
  };
  

  const uploadSupplements = async (loanId) => {
    setError(null);

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('file1', salarySlip);
      formData.append('file2', houseDocumentsFile);
      const response = await fetch(api + `loan/uploadSuppliments/${loanId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${storedUserData.accessToken}`,
          'ngrok-skip-browser-warning': '69420',
        },
        body: formData,
      });

      if (!response.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while uploading supplements. Please try again.',
        });
        setError('Error uploading supplements');
        return;
      }
      setActiveStep(0);
      setLoanAmount(0);
      setTenure(0);
      setOtpSent(false);
      setOtpVerified(false);
      setSalarySlip(null);
      setHouseDocumentsFile(null);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: "Loan application and PDFs uploaded successfully!",
      });

     
    } catch (error) {
      console.error('Error uploading supplements:', error);
      setError('Error uploading supplements');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while uploading supplements. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === 0) {
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      {loading && (
        <div className="loader-container">
          <TailSpin type="TailSpin" color="red" height={100} width={150} />
        </div>
      )}

      <HomeHistoryTable tableRefresh={tablRefresh} refreshTable={refreshTable} />
      <div className="sign-container">
        <h3>Apply for Home Loan</h3>
        <p>1. <strong>Competitive Interest Rates:</strong> Our home loans feature competitive interest rates, with a fixed rate of 11% for one year, making homeownership more affordable.</p>
        {errorMsg && (
        <div
          className="otperror"
          style={{ marginTop: '-10px', paddingBottom: '10px' }}
        >
          <Alert severity="error" onClose={() => setErrorMsg(null)}>
            {errorMsg}
          </Alert>
        </div>
      )}
      {successMsg && (
        <div className="otpsuccess">
          <Alert severity="success" onClose={() => setSuccessMsg(null)}>
            {successMsg}
          </Alert>
        </div>
      )}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="sign-contain">
          {activeStep === 0 && (
            <div className="loan-details">
              <Typography variant="h5">Loan Details</Typography>
              <TextField
                className="textfield"
                type="number"
                label="Loan Amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
              <TextField
                className="textfield"
                type="number"
                label="Tenure (Year)"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
              />
              <div className="button-container">
                <Button className="button next" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          )}
          {activeStep === 1 && (
            <div className="loan-documents">
              <Typography variant="h5">Upload Documents</Typography>
              <p>Salary Slip</p>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setSalarySlip(e.target.files[0])}
                style={{ marginBottom: '20px' }}
              />
              <p>Land Documents</p>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setHouseDocumentsFile(e.target.files[0])}
                style={{ marginBottom: '20px' }}
              />
       
              <div className="button-container">
                <Button className="button back" onClick={handleBack}>
                  Back
                </Button>
                <Button className="button next" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <Typography variant="h5">Review and Submit</Typography>
              <p>Loan Amount: {loanAmount}</p>
              <p>Tenure: {tenure} Years</p>
              {salarySlip && <p>Salary Slip: {salarySlip.name}</p>}
              {houseDocumentsFile && (
                <p>House Documents: {houseDocumentsFile.name}</p>
              )}
                     {otpSent && (
                <div>
                  <TextField
                    className="form-control"
                    label="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{
                      marginBottom: '20px',
                      width: '50%',
                      paddingRight: '20px',
                    }}
                  />
                  <Button className="button next" onClick={verifyOTP}>
                    Verify OTP
                  </Button>
                </div>
              )}
              {!otpSent && (
                <Button className="button next" onClick={generateOTP}>
                  Generate OTP
                </Button>
              )}
              <div className="button-container">
                <Button className="button back" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  className="button next"
                  onClick={applyForLoan}
                  disabled={!otpVerified}
                >
                  Apply for Loan
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeLoanComponent;
