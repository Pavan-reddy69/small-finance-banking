import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField } from '@mui/material';
import HomeHistoryTable from './HomeTable';
import './HomeLoan.css';
import api from '../../../Api/api';
import Swal from 'sweetalert2';
import { Alert } from '@mui/material';

function HomeLoanComponent() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loanAmount, setLoanAmount] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [interestDetails, setInterestDetails] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [tablRefresh, setTablRefresh] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [salarySlip, setSalarySlip] = useState(null);
  const [houseDocumentsFile, setHouseDocumentsFile] = useState(null);
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails")) || {};
  const accountNumber = storedUserData.accNo || sessionStorage.getItem("accountNumber");
  const [error, setError] = useState(null); // For displaying error messages
  const steps = ['Loan Details', 'Upload Documents', 'Review and Submit'];



  const refreshTabl = () => {
    setTablRefresh(true);
  }

  const generateOTP = async () => {
    setError(null);

    try {
      const otpResponse = await fetch(api + "otp/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountNumber: accountNumber,
        }),
      });

      if (otpResponse.ok) {
        setOtpSent(true);
        setSuccessMsg("OTP generated successfully!");
      } else {
        setError("Error generating OTP");
        setErrorMsg("Failed to generate OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP generation error:", error);
      setError("Error generating OTP");
      setErrorMsg("An error occurred while generating OTP. Please try again.");
    }
  };

  const verifyOTP = async () => {
    setError(null);

    try {
      const otpResponse = await fetch(api + "otp/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountNumber: accountNumber,
          otp: otp,
        }),
      });

      if (!otpResponse.ok) {
        setError("Entered OTP is incorrect");
        return;
      }

      setOtpVerified(true);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: "OTP verified successfully!",
      });
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("Error verifying OTP");
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while verifying OTP. Please try again.',
      });
    }
  };


  const applyForLoan = () => {
    if (otpVerified) {
      const loanData = {
        accountNumber: accountNumber,
        loanAmount: loanAmount,
        type: "HOME_LOAN",
        tenure: tenure,
      };

      fetch(api + 'loan/apply', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loanData)
      })
        .then(response => {
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
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Education Loan application successful!",
          });
          setActiveStep(0);
          setLoanAmount('');
          setTenure('');
          setOtpSent(false);
          setOtpVerified(false)
          console.log("Loan application successful:", data);

        })
        .catch(error => {
          console.error("Error applying for loan:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error applying for loan',
          });
        });
    } else {
      console.log("Please verify OTP before applying for the loan.");
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please verify OTP before applying for the loan.',
      });
    }
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === 0) {

    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div>
       {errorMsg && (
        <div className='otperror' style={{marginTop:"-10px",paddingBottom:"10px"}}>
          <Alert severity="error" onClose={() => setErrorMsg(null)}>
            {errorMsg}
          </Alert>
        </div>
      )}
      {successMsg && (
        <div className='otpsuccess'>
          <Alert severity="success" onClose={() => setSuccessMsg(null)}>
            {successMsg}
          </Alert>
        </div>
      )}
      <HomeHistoryTable tableRefresh={tablRefresh} refreshTable={refreshTabl} />
      <div className="sign-container">

        <h3>Apply for Home Loan</h3>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className="sign-contain">
          {activeStep === 0 && (
            <div className='loan-details'>
              <Typography variant="h5">Loan Details</Typography>
              <TextField
                className='textfield'
                type="number"
                label="Loan Amount"
                value={loanAmount}
                onChange={e => setLoanAmount(e.target.value)}

              />
              <TextField
                className='textfield'
                type="number"
                label="Tenure (Year)"
                value={tenure}
                onChange={e => setTenure(e.target.value)}
              />
              <div className="button-container">
                <Button className="button next" onClick={handleNext}>Next</Button>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className='loan-documents'>
              <Typography variant="h5">Upload Documents</Typography>
              <input
                type="file"
                accept=".pdf"
                onChange={e => setSalarySlip(e.target.files[0])}
                style={{ marginBottom: '20px' }}
              />
              <input
                type="file"
                accept=".pdf"
                onChange={e => setHouseDocumentsFile(e.target.files[0])}
                style={{ marginBottom: '20px' }}
              />
              {otpSent && (
                <div>
                  <TextField
                    className="form-control"
                    label="Enter OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    style={{ marginBottom: '20px', width: '50%', paddingRight: '20px' }}
                  />
                  <Button className="button next" onClick={verifyOTP}>Verify OTP</Button>
                </div>
              )}
              {!otpSent && (
                <Button className="button next" onClick={generateOTP}>Generate OTP</Button>
              )}
              <div className="button-container">
                <Button className="button back" onClick={handleBack}>Back</Button>
                <Button className="button next" onClick={handleNext}>Next</Button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <Typography variant="h5">Review and Submit</Typography>
              <p>Loan Amount: {loanAmount}</p>
              <p>Tenure: {tenure} Years</p>
              {salarySlip && <p>Salary Slip: {salarySlip.name}</p>}
              {houseDocumentsFile && <p>House Documents: {houseDocumentsFile.name}</p>}
              
              <div className="button-container">
                <Button className="button back" onClick={handleBack}>Back</Button>
                <Button className="button next" onClick={applyForLoan} disabled={!otpVerified}>
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
