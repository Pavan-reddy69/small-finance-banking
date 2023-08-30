import React from "react";
import Header from "../../components/Header/Header";
import Testimonials from "../../components/Testimonial/Testimonial";
import AboutSection from "../../components/About/About";
import "./Home.css"; // Make sure to import the CSS file for this component
import Services from "../../components/Services/Services";
import About1 from "../../components/About1/About1";
import AnimatedComponent from "../../components/Animated/AnimatedComponent";
const Home = () => {
  return (
    <div className="hom">
      <Header />
      <AnimatedComponent />
      <div className="marquee-container">
        <p className="marquee">
          Limited Time Offer: APA Bank offers the highest interest rate!{" "}
          <a href="/login">Login</a> now to secure your savings.
        </p>
      </div>
  <About1/>
      <Services/>
      <AboutSection />
      <Testimonials />
    </div>
  );
};

export default Home;
    