import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add the logic for submitting the email (e.g., API call)
        setIsSubmitted(true);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white text-center mb-6">
                    Forgot Your Password?
                </h2>
                {isSubmitted ? (
                    <div className="text-center text-white">
                        <p>A password reset link has been sent to your email address.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-white mb-2">
                                Enter your email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Send Reset Link
                            </button>
                        </div>
                        <div className="text-center">
                            <p className="text-white text-sm">
                                Remember your password?{' '}
                                <a href="/signin" className="text-green-500 hover:underline">
                                    Log in here
                                </a>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;