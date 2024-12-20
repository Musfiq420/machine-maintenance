import React from 'react';

const AboutLand = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-700 text-white py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6 text-shadow-lg">
            About Fast Tracker
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Revolutionizing industrial monitoring and workflow optimization with cutting-edge solutions for modern industries.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Fast Tracker, our mission is to empower businesses with actionable insights, enhanced productivity, and real-time tracking capabilities. We strive to create a connected ecosystem that brings transparency and control to every stage of the production process.
          </p>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Services</h2>
          <ul className="list-disc ml-6 space-y-4 text-lg text-gray-600">
            <li>Real-time machine monitoring to track performance and repair needs.</li>
            <li>Production management for scheduling and optimizing workflows.</li>
            <li>Custom dashboards and reports for actionable insights.</li>
            <li>Integrated planning tools like Kanban boards.</li>
          </ul>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-r from-teal-100 to-blue-50 rounded-lg shadow-xl p-8 mb-10">
          <h2 className="text-3xl font-semibold text-teal-800 mb-6">Why Choose Us?</h2>
          <ul className="list-disc ml-6 space-y-4 text-lg text-gray-600">
            <li>Real-Time Tracking: Stay updated on production lines 24/7.</li>
            <li>Customizable Dashboards: Tailored visual data to meet your needs.</li>
            <li>User-Friendly Interface: Intuitive design for seamless navigation.</li>
            <li>Scalable Solutions: Adapts as your business grows.</li>
          </ul>
        </div>

        {/* Meet Our Team Section */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-bold text-gray-800">Engr. Dr. Azim Mohammad</h3>
              <p className="text-gray-500">Director & Lead Consultant</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-bold text-gray-800">Engr. Morshed ul Hasan</h3>
              <p className="text-gray-500">Sr. Manufacturing Consultant</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out">
              <h3 className="text-xl font-bold text-gray-800">Engr. Motiur Rahman</h3>
              <p className="text-gray-500">Sr. Manufacturing Consultant</p>
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
          <p className="text-lg mb-4">
            Have questions? Let’s connect! Reach out to us at:
          </p>
          <ul className="space-y-4">
            <li><strong>Phone:</strong> +880 1816324413</li>
            <li><strong>Email:</strong> contact@fasttracker.com</li>
            <li><strong>Address:</strong> House 85, O.R Nizam Road 7, Chittagong, Bangladesh</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutLand;
  