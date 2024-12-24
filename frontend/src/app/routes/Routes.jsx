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
import QrCodeTable from "../../features/maintenance/pages/qrCodeTable/QrCodeTable";
import SignInPage from "../../features/userManagement/pages/SignInPage";
import ForgotPasswordPage from "../../features/userManagement/pages/ForgotPasswordPage";
import AddMachineFormLayout from "../../features/maintenance/pages/AddMachineFormLayout";
import AddMachineForm from "../../features/maintenance/components/AddMachineForm";

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
          path: "/dashboard/machine-details", // Default route
          element: <MainDashboard></MainDashboard>, // Sign-up layout
        },
        {
          path: "/dashboard/machine-monitoring", // Default route
          element: <MachineDetailsDashboard></MachineDetailsDashboard>, // Sign-up layout
        },
        {
          path: "/dashboard/qr-code-generator", // Default route
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
          path: "/signin", // Dashboard route
          element: <SignInPage></SignInPage>, // Example new page
        },
        {
          path: "/forgot-password", // Dashboard route
          element:<ForgotPasswordPage/> // Example new page
        },
        {
          path: "/add-machine", // Dashboard route
          element:<AddMachineFormLayout/> // Example new page
        },
        {
          path: "/add-machine2", // Dashboard route
          element:<AddMachineForm/> // Example new page
        },
        {
          path: "/employeeList", // Dashboard route
          element: <EmployeeListLayout></EmployeeListLayout>, // Example new page
        },
      ],
    },
  ]);