import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Stepper, Step, StepLabel } from '@mui/material';
import { FaUser, FaEnvelope, FaCalendar, FaPhone, FaIdCard, FaCamera } from 'react-icons/fa';
import './Signup.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import api from '../../Api/api';
const steps = ['User Information', 'Upload Images', 'Review Details', 'Success'];

const SignUpPage = () => {
    const [activeStep, setActiveStep] = useState(0);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        aadharCardNumber: '',
        panCardNumber: '',
        dob: '',
        phoneNumber: '',
        email: '',
    });
    const isFormComplete = () => {
        if (activeStep === 0) {
            return (
                formData.firstName &&
                formData.lastName &&
                formData.aadharCardNumber &&
                formData.panCardNumber &&
                formData.dob &&
                formData.phoneNumber &&
                formData.email
            );
        } else if (activeStep === 1) {
            return formData.aadharImage && formData.panImage && formData.userPhoto;
        }
        return false;
    };

    const handleSignUp = async () => {
        try {
            const formSubmissionResponse = await axios.post(api+'Account/create', formData);
            console.log('API response:', formSubmissionResponse.data);
            // First, upload the images
            const formDataForImages = new FormData();
            formDataForImages.append('file1', formData.aadharImage);
            formDataForImages.append('file2', formData.panImage);
            formDataForImages.append('file3', formData.userPhoto);
            formDataForImages.append('userName',formData.email)
            const imageUploadResponse = await axios.put(api+'user/uploadImage', formDataForImages);
            console.log('Image upload response:', imageUploadResponse.data);
    
           
      
    
          
            handleNext();
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };
    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };


    const handleImageUpload = (e, imageType) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            [imageType]: file,
        }));
    };
    const handleCaptureImage = async (imageType) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            const videoElement = document.createElement('video');
            videoElement.srcObject = stream;

            videoElement.onloadedmetadata = () => {
                videoElement.play();

                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;

                const context = canvas.getContext('2d');
                context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        setFormData((prevData) => ({
                            ...prevData,
                            [imageType]: blob,
                        }));
                    }

                    // Clean up by stopping the camera stream
                    stream.getTracks().forEach((track) => track.stop());
                }, 'image/jpeg', 0.8);
            };
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };
    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <Container className="signup-contain">

                        <Form onSubmit={handleSignUp}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="firstName">
                                        <Form.Label className="form-label">
                                            <FaUser /> First Name
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter first name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="lastName">
                                        <Form.Label className="form-label">
                                            <FaUser /> Last Name
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter last name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3" controlId="aadharCardNumber">
                                <Form.Label className="form-label">
                                    <FaIdCard /> Aadhar Card
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Aadhar card number"
                                    name="aadharCardNumber"
                                    value={formData.aadharCardNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="panCardNumber">
                                <Form.Label className="form-label">
                                    <FaIdCard /> PAN Card
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter PAN card number"
                                    name="panCardNumber"
                                    value={formData.panCardNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="dob">
                                <Form.Label className="form-label">
                                    <FaCalendar /> Date of Birth
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="phoneNumber">
                                <Form.Label className="form-label">
                                    <FaPhone /> Phone Number
                                </Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Enter phone number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label className="form-label">
                                    <FaEnvelope /> Email address
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <div className="button-container">
                                <Button className="button back" color="primary" disabled={activeStep === 0} onClick={handleBack}>
                                    Back
                                </Button>
                                {activeStep !== steps.length - 1 && (
                                    <Button className="button next" variant="contained" color="blue" onClick={handleNext} disabled={!isFormComplete()}>
                                        Next
                                    </Button>
                                )}
                            </div>

                        </Form>
                    </Container>
                );
            case 1:
                return (
                    <Container>
                        <h2 className="mb-4">Upload Images</h2>
                        <Form>
                            <Form.Group controlId="aadharImage">
                                <Form.Label className="form-label">
                                    <FaIdCard /> Upload Aadhar Card Image
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'aadharImage')}
                                />
                            </Form.Group>

                            <Form.Group controlId="panImage">
                                <Form.Label className="form-label">
                                    <FaIdCard /> Upload PAN Card Image
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'panImage')}
                                />
                            </Form.Group>

                            <Form.Group controlId="userPhoto">
                                <Form.Label className="form-label">
                                    <FaCamera /> Capture Live Picture
                                </Form.Label>
                                <Button variant="outline-primary" className="ml-2" onClick={() => handleCaptureImage('userPhoto')}>
                                    Capture
                                </Button>
                                {/* Display the captured image */}
                                {formData.userPhoto && <img src={URL.createObjectURL(formData.userPhoto)} alt="Live" />}
                            </Form.Group>
                            <div className="button-container">
                                <Button className="button back" color="primary" disabled={activeStep === 0} onClick={handleBack}>
                                    Back
                                </Button>
                                {activeStep !== steps.length - 1 && (
                                    <Button className="button next" variant="contained" color="blue" onClick={handleNext} disabled={!isFormComplete()}>
                                        Next
                                    </Button>
                                )}
                            </div>


                        </Form>
                    </Container>

                ); case 2:
                return (
                    <Container>
                        <h2 className="mb-4">Review Details</h2>
                        <p>First Name: {formData.firstName}</p>
                        <p>Last Name: {formData.lastName}</p>
                        <p>Aadhar Card: {formData.aadharCardNumber}</p>
                        <p>PAN Card: {formData.panCardNumber}</p>
                        <p>Date of Birth: {formData.dob}</p>
                        <p>Phone Number: {formData.phoneNumber}</p>
                        <p>Email: {formData.email}</p>
                        <p>Aadhar Card Image: {formData.aadharImage ? 'Uploaded' : 'Not Uploaded'}</p>
                        <p>PAN Card Image: {formData.panImage ? 'Uploaded' : 'Not Uploaded'}</p>
                        <p>Live Image: {formData.userPhoto ? 'Captured' : 'Not Captured'}</p>
                        <div className="button-container">
                            <Button className="button back" color="primary" disabled={activeStep === 0} onClick={handleBack}>
                                Back
                            </Button>

                            <Button className="button next" variant="contained" color="primary" onClick={handleSignUp} >
                            SignUp
                        </Button>
                        </div>

                    </Container>
                );
            case 3:
                return (
                    <Container>
                        <h2 className="mb-4">Success</h2>
                        <p>Your sign-up was successful! Thank you for registering.</p>
                        <p>Please check your email for Login Credentials and use the below link to login</p>
                        <div className="login-link">
                <p><Link to="/login">Log in</Link></p>
            </div>
                    </Container>
                );
            default:
                return null;
        }
    };
    return (
        <Container className="signup-container">
            <h2 className="mb-4">Sign Up</h2>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <form onSubmit={handleSignUp}>
                {renderStepContent()}

            </form>
        </Container>
    );
};

export default SignUpPage;
