import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importing Link

const DashboardSidebar = () => {
  const [isSewingOpen, setSewingOpen] = useState(false);
  const [isMachineOpen, setMachineOpen] = useState(false);
  const [isPlanningOpen, setPlanningOpen] = useState(false);

  return (
    <div className="bg-green-50 text-gray-700 w-64 h-full">
      <div className="flex items-center px-6 py-4">
        <div className="w-8 h-8 bg-green-500 flex items-center justify-center rounded">
          {/* Simulating the logo */}
          <div className="text-white font-bold text-lg">F</div>
        </div>
        <h1 className="text-green-600 font-bold text-xl ml-3">Fastracker</h1>
      </div>
      <ul className="mt-4 space-y-2">
        <li>
          <Link to="/" className="block px-4 py-2 hover:bg-green-100">
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className="block px-4 py-2 hover:bg-green-100">
            Dashboard
          </Link>
        </li>
        <li>
          <button
            onClick={() => setSewingOpen(!isSewingOpen)}
            className="flex justify-between w-full px-4 py-2 text-left hover:bg-green-100">
            Sewing
            <span>{isSewingOpen ? '-' : '+'}</span>
          </button>
          {isSewingOpen && (
            <ul className="ml-6 space-y-1">
              <li>
                <Link to="/sewing/production" className="block px-4 py-2 hover:bg-green-100">
                  Production
                </Link>
              </li>
              <li>
                <Link to="/sewing/trend-analysis" className="block px-4 py-2 hover:bg-green-100">
                  Trend Analysis
                </Link>
              </li>
              <li>
                <Link to="/sewing/realtime" className="block px-4 py-2 hover:bg-green-100">
                  Realtime
                </Link>
              </li>
              <li>
                <Link to="/sewing/capacity-analysis" className="block px-4 py-2 hover:bg-green-100">
                  Capacity Analysis
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button
            onClick={() => setMachineOpen(!isMachineOpen)}
            className="flex justify-between w-full px-4 py-2 text-left hover:bg-green-100">
            Machine Details
            <span>{isMachineOpen ? '-' : '+'}</span>
          </button>
          {isMachineOpen && (
            <ul className="ml-6 space-y-1">
              <li>
                <Link to="/machine-details" className="block px-4 py-2 hover:bg-green-100">
                  Machine Monitoring
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <button
            onClick={() => setPlanningOpen(!isPlanningOpen)}
            className="flex justify-between w-full px-4 py-2 text-left hover:bg-green-100">
            Planning
            <span>{isPlanningOpen ? '-' : '+'}</span>
          </button>
          {isPlanningOpen && (
            <ul className="ml-6 space-y-1">
              <li>
                <Link to="/planning/scheduling" className="block px-4 py-2 hover:bg-green-100">
                  Scheduling
                </Link>
              </li>
              <li>
                <Link to="/planning/kanban-board" className="block px-4 py-2 hover:bg-green-100">
                  Kanban Board
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default DashboardSidebar;
