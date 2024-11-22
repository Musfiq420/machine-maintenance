import React from 'react';

const AboutLand = () => {
  return (
    <div className="bg-gray-100">
      <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Fast Tracker</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Revolutionizing industrial monitoring and workflow optimization with cutting-edge solutions for modern industries.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Our Mission */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p>
            At Fast Tracker, our mission is to empower businesses with actionable insights, enhanced productivity, and real-time tracking capabilities. We strive to create a connected ecosystem that brings transparency and control to every stage of the production process.
          </p>
        </div>

        {/* Our Services */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Services</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>Real-time machine monitoring to track performance and repair needs.</li>
            <li>Production management for scheduling and optimizing workflows.</li>
            <li>Custom dashboards and reports for actionable insights.</li>
            <li>Integrated planning tools like Kanban boards.</li>
          </ul>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Why Choose Us?</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>Real-Time Tracking: Stay updated on production lines 24/7.</li>
            <li>Customizable Dashboards: Tailored visual data to meet your needs.</li>
            <li>User-Friendly Interface: Intuitive design for seamless navigation.</li>
            <li>Scalable Solutions: Adapts as your business grows.</li>
          </ul>
        </div>

        {/* Meet Our Team */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-bold">Engr. Dr. Azim Mohammad</h3>
              <p>Director & Lead Consultant</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold">Engr. Morshed ul Hasan</h3>
              <p>Sr. Manufacturing Consultant</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold">Engr. Motiur Rahman</h3>
              <p>Sr. Manufacturing Consultant</p>
            </div>
          </div>
        </div>

        {/* Contact Us */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p>Have questions? Let’s connect! Reach out to us at:</p>
          <ul className="mt-4 space-y-2">
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