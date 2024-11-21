import React from 'react';
import PieChartComponent from '../PieChartComponent/PieChartComponent'; // Import the pie chart component

const MachineStatus = () => {
  // Sample data for machines
  const machines = [
    { id: 45, name: 'SN', status: 'Running', color: 'bg-green-100', textColor: 'text-green-600' },
    { id: 57, name: 'DN', status: 'Broken', color: 'bg-red-100', textColor: 'text-red-600' },
    { id: 12, name: 'FOA', status: 'Under Maintenance', color: 'bg-yellow-100', textColor: 'text-yellow-600' },
  ];

  // Generate grid rows
  const gridRows = new Array(5).fill(machines);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Block A</h2>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-300"></div>
            <span>Running</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
            <span>Under Maintenance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-300"></div>
            <span>Broken</span>
          </div>
        </div>
      </div>

      {/* Machine Grid */}
      <div className="grid grid-cols-5 gap-4 mt-4">
        {gridRows.map((row, rowIndex) =>
          row.map((machine, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`p-4 rounded-lg ${machine.color} shadow flex flex-col items-center`}
            >
              <h3 className={`font-bold ${machine.textColor}`}>Machine #{machine.id}</h3>
              <PieChartComponent /> {/* Add the pie chart */}
              <p className="text-sm font-medium">{machine.name}</p>
              <p className="text-xs text-gray-500">{machine.status}</p>
            </div>
          ))
        )}
      </div>

      {/* Footer: Line Names */}
      <div className="grid grid-cols-5 mt-6 text-sm text-gray-500">
        {['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'].map((line, index) => (
          <span key={index} className="text-center">
            {line}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MachineStatus;