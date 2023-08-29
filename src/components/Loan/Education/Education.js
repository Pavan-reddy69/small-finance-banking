import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField } from '@mui/material';
import EducationHistoryTable from './EducationTable';
import './Education.css';
import api from '../../../Api/api';

function EducationLoanComponent() {
  const [tableRefresh, setTableRefresh] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [tenure, setTenure] = useState(0);
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails")) || {};
  const accountNumber = storedUserData.accNo || sessionStorage.getItem("accountNumber");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [collegeAdmissionFile, setCollegeAdmissionFile] = useState(null);
  const [houseDocumentsFile, setHouseDocumentsFile] = useState(null);
  const [error, setError] = useState(null); // For displaying error messages

  const steps = ['Loan Details', 'Upload Documents', 'Review and Submit'];

  const refreshTable = () => {
    setTableRefresh(true);
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
        alert("OTP generated successfully!");
      } else {
        setError("Error generating OTP");
        alert("Failed to generate OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP generation error:", error);
      setError("Error generating OTP");
      alert("An error occurred while generating OTP. Please try again.");
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
      alert("OTP verified successfully!");
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("Error verifying OTP");
      alert("An error occurred while verifying OTP. Please try again.");
    }
  };


  const applyForLoan = () => {
    if (otpVerified) {
      const loanData = {
        accountNumber: accountNumber,
        loanAmount: loanAmount,
        type: "EDUCATION_LOAN",
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
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          alert("Education Loan application successful!");
          setActiveStep(0);
          setLoanAmount('');
          setTenure('');
          setOtpSent(false);
          setOtpVerified(false)
          console.log("Loan application successful:", data);
          // Handle success scenario here, if needed
        })
        .catch(error => {
          console.error("Error applying for loan:", error);
          // Handle error scenario here, if needed
        });
    } else {
      console.log("Please verify OTP before applying for the loan.");
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
      <EducationHistoryTable tableRefresh={tableRefresh} refreshTable={refreshTable} />
      <div className="sign-container">

        <h3>Apply for Education Loan</h3>
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
                label="Tenure (months)"
                value={tenure}
                onChange={e => setTenure(e.target.value)}
              />
              <div className="button-container">
                <Button className="button next" onClick={handleNext}>Next</Button>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div>
              <Typography variant="h5">Upload Documents</Typography>
              <input
                label="College Admission File"
                type="file"
                accept=".pdf"
                onChange={e => setCollegeAdmissionFile(e.target.files[0])}
              />
              <input
                label="House Documents"
                type="file"
                accept=".pdf"
                onChange={e => setHouseDocumentsFile(e.target.files[0])}
              />
              {otpSent && (
                <div>
                  <TextField
                    className="form-control"
                    label="Enter OTP"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
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
              {/* Display user input summary */}
              {/* ... */}
              <Button className="button next" onClick={applyForLoan} disabled={!otpVerified}>
                Apply for Loan
              </Button>
              <div className="button-container">
                <Button className="button back" onClick={handleBack}>Back</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EducationLoanComponent;
