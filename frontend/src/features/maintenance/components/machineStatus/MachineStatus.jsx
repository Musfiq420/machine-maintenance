// src/shared/components/MachineStatus/MachineStatus.jsx

import React, { useState, useEffect } from 'react';
import PieChartComponent from '../../../../shared/components/pieChart/PieChart';
import { getApiUrl } from '../../../../shared/components/getApiUrl';
import { FaArrowUp, FaArrowDown, FaQuestionCircle } from 'react-icons/fa'; // Icons for status indicators

const MachineStatus = () => {
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

  // Determine colors based on machine status
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'running':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          indicatorColor: 'bg-green-500',
          icon: <FaArrowUp />,
        };
      case 'broken':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          indicatorColor: 'bg-red-500',
          icon: <FaArrowDown />,
        };
      case 'under maintenance':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-700',
          indicatorColor: 'bg-yellow-500',
          icon: <FaQuestionCircle />,
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          indicatorColor: 'bg-gray-500',
          icon: <FaQuestionCircle />,
        };
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6 min-h-screen">
      {/* Dropdown for Block Selection */}
      <div className="mb-6">
        <select
          value={selectedBlock}
          onChange={(e) => setSelectedBlock(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500 bg-white transition-colors hover:border-blue-400"
          aria-label="Select Block"
        >
          <option value="Block A">Block A</option>
          <option value="Block B">Block B</option>
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

          {/* Machine Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
            {machines.map((machine) => {
              const { bgColor, textColor, indicatorColor, icon } = getStatusStyles(machine.status);

              return (
                <div
                  key={machine.machine_id}
                  className={`p-4 rounded-lg ${bgColor} shadow-md transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col items-center space-y-2`}
                >
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${indicatorColor}`}></div>
                    <span className={`font-semibold ${textColor}`}>{icon}</span>
                  </div>
                  <h3 className={`font-bold ${textColor} text-lg`}>{machine.machine_id}</h3>
                  <PieChartComponent status={machine.status} />
                  <p className="text-sm font-medium text-gray-800">{machine.type}</p>
                  <p className="text-xs text-gray-600">{machine.status}</p>
                </div>
              );
            })}
          </div>

          {/* Footer: Line Names */}
          <div className="grid grid-cols-5 mt-8 text-sm text-gray-600 border-t border-gray-200 pt-4">
            {['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'].map((line, index) => (
              <span key={index} className="text-center font-medium">
                {line}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineStatus;
