import React from "react";
import { FaArrowDown, FaArrowUp, FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PieChartComponent from "../pieChart/PieChart";

export default function MachineCards({ status, machine_id, type }) {
  // Determine colors and icons based on machine status
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return {
          bgColor: "bg-green-100",
          textColor: "text-green-700",
          indicatorColor: "bg-green-500",
          icon: <FaArrowUp />,
        };
      case "broken":
      case "inactive":
        return {
          bgColor: "bg-red-100",
          textColor: "text-red-700",
          indicatorColor: "bg-red-500",
          icon: <FaArrowDown />,
        };
      case "maintenance":
        return {
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-700",
          indicatorColor: "bg-yellow-500",
          icon: <FaQuestionCircle />,
        };
      default:
        return {
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          indicatorColor: "bg-gray-500",
          icon: <FaQuestionCircle />,
        };
    }
  };
  const { bgColor, textColor, indicatorColor, icon } = getStatusStyles(status);

  return (
    <Link
      to={`/dashboard/machine-monitoring/${machine_id}`}
      key={machine_id}
      className={`p-4 rounded-lg ${bgColor} shadow-md transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col items-center space-y-2`}
    >
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${indicatorColor}`}></div>
        <span className={`font-semibold ${textColor}`}>{icon}</span>
      </div>
      <h3 className={`font-bold ${textColor} text-lg`}>
        {machine_id || "N/A"}
      </h3>
      <PieChartComponent status={status} />
      <p className="text-sm font-medium text-gray-800">{type || "N/A"}</p>
      <p className="text-xs text-gray-600 capitalize">{status || "N/A"}</p>
    </Link>
  );
}
