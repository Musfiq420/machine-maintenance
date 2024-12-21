// src/shared/components/pieChart/PieChart.jsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ status }) => {
  // Example data based on status
  const data = {
    labels: ['Running', 'Broken', 'Under Maintenance'],
    datasets: [
      {
        data: [
          status?.toLowerCase() === 'running' ? 70 : 30,
          status?.toLowerCase() === 'broken' ? 20 : 80,
          status?.toLowerCase() === 'under maintenance' ? 10 : 90,
        ],
        backgroundColor: [
          'rgba(74, 222, 128, 0.6)', // Green for Running
          'rgba(239, 68, 68, 0.6)', // Red for Broken
          'rgba(252, 211, 77, 0.6)', // Yellow for Under Maintenance
        ],
        borderColor: [
          'rgba(74, 222, 128, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(252, 211, 77, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend if not needed
      },
    },
  };

  return (
    <div className="w-16 h-16">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartComponent;
