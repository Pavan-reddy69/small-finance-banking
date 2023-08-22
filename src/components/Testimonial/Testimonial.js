import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Testimonial.css';

const TestimonialCarousel = () => {
    const carouselOptions = {
        loop: true,
        margin: 10,
        nav: true, // Add navigation arrows
        dots: false,
        autoplay: true,
        center: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2, // Show 2 testimonials in a slide at viewport width >= 768px
            },
            1024: {
                items: 3, // Show 3 testimonials in a slide at viewport width >= 1024px
            },
        },
    };

    const testimonials = [
        {
            content: "I am truly impressed with the banking services provided by APA Small Finance Bank. Their website is intuitive and user-friendly, allowing me to manage my finances effortlessly.",
            image: "https://static.toiimg.com/imagenext/toiblogs/photo/blogs/wp-content/uploads/2021/05/edit-Kiran-Jonnalagadda.jpg",
            name: "John Smith",
            role: "Accountant",
        },
        {
            content: "Switching to APA Small Finance Bank's services was a game-changer for my business. Their website's seamless experience and exceptional customer service are unmatched.",
            image: "https://i.pinimg.com/564x/6d/27/64/6d2764104d9725290153dea9d0cf7bb8.jpg",
            name: "Emily Johnson",
            role: "Small Business Owner",
        },
        {
            content: "I've entrusted my investments to APA Small Finance Bank for years. Their website's transparency and diverse investment options have been instrumental in growing my savings.",

            image: "https://media.istockphoto.com/id/1265040892/photo/portrait-of-young-indian-ethnicity-man.jpg?s=170667a&w=0&k=20&c=9JTD5p0uSB6cUk4m7Ghm6m4go-JofLqVQ6kOQY77xRs=",
            name: "Michael Williams",
            role: "Investor",
        },
        {
            content: "APA Small Finance Bank's website is my financial companion. Its mobile app ensures I have full control over my money, offering a secure and convenient banking experience.",
            image: "https://cloudfront.penguin.co.in/wp-content/uploads/2018/06/Indian-Instincts_Header-scaled.jpg",
            name: "Sarah Davis",
            role: "Freelancer",
        },
        {
            content: "Safety is paramount to me, and that's why I trust APA Small Finance Bank's website for my transactions. Their commitment to data security gives me peace of mind.",
            image: "https://arborrising.org/wp-content/uploads/2016/10/random-indian-kid-cropped-2.jpg",
            name: "David Martinez",
            role: "IT Professional",
        },
        {
            content: "I found my dream home with the help of APA Small Finance Bank's mortgage services. Their website guided me through the process, making homeownership a reality.",
            image: "https://www.kamat.com/kalranga/women/fair_sex/2807.jpg",
            name: "Jessica Brown",
            role: "Homeowner",
        },
        {
            content: "I've experienced top-notch support from APA Small Finance Bank's team. They're quick to address my inquiries, providing effective solutions through their website.",
            image: "https://yt3.googleusercontent.com/ECfB_qErdAVkaFhIM2g1is-kxMg2U16hc-9PJyry8AqX4IvzSuXBasJuix1yNKkbgxK2WgZPKg=s900-c-k-c0x00ffffff-no-rj",
            name: "Christopher Lee",
            role: "Entrepreneur",
        },
        {
            content: "As a student, I rely on APA Small Finance Bank's student banking services. Their website's convenience and low fees cater perfectly to my financial needs.",
            image: "https://i.pinimg.com/564x/6d/27/64/6d2764104d9725290153dea9d0cf7bb8.jpg",
            name: "Amanda Turner",
            role: "Student",
        },
    ];


    return (
        <div className="testimonial5 py-4 bg-inverse"> {/* Adjust the padding */}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h3 className="mb-3 text-white">Few Words from our Valuable Customers</h3>
                        <h6 className="subtitle font-weight-normal">
                            You can rely on our amazing features list and also our customer services will be a great experience for you without a doubt and in no time
                        </h6>
                    </div>
                </div>
                <OwlCarousel className="owl-carousel owl-theme testi5 mt-4 text-center" {...carouselOptions}>
                    {testimonials.map((testimonial, index) => (
                        <div className="item" key={index}>
                            <div className="content">{testimonial.content}</div>
                            <div className="customer-thumb">
                                <img src={testimonial.image} alt="wrapkit" className="rounded-circle" />
                                <h6 className="text-white mb-0">{testimonial.name}</h6>
                                <p>{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </OwlCarousel>
            </div>
        </div>
    );
};

export default TestimonialCarousel;
