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
import img1 from '../../assests/highest-fd-interest-rates.jpg';
import './Login.css';
import img2 from '../../assests/logo.png';
import api from '../../Api/api';

function Login() {
  const [isManagerLogin, setIsManagerLogin] = useState(false);
  const [emailOrAccount, setEmailOrAccount] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Logging in with:', emailOrAccount);
  
    try {
      console.log('Email or Account:', emailOrAccount);
      console.log('Password:', password);
  
      const loginData = {
        accountNumber: emailOrAccount, // Treat email as accountNumber
        password: password,
      };
  
      const response = await fetch(api + 'user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('userDetails', JSON.stringify(data));
        console.log(data);
        if (data.roleName === 'CUSTOMER') {
          window.location.href = '/customer-home';
        } else if (data.roleName === 'MANAGER') {
          window.location.href = '/admin-home';
        }
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  

  return (
    <MDBContainer fluid className='login p-4'>
      <MDBRow>
        <MDBCol md='8' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="besttext my-5 display-3 fw-bold ls-tight px-3">
            The best Interest Rate <br />
            <span className="text-primary">for your Savings Account</span>
          </h1>
        </MDBCol>

        <MDBCol md='4'>
          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>
              <MDBRow>
                <MDBCardImage src={img2} alt="login form" className='rounded-start w-100' />
              </MDBRow>
              <MDBInput
                onChange={(e) => setEmailOrAccount(e.target.value)}
                wrapperClass='mb-4'
                label={isManagerLogin ? 'Email' : 'Account Number'}
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
                    <a
                      href="#"
                      className="text-black-50 fw-bold"
                      onClick={() => setIsManagerLogin(false)}
                    >
                      Customer Login
                    </a>
                  ) : (
                    <a
                      href="#"
                      className="text-black-50 fw-bold"
                      onClick={() => setIsManagerLogin(true)}
                    >
                      Manager Login
                    </a>
                  )}
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
