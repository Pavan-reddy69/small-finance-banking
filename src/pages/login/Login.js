import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React , {useState}from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardImage
}
  from 'mdb-react-ui-kit';
  import { useHistory } from 'react-router-dom'; 
import img1 from '../../assests/highest-fd-interest-rates.jpg'
import './Login.css'
import img2 from '../../assests/logo.png'

function Login() {
  const history = useHistory(); // Initialize history for navigation

  // State for form inputs
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login form submission
  const handleLogin = async () => {
    try {
      // Make API call to authenticate user
      const response = await fetch('YOUR_AUTH_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountNumber,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the API returns an access token and user details
        const { accessToken, userDetails } = data;

        // Store access token and user details in localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        // Navigate to '/home' route
        history.push('/home');
      } else {
        // Handle authentication error
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <MDBContainer fluid className='p-4'>

      <MDBRow>

        <MDBCol md='8' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <MDBCardImage src={img1} alt="login form" className='rounded-start1 w-10 h-10' />
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
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
                wrapperClass='mb-4'
                label='Account Number'
                id='form1'
                type='text' // Change type to 'text'
                pattern="[0-9]{16}" // Allow only numeric characters
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                  if (e.target.value.length > 16) {
                    e.target.value = e.target.value.slice(0, 16); // Limit to 16 digits
                  }
                }}
              />
              <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' />

              <MDBBtn className='w-100 mb-4' size='md' onClick={handleLogin}>Login</MDBBtn>

              <div>
                <p className="mb-0">Don't have an account? <a href="\signup" class="text-black-50 fw-bold">Sign Up</a></p>

              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;
