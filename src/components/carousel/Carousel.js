import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Carousel } from 'react-bootstrap';
import './Carousel.css'; 

import image3 from '../../assests/newproductpage-activmoney-d.jpg';
import image2 from '../../assests/Screenshot 2023-08-26 231914.png';
import image1 from '../../assests/bank.png';

const SimpleCarousel = () => {
  const images = [image1, image2, image3];

  return (
    <div className='simple-carousel'>
      <Carousel className='custom-carousel' wrap={true}>
        {images.map((image, index) => (
          <Carousel.Item className="carousel-item" interval={5000} key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Image ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default SimpleCarousel;
