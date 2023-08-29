import React from 'react';
import './About.css'; 
import about from '../../assests/petal_icon_2.png'
import { Link } from 'react-router-dom';
const AboutSection = () => {
    return (
        <div class="row">
            <div class="col-sm-5">
                <div class="sec-content">
                    <h2>
                        Interest rate so good,<br class="mobile-disp-hide" />
                        <span> it will always be on your mind!</span>
                    </h2>
                    <div class="row">
                        <div class="col-sm-3 col-3">
                            <p>
                                <img src="https://www.dbs.com/in/iwov-resources/media/images/deposit/fd-rd/Icons_83x82_5.png" alt="7.50%* p.a. interest on Fixed Deposits" />
                            </p>
                        </div>
                        <div class="col-sm-9 col-9">
                            <p class="pt-4 mTop-32" style={{ color: " #2e2e2e" }}>
                                8.50%* p.a. interest  on Fixed Deposits

                            </p>
                        </div>




                    </div>
                    <p>
                        Why should only the finance nerds have all the fun and high
                        returns? All you have to do is invest your money and go do your
                        thing, while DBS takes care of the rest.
                    </p>



                    <p class="py-4">
                    <Link to="/login" className="download-btn">Open a Fixed Deposit</Link>
                    </p>
                </div>
            </div>
            <div class="col-sm-7 desktop-view">
                <div class="sec-photo text-center">
                <iframe className='dbs-video' src="https://www.youtube.com/embed/trZWFEaSLkA" title="Bank of India Fixed deposit interest rates||May 2023||Get upto 8.50% interest rates 2023" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

                </div>
            </div>

           

        </div>
    );
};

export default AboutSection;
