import React from 'react';

const HomeLand = () => {
    return (
        <div>
            <div>
                <section
                    className="hero py-20 text-center text-white"
                    style={{
                        backgroundImage: "url('https://source.unsplash.com/1920x1080/?technology,productivity')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="container mx-auto">
                        <h1 className="text-6xl font-extrabold mb-4">Welcome to Fast Tracker</h1>
                        <p className="text-lg mb-6">
                            Your one-stop solution for managing productivity with ease.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button className="btn btn-primary px-8 py-3 text-lg shadow-lg hover:bg-blue-700">
                                Get Started
                            </button>
                            <button className="btn btn-outline px-8 py-3 text-lg shadow-lg hover:text-blue-700">
                                Learn More
                            </button>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features py-16 bg-gray-50">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-8">Our Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {["Feature 1", "Feature 2", "Feature 3"].map((feature, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform"
                                >
                                    <div className="text-6xl text-blue-500 mb-4">
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{feature}</h3>
                                    <p className="text-gray-600">
                                        Discover how {feature} can enhance your experience.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call-to-Action Section */}
                <section className="cta py-16 bg-blue-500 text-white text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="mb-6 text-lg">
                        Join thousands of users who trust Fast Tracker to boost their
                        productivity.
                    </p>
                    <button className="btn btn-lg btn-primary px-10 py-4 text-xl shadow-lg hover:bg-blue-700">
                        Sign Up Now
                    </button>
                </section>
            </div>
        </div>
    );
};

export default HomeLand;