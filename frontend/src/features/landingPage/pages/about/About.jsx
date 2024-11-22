import React from 'react';
import Navbar from '../../../../shared/components/navbar/Navbar';
import AboutLand from '../../components/aboutLand/AboutLand';
import Footer from '../../../../shared/components/footer/Footer';

const About = () => {
    return (
        <div>
            <Navbar></Navbar>
            <AboutLand></AboutLand>
            <Footer></Footer>
        </div>
    );
};

export default About;