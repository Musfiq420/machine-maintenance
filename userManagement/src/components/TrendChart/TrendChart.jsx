import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const dataByYear = {
  2022: [
    { name: 'Jan', uv: 4000, pv: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398 },
    { name: 'Mar', uv: 2000, pv: 9800 },
    { name: 'Apr', uv: 2780, pv: 3908 },
    { name: 'May', uv: 1890, pv: 4800 },
    { name: 'Jun', uv: 2390, pv: 3800 },
    { name: 'Jul', uv: 3490, pv: 4300 },
  ],
  2023: [
    { name: 'Jan', uv: 4500, pv: 2600 },
    { name: 'Feb', uv: 3200, pv: 1500 },
    { name: 'Mar', uv: 2200, pv: 9900 },
    { name: 'Apr', uv: 2900, pv: 4000 },
    { name: 'May', uv: 2000, pv: 5000 },
    { name: 'Jun', uv: 2500, pv: 3900 },
    { name: 'Jul', uv: 3600, pv: 4400 },
  ],
};

const TrendChart = () => {
  const [selectedYear, setSelectedYear] = useState('2022');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Historical Trend of Utilization</h2>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={dataByYear[selectedYear]}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
