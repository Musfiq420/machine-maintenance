// src/shared/components/dashboardSidebar/DashboardSidebar.jsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaTachometerAlt,
  FaTshirt, // Replaced FaSewing with FaTshirt
  FaCogs,
  FaChartLine,
  FaQrcode,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa"; // Importing icons from React Icons

const DashboardSidebar = () => {
  const [isSewingOpen, setSewingOpen] = useState(false);
  const [isMachineOpen, setMachineOpen] = useState(false);
  const [isPlanningOpen, setPlanningOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation(); // To determine the active route

  // Function to check if a route is active
  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  // Function to check if any submenu route is active
  const isActiveSubRoute = (routes) => {
    return routes.some((route) => location.pathname === route);
  };
  const [isUserManagementOpen, setUserOpen] = useState(false)

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center justify-between bg-green-50 p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 flex items-center justify-center rounded">
            <div className="text-white font-bold text-lg">F</div>
          </div>
          <h1 className="text-green-600 font-bold text-xl ml-3">Fastracker</h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="text-green-600 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-50 text-gray-700 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-20 md:translate-x-0 md:static md:shadow-none shadow-lg`}
      >
        <div className="hidden md:flex items-center px-6 py-4">
          <div className="w-8 h-8 bg-green-500 flex items-center justify-center rounded">
            <div className="text-white font-bold text-lg">F</div>
          </div>
          <h1 className="text-green-600 font-bold text-xl ml-3">Fastracker</h1>
        </div>
        <ul className="mt-4 space-y-2 px-2">
          {/* Home */}
          <li>
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/") ? "bg-green-200" : ""
                }`}
            >
              <FaHome className="mr-3" />
              Home
            </Link>
          </li>

          {/* Dashboard
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/dashboard") ? "bg-green-200" : ""
                }`}
            >
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </Link>
          </li> */}

          {/* Dashboard Details */}
          <li>
            <button
              onClick={() => setMachineOpen(!isMachineOpen)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded hover:bg-green-100 ${isActiveSubRoute([
                "/machine-details",
                "/qr-code-generator",
              ])
                  ? "bg-green-200"
                  : ""
                }`}
              aria-expanded={isMachineOpen}
              aria-controls="machine-submenu"
            >
              <div className="flex items-center">
                <FaTachometerAlt className="mr-3" />
                Dashboard
              </div>
              <span>{isMachineOpen ? "-" : "+"}</span>
            </button>
            {isMachineOpen && (
              <ul id="machine-submenu" className="ml-6 mt-2 space-y-1">
                                <li>
                  <Link
                    to="/dashboard/machine-details"
                    className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/qr-code-generator") ? "bg-green-200" : ""
                      }`}
                  >
                    <FaChartLine className="mr-3" />
                    Machine Details
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/machine-monitoring"
                    className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/machine-details") ? "bg-green-200" : ""
                      }`}
                  >
                    <FaCogs className="mr-3" />
                    Machine Monitoring
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/qr-code-generator"
                    className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/qr-code-generator") ? "bg-green-200" : ""
                      }`}
                  >
                    <FaQrcode className="mr-3" />
                    Machine QR Code Generator
                  </Link>
                </li>

              </ul>
            )}
          </li>

          {/* Sewing */}
          <li>
            <button
              onClick={() => setSewingOpen(!isSewingOpen)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded hover:bg-green-100 ${isActiveSubRoute([
                "/sewing/production",
                "/sewing/trend-analysis",
                "/sewing/realtime",
                "/sewing/capacity-analysis",
              ])
                  ? "bg-green-200"
                  : ""
                }`}
              aria-expanded={isSewingOpen}
              aria-controls="sewing-submenu"
            >
              <div className="flex items-center">
                <FaTshirt className="mr-3" /> {/* Changed icon to FaTshirt */}
                Sewing
              </div>
              <span>{isSewingOpen ? "-" : "+"}</span>
            </button>
            {isSewingOpen && (
              <ul id="sewing-submenu" className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    to="/sewing/production"
                    className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/sewing/production") ? "bg-green-200" : ""
                      }`}
                  >
                    <FaChartLine className="mr-3" />
                    Production
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sewing/trend-analysis"
                    className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/sewing/trend-analysis") ? "bg-green-200" : ""
                      }`}
                  >
                    <FaChartLine className="mr-3" />
                    Trend Analysis
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sewing/realtime"
                    className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/sewing/realtime") ? "bg-green-200" : ""
                      }`}
                  >
                    <FaChartLine className="mr-3" />
                    Realtime
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sewing/capacity-analysis"
                    className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/sewing/capacity-analysis") ? "bg-green-200" : ""
                      }`}
                  >
                    <FaChartLine className="mr-3" />
                    Capacity Analysis
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Machine Details
          <li>
            <button
              onClick={() => setMachineOpen(!isMachineOpen)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded hover:bg-green-100 ${isActiveSubRoute([
                "/machine-details",
                "/qr-code-generator",
              ])
                  ? "bg-green-200"
                  : ""
                }`}
              aria-expanded={isMachineOpen}
              aria-controls="machine-submenu"
            >
              <div className="flex items-center">
                <FaCogs className="mr-3" />
                Machine Details
              </div>
              <span>{isMachineOpen ? "-" : "+"}</span>
            </button>
            {isMachineOpen && (
              <ul id="machine-submenu" className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    to="/machine-details"
                    className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/machine-details") ? "bg-green-200" : ""
                      }`}
                  >
                    <FaCogs className="mr-3" />
                    Machine Monitoring
                  </Link>
                </li>
                <li>
                  <Link
                    to="/qr-code-generator"
                    className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/qr-code-generator") ? "bg-green-200" : ""
                      }`}
                  >
                    <FaQrcode className="mr-3" />
                    Machine QR Code Generator
                  </Link>
                </li>
              </ul>
            )}
          </li> */}

          {/* Planning */}
          <li>
            <button
              onClick={() => setPlanningOpen(!isPlanningOpen)}
              className={`flex items-center justify-between w-full px-4 py-2 rounded hover:bg-green-100 ${isActiveSubRoute([
                "/planning/scheduling",
                "/planning/kanban-board",
              ])
                  ? "bg-green-200"
                  : ""
                }`}
              aria-expanded={isPlanningOpen}
              aria-controls="planning-submenu"
            >
              <div className="flex items-center">
                <FaChartLine className="mr-3" />
                Planning
              </div>
              <span>{isPlanningOpen ? "-" : "+"}</span>
            </button>
            {isPlanningOpen && (
              <ul id="planning-submenu" className="ml-6 mt-2 space-y-1">
                <li>
                  <Link
                    to="/planning/scheduling"
                    className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/planning/scheduling") ? "bg-green-200" : ""
                      }`}
                  >
                    <FaChartLine className="mr-3" />
                    Scheduling
                  </Link>
                </li>
                <li>
                  <Link
                    to="/planning/kanban-board"
                    className={`flex items-center px-4 py-2 rounded hover:bg-green-100 ${isActiveRoute("/planning/kanban-board") ? "bg-green-200" : ""
                      }`}
                  >
                    <FaChartLine className="mr-3" />
                    Kanban Board
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
          <button
            onClick={() => setUserOpen(!isUserManagementOpen)}
            className="flex justify-between w-full px-4 py-2 text-left hover:bg-green-100">
            User Management
            <span>{isUserManagementOpen ? '-' : '+'}</span>
          </button>
          {isUserManagementOpen && (
            <ul className="ml-6 space-y-1">
              <li>
                <Link to="/employeeList" className="block px-4 py-2 hover:bg-green-100">
                  Employee List
                </Link>
              </li>
            </ul>
          )}
        </li>
          {/* Logout (Optional) */}
          <li className="absolute bottom-4 w-full">
            <Link
              to="/logout"
              className="flex items-center px-4 py-2 rounded hover:bg-green-100"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for Mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default DashboardSidebar;
