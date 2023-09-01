import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, TextField } from '@mui/material';
import EducationHistoryTable from './EducationTable';
import './Education.css';
import api from '../../../Api/api';
import Swal from 'sweetalert2';
import { Alert } from '@mui/material';

function EducationLoanComponent() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
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
          uploadPDFs(loanId);
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error applying for loan',
          });
          console.error("Error applying for loan:", error);
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please verify OTP before applying for the loan.',
      });
      console.log("Please verify OTP before applying for the loan.");
    }
  };
  
  const uploadPDFs = (loanId) => {
    const formData = new FormData();
    formData.append('file1', collegeAdmissionFile);
    formData.append('file2', houseDocumentsFile);
    formData.append('id', loanId);
  
    fetch(api + `loan/uploadSuppliments`, {
      method: "PUT",
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Loan application and PDFs uploaded successfully!",
          });
          console.log("Loan application and PDFs uploaded successfully");
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while uploading PDFs. Please try again.',
          });
          console.error("Error uploading PDFs");
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while uploading PDFs. Please try again.',
        });
        console.error("Error uploading PDFs:", error);
      });
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
                label="Tenure (Years)"
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
                label="College Admission File"
                type="file"
                accept=".jpg"
                onChange={e => setCollegeAdmissionFile(e.target.files[0])}
                style={{ marginBottom: '20px' }}
              />
              <input
                label="House Documents"
                type="file"
                accept=".jpg"
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
                    style={{ marginBottom: '20px' ,width:'50%',paddingRight:'20px'}}
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
            <div className='Apply-loan'>
              <Typography variant="h5">Review and Submit</Typography>
              <p>Loan Amount: {loanAmount}</p>
              <p>Tenure: {tenure} Years</p>
              {collegeAdmissionFile && <p>Salary Slip: {collegeAdmissionFile.name}</p>}
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

export default EducationLoanComponent;
