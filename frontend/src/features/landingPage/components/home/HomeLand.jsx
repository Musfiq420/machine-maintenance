import React from 'react';

const HomeLand = () => {
    return (
        <div className="font-sans text-gray-900">
            <style>
            {`
            @keyframes waveBob {
              0% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0); }
            }
            `}
            </style>

            {/* Hero Section */}
            <section
                className="relative flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat text-white"
                style={{
                    backgroundImage: "url('https://source.unsplash.com/1920x1080/?garment,factory')"
                }}
            >
                {/* Dark Overlay with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-800 to-transparent opacity-75"></div>
                
                <div className="relative z-10 text-center p-8 max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                        Accelerate Your Garment Production with <span className='text-lime-400'>PanaMach</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8">
                        Transform your supply chain from threading to dispatch with powerful real-time insights and analytics.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <a href="/get-started">
                            <button className="px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded shadow-lg transition duration-200">
                                Get Started
                            </button>
                        </a>
                        <a href="/about">
                            <button className="px-8 py-3 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 rounded shadow-lg transition duration-200">
                                Learn More
                            </button>
                        </a>
                    </div>
                </div>

                {/* Decorative Wavy Divider */}
                <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
                    <svg className="block w-full h-16 text-white" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="currentColor" d="M0,128L80,154.7C160,181,320,235,480,234.7C640,235,800,181,960,181.3C1120,181,1280,235,1360,261.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-10">Key Features</h2>
                    <p className="max-w-2xl mx-auto mb-12 text-gray-600">
                        Our platform is built to enhance every step of your garment production journey.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="p-8 bg-white rounded-lg shadow hover:shadow-xl transition-transform transform hover:-translate-y-1">
                            <div className="text-5xl text-blue-600 mb-4">
                                <i className="fas fa-tshirt"></i>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Production Tracking</h3>
                            <p className="text-gray-600">
                                Monitor stages of production in real-time and ensure timely deliveries.
                            </p>
                        </div>
                        <div className="p-8 bg-white rounded-lg shadow hover:shadow-xl transition-transform transform hover:-translate-y-1">
                            <div className="text-5xl text-blue-600 mb-4">
                                <i className="fas fa-chart-line"></i>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Efficiency Analytics</h3>
                            <p className="text-gray-600">
                                Gain insights into performance and optimize resources for maximum output.
                            </p>
                        </div>
                        <div className="p-8 bg-white rounded-lg shadow hover:shadow-xl transition-transform transform hover:-translate-y-1">
                            <div className="text-5xl text-blue-600 mb-4">
                                <i className="fas fa-box-open"></i>
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">Inventory Control</h3>
                            <p className="text-gray-600">
                                Manage fabrics, trims, and finished goods inventory seamlessly.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Divider */}
                <div className="absolute inset-x-0 bottom-0 overflow-hidden leading-[0]">
                    <svg className="block w-full h-16 text-gray-50 rotate-180" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="currentColor" d="M0,320L80,266.7C160,213,320,107,480,96C640,85,800,171,960,170.7C1120,171,1280,85,1360,42.7L1440,0L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                    </svg>
                </div>
            </section>

            {/* Full Screen Video Section with Wavy Dividers and Vertical Animation */}
            <section className="relative h-screen w-full overflow-hidden bg-black">
                {/* Video Background */}
                <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/z6v67BgcVy4?autoplay=1&mute=1&loop=1&playlist=z6v67BgcVy4&controls=0&showinfo=0&modestbranding=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                ></iframe>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70"></div>
                
                {/* Top Wavy Divider */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg 
                        className="block w-full h-20 text-white"
                        style={{ animation: 'waveBob 15s ease-in-out infinite' }}
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >
                        <path fill="currentColor" d="M0,192L80,181.3C160,171,320,149,480,133.3C640,117,800,107,960,133.3C1120,160,1280,224,1360,256L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                    </svg>
                </div>
                
                {/* Bottom Wavy Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg 
                        className="block w-full h-20 text-white rotate-180"
                        style={{ animation: 'waveBob 20s ease-in-out infinite' }}
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >
                        <path fill="currentColor" d="M0,96L80,122.7C160,149,320,203,480,208C640,213,800,171,960,144C1120,117,1280,107,1360,112L1440,117.3L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                    </svg>
                </div>
                
                {/* Content Container */}
                <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">
                            Immerse in the Production Line
                        </h2>
                        <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-sm">
                            Experience the process from thread to final stitch, seeing how every step aligns
                            to create products of unparalleled quality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-blue-50 relative">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-8">What Our Clients Say</h2>
                    <p className="mb-12 max-w-xl mx-auto text-gray-700">
                        Don’t just take our word for it. Hear from the manufacturers who trust us to streamline their garment production.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded shadow hover:shadow-lg transition duration-200">
                            <div className="flex justify-center mb-4">
                                <img src="https://via.placeholder.com/60" alt="Client A" className="rounded-full" />
                            </div>
                            <p className="text-gray-700 italic mb-4">
                                "FastTracker transformed our process. Our efficiency soared by 30% in just three months."
                            </p>
                            <h4 className="text-lg font-semibold">- Mary J., Apparel Co.</h4>
                        </div>
                        <div className="bg-white p-8 rounded shadow hover:shadow-lg transition duration-200">
                            <div className="flex justify-center mb-4">
                                <img src="https://via.placeholder.com/60" alt="Client B" className="rounded-full" />
                            </div>
                            <p className="text-gray-700 italic mb-4">
                                "Complete visibility into our inventory means quicker decisions and less downtime."
                            </p>
                            <h4 className="text-lg font-semibold">- Daniel R., StitchWorks</h4>
                        </div>
                        <div className="bg-white p-8 rounded shadow hover:shadow-lg transition duration-200">
                            <div className="flex justify-center mb-4">
                                <img src="https://via.placeholder.com/60" alt="Client C" className="rounded-full" />
                            </div>
                            <p className="text-gray-700 italic mb-4">
                                "The analytics tools are a game-changer. We’re constantly improving our workflows."
                            </p>
                            <h4 className="text-lg font-semibold">- Amina S., FashionLine</h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="py-20 bg-blue-600 text-white text-center">
                <h2 className="text-4xl font-bold mb-4">Supercharge Your Production Today</h2>
                <p className="mb-8 text-lg max-w-2xl mx-auto">
                    Join industry leaders who rely on FastTracker to surpass their production targets, reduce costs, and deliver on time.
                </p>
                <a href="/signup">
                    <button className="px-10 py-4 text-xl font-semibold bg-white text-blue-600 rounded shadow hover:bg-gray-100 transition duration-200">
                        Sign Up Now
                    </button>
                </a>
            </section>
        </div>
    );
};

export default HomeLand;
