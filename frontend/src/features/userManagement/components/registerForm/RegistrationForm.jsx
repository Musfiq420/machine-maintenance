import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faBuilding, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link for navigation

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        companyName: '',
        password: '',
        repassword: ''
    });

    const [isFormComplete, setIsFormComplete] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    // Check if form is complete
    useEffect(() => {
        const isComplete =
            formData.name &&
            formData.email &&
            formData.mobile &&
            formData.companyName &&
            formData.password &&
            formData.repassword;

        setIsFormComplete(isComplete);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // If the form is not complete, trigger the shaking effect
        if (!isFormComplete) {
            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false); // Stop the shaking after animation
            }, 600); // Shaking duration
            return;
        }

        // Submit form data
        console.log(formData);
    };

    return (
        <div className="container mx-auto mt-12 px-4 pb-40">
            {/* Registration Form Box with Border */}
            <div className="max-w-lg mx-auto border-2 border-gray-300 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out p-8 bg-transparent">
                {/* Title */}
                <h2 className="text-center text-3xl font-extrabold text-white mb-6 relative before:content-[''] before:block before:w-16 before:h-1 before:bg-blue-500 before:mx-auto before:mt-4 hover:text-blue-400 transition-colors duration-300 ease-in-out">
                    Registration Form
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div className="form-control relative">
                        <input
                            type="text"
                            id="formName"
                            placeholder="Enter your name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full pl-10 py-2 bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
                    </div>

                    {/* Email Input */}
                    <div className="form-control relative">
                        <input
                            type="email"
                            id="formEmail"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full pl-10 py-2 bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
                    </div>

                    {/* Mobile Number Input */}
                    <div className="form-control relative">
                        <input
                            type="tel"
                            id="formMobile"
                            placeholder="Enter your mobile number"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="input input-bordered w-full pl-10 py-2 bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
                    </div>

                    {/* Company Name Input */}
                    <div className="form-control relative">
                        <input
                            type="text"
                            id="formCompany"
                            placeholder="Enter your company name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="input input-bordered w-full pl-10 py-2 bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <FontAwesomeIcon icon={faBuilding} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
                    </div>

                    {/* Password Input */}
                    <div className="form-control relative">
                        <input
                            type="password"
                            id="formPassword"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input input-bordered w-full pl-10 py-2 bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
                    </div>

                    {/* Re-password Input */}
                    <div className="form-control relative">
                        <input
                            type="password"
                            id="formRePassword"
                            placeholder="Re-enter your password"
                            name="repassword"
                            value={formData.repassword}
                            onChange={handleChange}
                            className="input input-bordered w-full pl-10 py-2 bg-transparent border-gray-300 focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <FontAwesomeIcon icon={faKey} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`btn btn-primary w-full mt-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 ${
                            isShaking ? 'animate-shake' : ''
                        }`}
                        disabled={!isFormComplete}
                    >
                        Register
                    </button>
                </form>

                {/* Already have an account? Prompt */}
                <div className="mt-4 text-center text-white">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link to="/signin" className="text-blue-400 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
