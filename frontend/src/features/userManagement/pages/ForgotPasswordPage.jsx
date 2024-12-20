import React from 'react';
import Navbar from '../../../shared/components/navbar/Navbar';
import Footer from '../../../shared/components/footer/Footer';
import ForgotPassword from '../components/ForgotPassword';


const ForgotPasswordPage = () => {
    return (
        <div>
            <div>
            <Navbar/>
            <div className="mt-8"> {/* Add margin-top */}
                <ForgotPassword/>
            </div>
            <Footer/>
        </div>
        </div>
    );
};

export default ForgotPasswordPage;