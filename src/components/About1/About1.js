import React from 'react';
import './About1.css'; // Import your custom CSS file

const About1 = () => {
    return (
        <div className="container mobFullwidth">
          <div className="row">
            <div className="col-sm-6">
              <div className="sec-content">
                <h2 className="Bank">
                  World's best digital bank,
                  <br className="mobile-disp-hide" />
                  <span className="Bank1" style={{color:'#ff3333'}}> now in your neighborhood</span>
                </h2>
                
                <div className="row">
                  <div className="col-sm-4 col-4">
                    <p align="center">
                      <img src="https://www.dbs.com/in/iwov-resources/media/images/home/home-revamp/asia_finest.png" alt="Asia's Safest Bank" />
                    </p>
                    <p align="center" style={{ color: '#2e2e2e' }}>
                      Asia's<br />
                      Safest Bank
                    </p>
                  </div>
                  <div className="col-sm-4 col-4 col-right-left-border1">
                    <p align="center">
                      <img src="https://www.dbs.com/in/iwov-resources/media/images/home/home-revamp/world_best.png" alt="World's Best Bank" />
                    </p>
                    <p align="center" style={{ color: '#2e2e2e' }} className="">
                      World's<br />
                      Best Bank
                    </p>
                  </div>
                  <div className="col-sm-4 col-4">
                    <p align="center" className="">
                      <img src="https://www.dbs.com/in/iwov-resources/media/images/home/home-revamp/worlds-best-digital-bank-icons.png" alt="Presence across 350+ cities" className="" />
                    </p>
                    <p align="center" style={{ color: '#2e2e2e' }}>
                      Presence across<br />
                      350+ cities
                    </p>
                  </div>
                </div>
                
                <p className="Bank2" style={{paddingLeft:'40px'}}>
                  World’s Best Digital Bank, now in your city. Get ready to enjoy an experience like never before with APA!
                </p>
                
              </div>
            </div>
            <div className="col-sm-6">
              <div className="sec-photo2 text-center">
                <iframe
                  className="dbs-video"
                  src="https://www.youtube.com/embed/kIBfqRnZ6gY?enablejsapi=1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen=""
                  data-gtm-yt-inspected-10="true"
                  id="widget2"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      );
};

export default About1;
