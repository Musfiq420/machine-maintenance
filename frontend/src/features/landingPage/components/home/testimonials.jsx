import { Slideshow } from "@mui/icons-material";
import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import Slider from "react-slick";
import TestimonialCard from "../../../../shared/components/ui/testimonialCard";

export default function Testimonials() {
  const logoSettings = {
    dots: false,
    infinite: true,
    cssEase: "linear",
    autoplaySpeed: 0,
    autoplay: true,
    pauseOnHover: false,
    speed: 2000,
    arrows: false,
    autoPlay: true,
    initialSlide: 0,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const testimonialSettings = {
    dots: false,
    infinite: true,
    cssEase: "linear",
    autoplaySpeed: 0,
    autoplay: true,
    pauseOnHover: false,

    speed: 6000,
    arrows: false,
    autoPlay: true,
    initialSlide: 0,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const testimonials = [
    {
      client_name: "Emily Carter",
      company_name: "StyleTech Garments",
      job_position: "Operations Manager",
      testimonial:
        "This software has transformed our production process, saving time and reducing errors significantly. It's an essential tool for our business.",
    },
    {
      client_name: "Rajesh Patel",
      company_name: "Elite Apparel Co.",
      job_position: "Managing Director",
      testimonial:
        "The integration capabilities and real-time tracking features are phenomenal. It’s been a game-changer for our multi-unit operations.",
    },
    {
      client_name: "Sara Gomez",
      company_name: "TrendSet Clothing",
      job_position: "Quality Assurance Head",
      testimonial:
        "Thanks to this software, we’ve achieved unparalleled efficiency in quality control and reporting. Highly recommended!",
    },
    {
      client_name: "David Lee",
      company_name: "FashionFlow",
      job_position: "CEO",
      testimonial:
        "A seamless and intuitive platform that meets all our garment manufacturing needs. The support team is also incredibly responsive.",
    },
    {
      client_name: "Fatima Ahmed",
      company_name: "Couture Works Ltd.",
      job_position: "Production Supervisor",
      testimonial:
        "The real-time production tracking feature has given us better control and visibility. It’s a must-have for any manufacturer.",
    },
    {
      client_name: "Tom Benson",
      company_name: "NextWear Inc.",
      job_position: "Supply Chain Manager",
      testimonial:
        "The inventory management module is outstanding. It has helped us optimize our stock levels and reduce wastage.",
    },
    {
      client_name: "Liam Nguyen",
      company_name: "ChicCraft Studios",
      job_position: "Founder",
      testimonial:
        "Customizable and user-friendly, this software has perfectly adapted to our specific workflows. It’s been a fantastic investment.",
    },
    {
      client_name: "Monica Silva",
      company_name: "Urban Vogue Ltd.",
      job_position: "Design Lead",
      testimonial:
        "It’s amazing how this software integrates every aspect of manufacturing, making our operations smooth and efficient.",
    },
    {
      client_name: "Carlos Mendez",
      company_name: "Global Fashions",
      job_position: "Operations Director",
      testimonial:
        "The data insights and analytics have helped us make smarter, more strategic decisions. Highly impressed with the results!",
    },
    {
      client_name: "Anna White",
      company_name: "PureThreads",
      job_position: "HR Manager",
      testimonial:
        "The training and support provided were excellent, ensuring our team could maximize the software’s benefits from day one.",
    },
  ];

  const logos = [
    "images/logo-1.png",
    "images/logo-2.png",
    "images/logo-3.png",
    "images/logo-4.png",
    "images/logo-5.png",
    "images/logo-6.png",
    "images/logo-8.png",
    "images/logo-9.png",
    "images/logo-10.png",
    "images/logo-11.png",
  ];

  return (
    <div className="my-20 flex flex-col gap-12">
      <div className="font-semibold text-center text-black lg:text-4xl text-lg">
        What our Clients say About Us
      </div>
      <div className="flex w-4/5 mx-auto justify-between">
        {logos.slice(0, 6).map((logo, index) => (
          <div className="grayscale flex justify-center items-center w-full   ">
            <img
              src={logo}
              alt=""
              className="object-contain   h-20  mx-auto "
            />
          </div>
        ))}
      </div>

      <Slider rtl={true} {...testimonialSettings}>
        {testimonials.slice(0, 6).map((testimonial, index) => (
          <TestimonialCard
            client_name={testimonial.client_name}
            company_name={testimonial.company_name}
            job_position={testimonial.job_position}
            testimonial={testimonial.testimonial}
          />
        ))}
      </Slider>
      <Slider rtl={false} {...testimonialSettings}>
        {testimonials.slice(6, -1).map((testimonial, index) => (
          <TestimonialCard
            client_name={testimonial.client_name}
            company_name={testimonial.company_name}
            job_position={testimonial.job_position}
            testimonial={testimonial.testimonial}
          />
        ))}
      </Slider>
    </div>
  );
}
