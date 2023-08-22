import React from "react";
import Header from "../../components/Header/Header";
import SimpleCarousel from "../../components/carousel/Carousel";
import Testimonials from "../../components/Testimonial/Testimonial";
import AboutSection from "../../components/About/About";
import "./Home.css"; // Make sure to import the CSS file for this component
import Services from "../../components/Services/Services";

const Home = () => {
  return (
    <div>
      <Header />
      <SimpleCarousel />
      <div className="marquee-container">
        <p className="marquee">
          Limited Time Offer: APA Bank offers the highest interest rate!{" "}
          <a href="/login">Login</a> now to secure your savings.
        </p>
      </div>

      <Services/>
      <AboutSection />
      <Testimonials />
    </div>
  );
};

export default Home;
    