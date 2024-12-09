import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // For navigation

const SignInForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign In Data:', formData);
    };

    return (
        <div className="container mx-auto mt-12 px-4 pb-40">
            {/* Sign In Form Box with Border */}
            <div className="max-w-lg mx-auto border-2 border-gray-300 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out p-8 bg-transparent">
                {/* Title */}
                <h2 className="text-center text-3xl font-extrabold text-white mb-6 relative before:content-[''] before:block before:w-16 before:h-1 before:bg-blue-500 before:mx-auto before:mt-4 hover:text-blue-400 transition-colors duration-300 ease-in-out">
                    Sign In
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary w-full mt-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300"
                        disabled={!formData.email || !formData.password}
                    >
                        Sign In
                    </button>
                </form>

                {/* Additional Links */}
                <div className="mt-4 text-center text-white">
                    <Link to="/forgot-password" className="text-blue-400 hover:underline">
                        Forgot Password?
                    </Link>
                    <p className="mt-2">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-blue-400 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
