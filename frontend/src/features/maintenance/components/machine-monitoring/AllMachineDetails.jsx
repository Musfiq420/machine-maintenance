// src/shared/components/MachineStatus/AllMachineDetails.jsx

import React, { useState, useEffect, useContext } from "react";
import { FaArrowUp, FaArrowDown, FaQuestionCircle } from "react-icons/fa";
import PieChartComponent from "../../../../shared/components/PieChartComponent";
import { getApiUrl } from "../../../../shared/components/getApiUrl";
import { UserContext } from "../../../../context/userProvider";
import { Link } from "react-router-dom";
import DashboardLoading from "../../../../shared/components/dashboard/dashboardLoading";
import DashboardError from "../../../../shared/components/dashboard/dashboardError";
import MachineCards from "../../../../shared/components/cards/machineCards";

const location = [
  {
    "room": "A",
    "line": ["1", "2", "3"]
  },
  {
    "room": "B",
    "line": ["1", "2"]
  }
]

const AllMachineDetails = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { getToken } = useContext(UserContext);

  const [selectedFloor, setSelectedFloor] = useState(location[0].room);
  const [selectedLine, setSelectedLine] = useState("");

  const [floors, setFloors] = useState(location.map((l) => l.room));
  const [lines, setLines] = useState(location[0].line.map((r) => r));
  
  const [stats, setStats] = useState([]);

  // API URL

  // Fetch machine data from API
  const fetchMachines = async (room, lines) => {
    console.log(room)
    console.log(lines)
    setError(false);
    const token = getToken();
    try {
      setLoading(true);
      // const response = await fetch();
      const response = await fetch(
        import.meta.env.VITE_URL_PREFIX +
          `/api/maintenance/breakdown-logs/total-lost-time-per-location/?location_room=${room}&location_line_no=${lines}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`, // Ensure this header matches what your server expects
          },
        }
      );
      const res = await response.json();
      console.log(res);
      setMachines(res.machines);
      // setFloors(res.rooms);
      // setLines(res.line_nos);
      setLoading(false);
      const newStats = [
        {
          stat: "Total Lost Time",
          value: res.total_lost_time,
        },
        {
          stat: "Total Machines",
          value: res.total_machine_count,
        },
        {
          stat: "Active",
          value: res.total_active_machines,
        },
        {
          stat: "Repairing",
          value: res.total_repairing_machines,
        },
        {
          stat: "Idle",
          value: res.total_idle_machines,
        },
      ];
      setStats(newStats);
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    

    fetchMachines(selectedFloor, selectedLine);
  }, [selectedLine, selectedFloor]);

  // Extract unique line numbers for footer
  const uniqueLines = Array.from(
    new Set(
      machines
        .filter((machine) => {
          const floorMatch =
            selectedFloor === "All Floors" ||
            machine.floor_no === selectedFloor;
          const lineMatch =
            selectedLine === "All Lines" || machine.line_no === selectedLine;
          return floorMatch && lineMatch;
        })
        .map((machine) => machine.line_no)
    )
  )
    .filter((line) => line !== null)
    .sort((a, b) => a - b);

  const statusList = [
    { state: "Active", color: "green-500" },
    { state: "Maintanance", color: "yellow-500" },
    { state: "Idle", color: "red-500" },
  ];

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
            onChange={(e) =>{
              
                setSelectedFloor(
                   e.target.value
                )
                const lines = location.find((v) => v.room == e.target.value).line
                setLines(lines)
                setSelectedLine("")
              }
            }
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500 hover:border-blue-400 transition-colors bg-white"
            aria-label="Select Floor"
          >
            {floors.map((floor) => (
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
            onChange={(e) =>
              setSelectedLine(
                e.target.value === "All Lines"
                  ? ""
                  : Number(e.target.value)
              )
            }
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500 hover:border-blue-400 transition-colors bg-white"
            aria-label="Select Line"
          >
            <option value={""}>All Lines</option>
            {lines.map((line) => (
              <option key={line} value={line}>
                Line {line}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && <DashboardLoading title={"Machines"} />}
      {error && <DashboardError title={"Machines"} />}

      {/* Machine Status Content */}
      {machines.length && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h2 className="text-xl font-bold text-gray-800 tracking-wide">
              {selectedFloor === "All Floors" && selectedLine === "All Lines"
                ? "All Machines"
                : selectedFloor !== "All Floors" && selectedLine === "All Lines"
                ? `Floor ${selectedFloor} Machines`
                : selectedFloor === "All Floors" && selectedLine !== "All Lines"
                ? `Line ${selectedLine} Machines`
                : `Floor ${selectedFloor} | Line ${selectedLine} Machines`}
            </h2>
            <div className="flex space-x-4 text-sm">
              {/* Status Indicators */}
              {statusList.map((status) => (
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full bg-${status.color}`}
                  ></div>
                  <span className="text-gray-700">{status.state}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
            {stats.map((stat) => (
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
                <h2 className="text-sm text-gray-500 font-semibold">
                  {stat.stat}
                </h2>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                {/* {stat.change && (
                  <div
                    className={`flex items-center ${
                      stat.change > 0 ? "text-green-500" : "text-red-500"
                    } space-x-1 text-sm my-1 font-semibold `}
                  >
                    {stat.change > 0 ? <FaArrowUp /> : <FaArrowDown />}
                    <span> {stat.change}</span>
                  </div>
                )} */}
              </div>
            ))}
          </div>

          {/* Machine Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {machines.map((machine) => (
              <MachineCards
                machine_id={encodeURIComponent(machine.machine_id)}
                status={machine.status}
                type={machine.type}
              />
            ))}
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
