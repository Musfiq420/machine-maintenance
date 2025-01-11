import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import DashboardLoading from "../../../../shared/components/dashboard/dashboardLoading";

const MachineDetails = () => {
  const { machine_id } = useParams();
  const [machineData, setMachineData] = useState(null);

  useEffect(() => {
    const fetchMachineData = async () => {
      try {
        const response = await fetch(
          `https://machine-maintenance.onrender.com/api/maintenance/breakdown-logs/machines-monitoring/?machine_id=${machine_id}`
        );
        const data = await response.json();
        setMachineData(data);
      } catch (error) {
        console.error("Error fetching machine data:", error);
      }
    };
    fetchMachineData();
  }, [machine_id]);

  if (!machineData) {
    return <DashboardLoading />;
  }

  const breakdowns = machineData["breakdowns-last-week"] || [];
  const lostTimeReasons = machineData["lost-time-reasons-last-week"] || [];

  // Prepare data for chart
  const chartData = breakdowns.map((breakdown) => {
    const lostTimeParts = breakdown["lost-time"].split(":");
    const lostTimeInMinutes =
      parseInt(lostTimeParts[0]) * 60 + parseInt(lostTimeParts[1]);
    const breakdownDate = new Date(
      breakdown["breakdown-start"]
    ).toLocaleDateString();
    return {
      date: breakdownDate,
      lostTime: lostTimeInMinutes,
    };
  });

  const pieChartData = lostTimeReasons.map((reason) => {
    const lostTimeParts = reason["lost-time"].split(":");
    const lostTimeInMinutes =
      parseInt(lostTimeParts[0]) * 60 + parseInt(lostTimeParts[1]);
    return {
      name: reason["problem-category"],
      value: lostTimeInMinutes,
    };
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-lg">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-green-800">
            Machine {machineData.machine_id}
          </h1>
          <h2 className="text-lg text-green-700">
            Model: {machineData.model_number}
          </h2>
          <p className="text-gray-500">
            Serial No:{" "}
            <span className="text-gray-700 font-medium">
              {machineData.serial_no}
            </span>
          </p>
        </div>
        <div className="w-2/3">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Breakdown Timeline
          </h3>
          <div className="w-full bg-gray-200 h-4 rounded-lg flex">
            <div
              className="bg-green-400 h-4 rounded-l-lg"
              style={{ width: "70%" }}
            ></div>
            <div className="bg-yellow-400 h-4" style={{ width: "10%" }}></div>
            <div
              className="bg-red-400 h-4 rounded-r-lg"
              style={{ width: "20%" }}
            ></div>
          </div>
          <div className="flex justify-between text-gray-500 text-sm mt-1">
            <span>8</span>
            <span>9</span>
            <span>10</span>
            <span>11</span>
            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span>15</span>
            <span>16</span>
            <span>17</span>
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Lost Time (Last Week)</p>
          <h3 className="text-xl font-bold text-gray-800">
            {machineData["total-lost-time-last-week"]}
          </h3>
        </div>
        <div className="text-center bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Utilization (Last Week)</p>
          <h3 className="text-xl font-bold text-gray-800">
            {(machineData["utilization-last-week"] * 100).toFixed(1)}%
          </h3>
        </div>
        <div className="text-center bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Breakdown Count (Last Week)</p>
          <h3 className="text-xl font-bold text-gray-800">
            {machineData["breakdowns-count-last-week"]}
          </h3>
        </div>
        <div className="text-center bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">MTBF (Last Week)</p>
          <h3 className="text-xl font-bold text-gray-800">
            {machineData["MTBF-last-week"]}
          </h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Breakdown Timeline (Last Week)
          </h3>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              label={{ value: "Date", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              label={{
                value: "Lost Time (mins)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="lostTime" fill="#82ca9d" />
          </BarChart>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Lost Time Reasons (Last Week)
          </h3>
          <PieChart width={500} height={300}>
            <Pie
              data={pieChartData}
              cx={250}
              cy={150}
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default MachineDetails;
