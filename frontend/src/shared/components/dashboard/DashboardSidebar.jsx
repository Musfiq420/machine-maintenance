import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  FaTable,
  FaClipboardList,
  FaUsers,
  FaUserAlt,
} from "react-icons/fa"; // Importing icons from React Icons
import { UserContext } from "../../../context/userProvider";
import { FaGear, FaGears } from "react-icons/fa6";
import { GrAnalytics, GrSchedules, GrTime } from "react-icons/gr";
import { MdStorage } from "react-icons/md";

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const maintenanceLinks = [
    {
      name: "Machine Montitoring",
      link: "/dashboard/machine-monitoring",
      icon: <FaChartLine />,
    },
    {
      name: "Machine Details",
      link: "/dashboard/machine-details",
      icon: <FaTable />,
    },
  ];

  const sewingLinks = [
    {
      name: "Production",
      link: "/dashboard/sewing/production",
      icon: <FaGear />,
    },
    {
      name: "Trend Analysis",
      link: "/dashboard/sewing/trend-analysis",
      icon: <GrAnalytics />,
    },
    {
      name: "Realtime",
      link: "/dashboard/sewing/realtime",
      icon: <GrTime />,
    },
    {
      name: "Capacity Analysis",
      link: "/dashboard/sewing/capacity-analysis",
      icon: <MdStorage />,
    },
  ];
  const planningLinks = [
    {
      name: "Scheduling",
      link: "/dashboard/planning/scheduling",
      icon: <GrSchedules />,
    },
    {
      name: "Kanban Board",
      link: "/dashboard/planning/kanban-board",
      icon: <FaClipboardList />,
    },
  ];
  const userLinks = [
    {
      name: "Employee List",
      link: "/dashboard/employees",
      icon: <FaUsers />,
    },
  ];

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Function to check if a route is active
  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  const [isUserManagementOpen, setUserOpen] = useState(false);
  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden mb-12 ">
        <div className="md:hidden w-screen absolute top-0  inset-x-0 flex items-center justify-between bg-primary-light  p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-dark flex items-center justify-center rounded">
              <div className="text-white font-bold text-lg">P</div>
            </div>
            <h1 className="text-black font-bold text-xl ml-3">PanaMach</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-black focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary-accent text-gray-700 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform  duration-300 ease-in-out z-20 md:translate-x-0 md:static md:shadow-none shadow-lg`}
      >
        <div className="hidden md:flex items-center px-6 py-4">
          <div className="w-8 h-8 bg-primary-dark flex items-center justify-center rounded">
            <div className="text-white font-bold text-lg">P</div>
          </div>
          <h1 className="text-green-600 font-bold text-xl ml-3">PanaMach</h1>
        </div>
        <ul className="mt-4 space-y-2 px-2">
          {/* Home */}
          <li>
            <Link
              to="/"
              className={`flex items-center px-4 py-2 rounded hover:bg-primary-dark hover:text-white ${
                isActiveRoute("/") ? "bg-green-200" : ""
              }`}
            >
              <FaHome className="mr-3" />
              Home
            </Link>
          </li>

          {/* Dashboard Details */}
          <DashboardMenu
            currPath={location.pathname}
            icon={<FaTachometerAlt />}
            linkList={maintenanceLinks}
            menuName={"Maintenance"}
          />

          {/* Sewing */}

          <DashboardMenu
            currPath={location.pathname}
            icon={<FaTshirt />}
            linkList={sewingLinks}
            menuName={"Sewing"}
          />
          {/* Planning */}
          <DashboardMenu
            currPath={location.pathname}
            icon={<FaChartLine />}
            linkList={planningLinks}
            menuName={"Planning"}
          />
          {/* User List */}
          <DashboardMenu
            currPath={location.pathname}
            icon={<FaUserAlt />}
            linkList={userLinks}
            menuName={"User Management"}
          />

          {/* Logout (Optional) */}
          <li className="absolute bottom-4 w-full">
            <button
              onClick={logoutHandler}
              className="flex items-center px-4 py-2 rounded hover:bg-primary-dark hover:text-white"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
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

const DashboardMenu = ({ linkList, currPath, icon, menuName }) => {
  const links = linkList.map((link) => link.link);
  const [isOpen, setOpen] = useState(links.includes(currPath));
  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  return (
    <li>
      <button
        onClick={() => setOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-2 rounded hover:bg-primary-dark hover:text-white `}
        aria-expanded={isOpen}
        aria-controls="submenu"
      >
        <div className="flex gap-3 items-center">
          {icon}
          {menuName}
        </div>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <ul id="sewing-submenu" className="ml-6 mt-2 space-y-1">
          {linkList.map((link, index) => (
            <li>
              <Link
                to={link.link}
                className={`flex items-center gap-4 px-4 py-2 rounded hover:bg-primary-dark hover:text-white ${
                  isActiveRoute(link.link) ? "bg-primary-dark text-white" : ""
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default DashboardSidebar;
