import React from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Example icon, install 'react-icons' if not installed.

const CompleteStatus = () => {
  return (
    <div className="">
      {/* Dropdown */}
      <div className="mb-6">
        <select
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 shadow-sm hover:border-blue-400 transition-colors"
        >
          <option>Select Block</option>
          <option>Block A</option>
          <option>Block B</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 flex flex-col space-y-2">
          <h2 className="text-sm text-gray-500 font-semibold">Total Lost Time</h2>
          <p className="text-2xl font-bold text-gray-800">2:13 hrs</p>
          <div className="flex items-center space-x-1 text-green-600 text-sm">
            <FaArrowUp />
            <span>+5.9%</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 flex flex-col space-y-2">
          <h2 className="text-sm text-gray-500 font-semibold">Total Machines</h2>
          <p className="text-2xl font-bold text-gray-800">431</p>
          <div className="flex items-center space-x-1 text-green-600 text-sm">
            <FaArrowUp />
            <span>+5.9%</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 flex flex-col space-y-2">
          <h2 className="text-sm text-gray-500 font-semibold">Active</h2>
          <p className="text-2xl font-bold text-gray-800">420</p>
          <div className="flex items-center space-x-1 text-green-600 text-sm">
            <FaArrowUp />
            <span>+5.9%</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 flex flex-col space-y-2">
          <h2 className="text-sm text-gray-500 font-semibold">Repairing</h2>
          <p className="text-2xl font-bold text-gray-800">12</p>
          <div className="flex items-center space-x-1 text-green-600 text-sm">
            <FaArrowUp />
            <span>+5.9%</span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 flex flex-col space-y-2">
          <h2 className="text-sm text-gray-500 font-semibold">Idle</h2>
          <p className="text-2xl font-bold text-gray-800">11</p>
          <div className="flex items-center space-x-1 text-green-600 text-sm">
            <FaArrowUp />
            <span>+5.9%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteStatus;
