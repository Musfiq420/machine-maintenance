import React from 'react';
import PieChartComponent from '../../../../shared/components/pieChart/PieChart';

const MachineStatus = () => {
  // Sample data for machines
  const machines = [
    { id: 45, name: 'SN', status: 'Running', color: 'bg-green-100', textColor: 'text-green-700', indicator: 'bg-green-300' },
    { id: 57, name: 'DN', status: 'Broken', color: 'bg-red-100', textColor: 'text-red-700', indicator: 'bg-red-300' },
    { id: 12, name: 'FOA', status: 'Under Maintenance', color: 'bg-yellow-100', textColor: 'text-yellow-700', indicator: 'bg-yellow-300' },
  ];

  // Generate grid rows
  const gridRows = new Array(5).fill(machines);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-gray-800 tracking-wide">Block A</h2>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-300 shadow-inner"></div>
            <span className="text-gray-700">Running</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-300 shadow-inner"></div>
            <span className="text-gray-700">Under Maintenance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-300 shadow-inner"></div>
            <span className="text-gray-700">Broken</span>
          </div>
        </div>
      </div>

      {/* Machine Grid */}
      <div className="grid grid-cols-5 gap-4 mt-6">
        {gridRows.map((row, rowIndex) =>
          row.map((machine, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`p-4 rounded-lg ${machine.color} shadow transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col items-center space-y-2`}
            >
              <h3 className={`font-bold ${machine.textColor} text-lg`}>Machine #{machine.id}</h3>
              <PieChartComponent />
              <p className="text-sm font-semibold text-gray-800">{machine.name}</p>
              <p className="text-xs text-gray-600">{machine.status}</p>
            </div>
          ))
        )}
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
  );
};

export default MachineStatus;
