import React from 'react';
import SignInForm from "../components/SignInForm";
import Navbar from '../../../shared/components/navbar/Navbar';
import Footer from '../../../shared/components/footer/Footer';


const SignInPage = () => {
    return (
        <div>
            <div>
            <Navbar/>
            <div className="mt-8"> {/* Add margin-top */}
                <SignInForm/>
            </div>
            <Footer/>
        </div>
        </div>
    );
};

export default SignInPage;