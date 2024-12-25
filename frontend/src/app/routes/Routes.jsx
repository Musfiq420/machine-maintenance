import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import SignUpLayout from "../../features/userManagement/pages/signUpLayout/SignUpLayout";
import EmployeeListLayout from "../../features/userManagement/pages/employeeListLayout/EmployeeListLayout";
import Home from "../../features/landingPage/pages/home/Home";
import MainDashboard from "../../features/maintenance/pages/mainDashboard/MainDashboard";
import MachineDetailsDashboard from "../../features/maintenance/pages/machineDetailsDashboard/MachineDetailsDashboard";
import About from "../../features/landingPage/pages/about/About";
import LoginLayout from "../../features/userManagement/pages/loginLayout/LoginLayout";
import QrCodeTable from "../../features/maintenance/pages/qrCodeTable/QrCodeTable";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/", // Default route
          element: <Home></Home>, // Sign-up layout
        },
        {
          path: "/dashboard", // Default route
          element: <MainDashboard></MainDashboard>, // Sign-up layout
        },
        {
          path: "/machine-details", // Default route
          element: <MachineDetailsDashboard></MachineDetailsDashboard>, // Sign-up layout
        },
        {
          path: "/qr-code-generator", // Default route
          element: <QrCodeTable/>,
        },
        {
          path: "/about", // Default route
          element: <About></About>, // Sign-up layout
        },
        {
          path: "/signup", // Dashboard route
          element: <SignUpLayout></SignUpLayout>, // Example new page
        },
        {
          path: "/login", // Dashboard route
          element: <LoginLayout></LoginLayout>, // Example new page
        },
        {
          path: "/employeeList", // Dashboard route
          element: <EmployeeListLayout></EmployeeListLayout>, // Example new page
        },
      ],
    },
  ]);