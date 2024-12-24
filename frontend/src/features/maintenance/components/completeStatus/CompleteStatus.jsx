// src/shared/components/CompleteStatus/CompleteStatus.jsx

import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaQuestionCircle } from 'react-icons/fa';
import { getApiUrl } from '../../../../shared/components/getApiUrl';

const CompleteStatus = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Dropdown state (if blocks are to be implemented in future)
  const [selectedBlock, setSelectedBlock] = useState('Block A');

  // API URL
  const Machine_QR_Data_API = getApiUrl('Machine_QR_Data_API'); // Ensure this function returns the correct API URL

  // Fetch machine data from API
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        setLoading(true);
        const response = await fetch(Machine_QR_Data_API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMachines(data); // Assuming API returns an array of machine objects
        setLoading(false);
      } catch (error) {
        console.error('Error fetching machines:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchMachines();
  }, [Machine_QR_Data_API]);

  // Compute statistics based on machine data
  const computeStats = () => {
    const totalMachines = machines.length;
    const running = machines.filter(machine => machine.status?.toLowerCase() === 'running').length;
    const broken = machines.filter(machine => machine.status?.toLowerCase() === 'broken').length;
    const underMaintenance = machines.filter(machine => machine.status?.toLowerCase() === 'under maintenance').length;
    const idle = machines.filter(machine => !['running', 'broken', 'under maintenance'].includes(machine.status?.toLowerCase())).length;

    // Placeholder for Total Lost Time (you might need to calculate based on actual data)
    const totalLostTime = "2:13 hrs"; // Replace with actual computation if available

    return {
      totalLostTime,
      totalMachines,
      active: running,
      repairing: broken,
      idle,
    };
  };

  const stats = computeStats();

  // Determine color and icon based on change (placeholder values)
  const getChangeStyles = () => ({
    color: 'text-green-600',
    icon: <FaArrowUp />,
    percentage: '+5.9%',
  });

  const changeStyles = getChangeStyles();

  return (
    <div className="bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6 min-h-screen">
      {/* Dropdown for Block Selection */}
      <div className="mb-6">
        <label htmlFor="block-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Block
        </label>
        <select
          id="block-select"
          value={selectedBlock}
          onChange={(e) => setSelectedBlock(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500 hover:border-blue-400 transition-colors"
          aria-label="Select Block"
        >
          <option>Select Block</option>
          <option>Block A</option>
          <option>Block B</option>
        </select>
      </div>

      {/* Loading and Error States */}
      {loading && <p className="text-center text-gray-500">Loading machines...</p>}
      {error && <p className="text-center text-red-500">Error loading machines. Please try again later.</p>}

      {/* Machine Status Content */}
      {!loading && !error && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800 tracking-wide">Block A</h2>
            <div className="flex space-x-4 text-sm">
              {/* Status Indicators */}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-700">Running</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-700">Under Maintenance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-700">Broken</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
            {/* Total Lost Time */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
              <h2 className="text-sm text-gray-500 font-semibold">Total Lost Time</h2>
              <p className="text-2xl font-bold text-gray-800">{stats.totalLostTime}</p>
              <div className={`flex items-center space-x-1 ${changeStyles.color} text-sm`}>
                {changeStyles.icon}
                <span>{changeStyles.percentage}</span>
              </div>
            </div>

            {/* Total Machines */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
              <h2 className="text-sm text-gray-500 font-semibold">Total Machines</h2>
              <p className="text-2xl font-bold text-gray-800">{stats.totalMachines}</p>
              <div className={`flex items-center space-x-1 ${changeStyles.color} text-sm`}>
                {changeStyles.icon}
                <span>{changeStyles.percentage}</span>
              </div>
            </div>

            {/* Active */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
              <h2 className="text-sm text-gray-500 font-semibold">Active</h2>
              <p className="text-2xl font-bold text-gray-800">{stats.active}</p>
              <div className={`flex items-center space-x-1 ${changeStyles.color} text-sm`}>
                {changeStyles.icon}
                <span>{changeStyles.percentage}</span>
              </div>
            </div>

            {/* Repairing */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
              <h2 className="text-sm text-gray-500 font-semibold">Repairing</h2>
              <p className="text-2xl font-bold text-gray-800">{stats.repairing}</p>
              <div className={`flex items-center space-x-1 ${changeStyles.color} text-sm`}>
                {changeStyles.icon}
                <span>{changeStyles.percentage}</span>
              </div>
            </div>

            {/* Idle */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
              <h2 className="text-sm text-gray-500 font-semibold">Idle</h2>
              <p className="text-2xl font-bold text-gray-800">{stats.idle}</p>
              <div className={`flex items-center space-x-1 ${changeStyles.color} text-sm`}>
                {changeStyles.icon}
                <span>{changeStyles.percentage}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteStatus;
