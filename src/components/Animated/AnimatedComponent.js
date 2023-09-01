import React from 'react';
import './Animated.css'; 
import img2 from '../../assests/mob-woman.webp';
import img1 from '../../assests/mob-sofa.webp';

const AnimatedComponent = () => {
  return (
    <div className="container-fluid gif-padding top-animation">
      <div className="lady-animating floating">
        <img
          alt="banner"
          src={img1}
          className="mob-disp-desk"
        />
        <img
          alt="banner"
          src={img2}
          className="mob-disp"
        />
        
      </div>
      <h1 className="text-below-image">Worry Less, Earn More.</h1>
    </div>
  );
};

export default AnimatedComponent;
