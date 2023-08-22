import React from "react";
import "./Services.css"; // Make sure to create and import the CSS file for this component

const Services = () => {
  const services = [
    {
      title: "Higher Interest Rates",
      description:
        "We offer competitive interest rates on savings accounts, helping you grow your money faster.",
    },
    {
      title: "24/7 Customer Support",
      description:
        "Our dedicated customer support team is available around the clock to assist you with any queries or concerns.",
    },
    {
      title: "Wide Range of Services",
      description:
        "From personal loans to investment options, we provide a comprehensive suite of financial services tailored to your needs.",
    },
    {
      title: "Advanced Security",
      description:
        "Your financial security is our priority. We employ cutting-edge security measures to safeguard your transactions and data.",
    },
    {
      title: "Mobile Banking",
      description:
        "Manage your finances on the go with our user-friendly mobile banking app, available on all major platforms.",
    },
    {
      title: "Transparent Fees",
      description:
        "We believe in transparency. Our fee structure is straightforward, with no hidden charges or surprises.",
    },
  ];

  return (
    <div className="better-services">
      <h2>Why Our Bank Services Are Better</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
