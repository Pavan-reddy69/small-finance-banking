import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardImage
} from 'mdb-react-ui-kit';
import { Alert } from '@mui/material';
import './Login.css';
import img2 from '../../assests/logo-removebg-preview (1).png';
import api from '../../Api/api';
import { TailSpin } from 'react-loader-spinner'; 
import { Link } from 'react-router-dom';

function Login() {
  const [isManagerLogin, setIsManagerLogin] = useState(false);
  const [emailOrAccount, setEmailOrAccount] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Add a loading state and set it to false initially


  const handleLogin = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call

      const loginData = {
        accountNumber: emailOrAccount,
        password: password,
      };

      const response = await fetch(api + 'user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('userDetails', JSON.stringify(data));
        setSuccessMessage("Login successful. Redirecting...");
        setTimeout(() => {
          setSuccessMessage(null);
          if (data.roleName === 'CUSTOMER') {
            window.location.href = '/customer-home';
          } else if (data.roleName === 'MANAGER') {
            window.location.href = '/admin-home';
          }
        }, 2000);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
    }
  };

  return (
    <MDBContainer fluid className='login p-4'>
      {errorMessage && (
        <div className='Alert'>
          <Alert severity="error" onClose={() => setErrorMessage(null)}>
            Enter the correct credentials
          </Alert>
        </div>
      )}
      {successMessage && (
        <div className='SuccessAlert'>
          <Alert severity="success" onClose={() => setSuccessMessage(null)}>
            {successMessage}
          </Alert>
        </div>
      )}
      <MDBRow>
        <MDBCol md='8' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="besttext my-100 display-4 fw-bold ls-tight px-12">
            The best Interest Rate <br />
            <span className="text-primary">for your Savings Account</span>
          </h1>
        </MDBCol>

        <MDBCol md='4'>
          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>
              <MDBRow>
              <Link to="/"> 
                <MDBCardImage src={img2} alt="login form" className='rounded-start w-100' />
                </Link>
              </MDBRow>
              <MDBInput
                onChange={(e) => setEmailOrAccount(e.target.value)}
                wrapperClass='mb-4'
                label={isManagerLogin ? 'Manger ID' : 'Account Number'}
                id='form1'
                type='text'
                pattern={isManagerLogin ? undefined : "[0-9]{16}"}
                onInput={(e) => {
                  if (!isManagerLogin) {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    if (e.target.value.length > 16) {
                      e.target.value = e.target.value.slice(0, 16);
                    }
                  }
                }}
              />
              <MDBInput
                wrapperClass='mb-4'
                label='Password'
                id='form1'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBBtn className='w-100 mb-4' size='md' onClick={handleLogin}>
                {isManagerLogin ? 'Manager Login' : 'Login'}
              </MDBBtn>

              <div>
                <p className="mb-0">
                  Don't have an account?{' '}
                  <a href="/signup" className="text-black-50 fw-bold">
                    Sign Up
                  </a>
                </p>
                <p className="mb-0">
                  {isManagerLogin ? (
                    <span
                      className="text-black-50 fw-bold cursor-pointer"
                      onClick={() => setIsManagerLogin(false)}
                    >
                      Customer Login
                    </span>
                  ) : (
                    <span
                      className="text-black-50 fw-bold cursor-pointer"
                      onClick={() => setIsManagerLogin(true)}
                    >
                      Manager Login
                    </span>
                  )}
                </p>
              </div>

              {loading && ( // Render the Loader component when loading is true
                <div className='loader-container'>
                  <TailSpin
                    type="TailSpin"
                    color="red"
                    height={100}
                    width={150}
                  />
                </div>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
