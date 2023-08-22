import React from 'react';
import './About.css'; // Import your custom CSS file
import about from '../../assests/petal_icon_2.png'
const AboutSection = () => {
    return (
        <section className="section about-section">
            <div className="container">
                <div className="about-left-box hideme showme slide-to-left">
                    <h2 className="heading02">
                        <i className="abt-icon">
                            <img alt="About Us" src={about} />
                        </i>
                        <span>
                            <strong>About</strong> us
                        </span>
                    </h2>
                    <ul className="abt-list">
                        <li>Present Across <strong>24</strong> States/Union Territory.</li>
                        <li><strong>248</strong> Districts.</li>
                        <li><strong>66</strong> Lakh Customer Base.</li>
                        <li><strong>629+</strong> Banking Touchpoints.</li>
                        <li><strong>16,664</strong>&nbsp;Employee Strength.</li>
                    </ul>
                </div>

                <div className="abt-right-box hideme showme slide-to-right">
                    <p>
                        APA Small Finance Bank Limited is a mass market focused bank in India, catering to financially unserved and under-served segments and committed to building financial inclusion in the country. Our Promoter, APA Financial Services Limited (APAFSL), commenced operations as an NBFC in 2005 with the mission to provide a full range of financial services to the ‘economically active poor’ who were not adequately served by financial institutions.
                    </p>
                </div>

                <div className="clear"></div>
            </div>
        </section>
    );
};

export default AboutSection;
