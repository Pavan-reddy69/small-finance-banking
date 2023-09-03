import React from "react";
import "./Services.css";
import i1 from '../../assests/s1.webp'
import i2 from '../../assests/s2.webp'
import i3 from '../../assests/s3.webp'
import i4 from '../../assests/s4.webp'
import i5 from '../../assests/s5.webp'
import i6 from '../../assests/s6.webp'




const Services = () => {
  const services = [
    {
      title: "Higher Interest Rates",
      description:
        "We offer competitive interest rates on savings accounts, helping you grow your money faster.",
        image: i4
    },
    {
      title: "Quick Approval",
      description:
        "Get swift and hassle-free financial approvals with our 24/7 customer support.",
        image: i3
    },
    {
      title: "Wide Range of Services",
      description:
        "From personal loans to investment options, we provide a comprehensive suite of financial services tailored to your needs.",
        image: i2
      },
    {
      title: "Advanced Security",
      description:
        "Your financial security is our priority. We employ cutting-edge security measures to safeguard your transactions and data.",
        image: i5
      },
    {
      title: "Quick & Easy",
      description:
        "Streamline your banking with our 'Quick and Easy' service for hassle-free transactions and financial management.",
        image: i1
    },
    {
      title: "Transparent Fees",
      description:
        "We believe in transparency. Our fee structure is straightforward, with no hidden charges or surprises.",
        image: i6
      },
  ];

  return (
    <div className="better-services">
      <h2>Why People Choose Us</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
             <img className = "service-card-image" src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
