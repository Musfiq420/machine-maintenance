import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaQuestionCircle } from 'react-icons/fa';

import PieChartComponent from '../../../shared/components/PieChartComponent';

const AllMachineDetails = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Dropdown states for floor and line selection
  const [selectedFloor, setSelectedFloor] = useState('All Floors');
  const [selectedLine, setSelectedLine] = useState('All Lines');

  const [floors, setFloors] = useState([]);
  const [lines, setLines] = useState([]);

  // API URL
  const MACHINE_QR_DATA_API = 'https://fast-tracker-bo3s.onrender.com/maintenance/machines/';

  // Fetch machine data from API
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        setLoading(true);
        const response = await fetch(MACHINE_QR_DATA_API);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setMachines(data);
          // Extract unique floor numbers
          const uniqueFloors = Array.from(
            new Set(data.map(machine => machine.floor_no))
          )
            .filter(floor => floor !== null)
            .sort((a, b) => a - b);
          setFloors(uniqueFloors);

          // Extract unique line numbers
          const uniqueLines = Array.from(
            new Set(data.map(machine => machine.line_no))
          )
            .filter(line => line !== null)
            .sort((a, b) => a - b);
          setLines(uniqueLines);
        } else {
          throw new Error('Invalid data format received from API');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching machines:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchMachines();
  }, [MACHINE_QR_DATA_API]);

  // Determine colors and icons based on machine status
  const getStatusStyles = status => {
    switch (status?.toLowerCase()) {
      case 'active':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          indicatorColor: 'bg-green-500',
          icon: <FaArrowUp />,
        };
      case 'broken':
      case 'inactive':
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

  // Compute statistics based on filtered machine data
  const computeStats = () => {
    const filteredMachines = machines.filter(machine => {
      const floorMatch =
        selectedFloor === 'All Floors' || machine.floor_no === selectedFloor;
      const lineMatch =
        selectedLine === 'All Lines' || machine.line_no === selectedLine;
      return floorMatch && lineMatch;
    });

    const totalMachines = filteredMachines.length;
    const active = filteredMachines.filter(
      machine => machine.status?.toLowerCase() === 'active'
    ).length;
    const repairing = filteredMachines.filter(
      machine => machine.status?.toLowerCase() === 'under maintenance'
    ).length;
    const idle = filteredMachines.filter(machine => {
      const status = machine.status?.toLowerCase();
      return status === 'broken' || status === 'inactive';
    }).length;

    // Placeholder for Total Lost Time (implement actual computation as needed)
    const totalLostTime = '2:13 hrs'; // Replace with actual computation if available

    return {
      totalLostTime,
      totalMachines,
      active,
      repairing,
      idle,
    };
  };

  const stats = computeStats();

  // Determine color and icon based on change (placeholder values)
  const getChangeStyles = percentage => ({
    color: percentage >= 0 ? 'text-green-600' : 'text-red-600',
    icon: percentage >= 0 ? <FaArrowUp /> : <FaArrowDown />,
    percentage: `${percentage >= 0 ? '+' : ''}${percentage}%`,
  });

  // Placeholder: Replace with actual percentage calculations
  const changeStyles = getChangeStyles(5.9); // Example: +5.9%

  // Group machines by line_no
  const groupMachinesByLine = () => {
    const grouped = {};
    machines.forEach(machine => {
      const floorMatch =
        selectedFloor === 'All Floors' || machine.floor_no === selectedFloor;
      const lineMatch =
        selectedLine === 'All Lines' || machine.line_no === selectedLine;
      if (floorMatch && lineMatch) {
        const line = machine.line_no || 'Unknown Line';
        if (!grouped[line]) {
          grouped[line] = [];
        }
        grouped[line].push(machine);
      }
    });
    return grouped;
  };

  const machinesByLine = groupMachinesByLine();

  // Extract unique line numbers for footer
  const uniqueLines = Array.from(
    new Set(
      machines
        .filter(machine => {
          const floorMatch =
            selectedFloor === 'All Floors' || machine.floor_no === selectedFloor;
          const lineMatch =
            selectedLine === 'All Lines' || machine.line_no === selectedLine;
          return floorMatch && lineMatch;
        })
        .map(machine => machine.line_no)
    )
  )
    .filter(line => line !== null)
    .sort((a, b) => a - b);

  return (
    <div className="bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6 min-h-screen">
      {/* Dropdowns for Floor and Line Selection */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Floor Selection */}
        <div>
          <label
            htmlFor="floor-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Floor
          </label>
          <select
            id="floor-select"
            value={selectedFloor}
            onChange={e =>
              setSelectedFloor(
                e.target.value === 'All Floors'
                  ? 'All Floors'
                  : Number(e.target.value)
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500 hover:border-blue-400 transition-colors bg-white"
            aria-label="Select Floor"
          >
            <option value="All Floors">All Floors</option>
            {floors.map(floor => (
              <option key={floor} value={floor}>
                Floor {floor}
              </option>
            ))}
          </select>
        </div>

        {/* Line Selection */}
        <div>
          <label
            htmlFor="line-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Line
          </label>
          <select
            id="line-select"
            value={selectedLine}
            onChange={e =>
              setSelectedLine(
                e.target.value === 'All Lines'
                  ? 'All Lines'
                  : Number(e.target.value)
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500 hover:border-blue-400 transition-colors bg-white"
            aria-label="Select Line"
          >
            <option value="All Lines">All Lines</option>
            {lines.map(line => (
              <option key={line} value={line}>
                Line {line}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-8 w-8 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="ml-2 text-gray-600">Loading machines...</span>
        </div>
      )}
      {error && (
        <div className="text-center text-red-500">
          <p>Error loading machines. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Machine Status Content */}
      {!loading && !error && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800 tracking-wide">
              {selectedFloor === 'All Floors' && selectedLine === 'All Lines'
                ? 'All Machines'
                : selectedFloor !== 'All Floors' && selectedLine === 'All Lines'
                ? `Floor ${selectedFloor} Machines`
                : selectedFloor === 'All Floors' && selectedLine !== 'All Lines'
                ? `Line ${selectedLine} Machines`
                : `Floor ${selectedFloor} | Line ${selectedLine} Machines`}
            </h2>
            <div className="flex space-x-4 text-sm">
              {/* Status Indicators */}
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-700">Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-gray-700">Under Maintenance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-700">Idle</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
            {/* Total Lost Time */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
              <h2 className="text-sm text-gray-500 font-semibold">
                Total Lost Time
              </h2>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalLostTime}
              </p>
              <div
                className={`flex items-center space-x-1 ${changeStyles.color} text-sm`}
              >
                {changeStyles.icon}
                <span>{changeStyles.percentage}</span>
              </div>
            </div>

            {/* Total Machines */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
              <h2 className="text-sm text-gray-500 font-semibold">
                Total Machines
              </h2>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalMachines}
              </p>
              <div
                className={`flex items-center space-x-1 ${changeStyles.color} text-sm`}
              >
                {changeStyles.icon}
                <span>{changeStyles.percentage}</span>
              </div>
            </div>

            {/* Active */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
              <h2 className="text-sm text-gray-500 font-semibold">Active</h2>
              <p className="text-2xl font-bold text-gray-800">{stats.active}</p>
              <div
                className={`flex items-center space-x-1 ${changeStyles.color} text-sm`}
              >
                {changeStyles.icon}
                <span>{changeStyles.percentage}</span>
              </div>
            </div>

            {/* Repairing */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
              <h2 className="text-sm text-gray-500 font-semibold">Repairing</h2>
              <p className="text-2xl font-bold text-gray-800">
                {stats.repairing}
              </p>
              <div
                className={`flex items-center space-x-1 ${changeStyles.color} text-sm`}
              >
                {changeStyles.icon}
                <span>{changeStyles.percentage}</span>
              </div>
            </div>

            {/* Idle */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
              <h2 className="text-sm text-gray-500 font-semibold">Idle</h2>
              <p className="text-2xl font-bold text-gray-800">{stats.idle}</p>
              <div
                className={`flex items-center space-x-1 ${changeStyles.color} text-sm`}
              >
                {changeStyles.icon}
                <span>{changeStyles.percentage}</span>
              </div>
            </div>
          </div>

          {/* Machine Grid Grouped by Line */}
          <div className="mt-8">
            {uniqueLines.length > 0 ? (
              uniqueLines.map(line => (
                <div key={line} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Line {line}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {machines
                      .filter(
                        machine =>
                          machine.line_no === line &&
                          (selectedFloor === 'All Floors' ||
                            machine.floor_no === selectedFloor)
                      )
                      .map(machine => {
                        const {
                          bgColor,
                          textColor,
                          indicatorColor,
                          icon,
                        } = getStatusStyles(machine.status);

                        return (
                          <div
                            key={machine.machine_id}
                            className={`p-4 rounded-lg ${bgColor} shadow-md transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col items-center space-y-2`}
                          >
                            <div className="flex items-center space-x-1">
                              <div
                                className={`w-2 h-2 rounded-full ${indicatorColor}`}
                              ></div>
                              <span
                                className={`font-semibold ${textColor}`}
                              >
                                {icon}
                              </span>
                            </div>
                            <h3
                              className={`font-bold ${textColor} text-lg`}
                            >
                              {machine.machine_id || 'N/A'}
                            </h3>
                            <PieChartComponent status={machine.status} />
                            <p className="text-sm font-medium text-gray-800">
                              {machine.type || 'N/A'}
                            </p>
                            <p className="text-xs text-gray-600 capitalize">
                              {machine.status || 'N/A'}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">
                No machines found for the selected criteria.
              </p>
            )}
          </div>

          {/* Footer: Dynamic Line Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8 text-sm text-gray-600 border-t border-gray-200 pt-4">
            {uniqueLines.map((line, index) => (
              <span key={index} className="text-center font-medium">
                {`Line ${line}`}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllMachineDetails;
