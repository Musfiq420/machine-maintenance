import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import SignUpLayout from "../../features/userManagement/pages/SignUpLayout";
import EmployeeListLayout from "../../features/userManagement/pages/EmployeeListLayout";
import Home from "../../features/landingPage/pages/Home";
import MainDashboard from "../../features/maintenance/pages/MainDashboard";
import MachineDetailsDashboard from "../../features/maintenance/pages/MachineDetailsDashboard";
import LoginLayout from "../../features/userManagement/pages/LoginLayout";
import LogoutButton from "../../features/userManagement/components/logoutButton/LogoutButton";
import QrCodeTable from "../../features/maintenance/pages/QrCodeTable";
import SignInPage from "../../features/userManagement/pages/SignInPage";
import ForgotPasswordPage from "../../features/userManagement/pages/ForgotPasswordPage";
import AddMachineFormLayout from "../../features/maintenance/pages/AddMachineFormLayout";
import AddMachineForm from "../../features/maintenance/components/AddMachineForm";
import LandingPage from "../../features/landingPage/pages/landingPage";
import About from "../../features/landingPage/pages/About";
import ErrorPage from "../../shared/components/ui/errorPage";
import Dashboard from "../layout/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/", // Default route
        element: <LandingPage />, // Landing page
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
        element: <ForgotPasswordPage />, // Example new page
      },
      {
        path: "/login",
        element: <LoginLayout></LoginLayout>, // Example new page
      },
      {
        path: "*", // 404 Page Route
        element: <ErrorPage />, // 404 page
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard", // Default route
        element: <MainDashboard></MainDashboard>, // Sign-up layout
      },
      {
        path: "/dashboard/machine-monitoring", // Default route
        element: <MainDashboard></MainDashboard>, // Sign-up layout
      },
      {
        path: "/dashboard/machine-monitoring/:id", // Default route
        element: <MachineDetailsDashboard></MachineDetailsDashboard>, // Sign-up layout
      },
      {
        path: "/dashboard/machine-details", // Default route
        element: <QrCodeTable />,
      },
      {
        path: "/dashboard/add-machine", // Dashboard route
        element: <AddMachineFormLayout />, // Example new page
      },
      {
        path: "/dashboard/add-machine2", // Dashboard route
        element: <AddMachineForm />, // Example new page
      },
      {
        path: "/dashboard/employees", // Dashboard route
        element: <EmployeeListLayout></EmployeeListLayout>, // Example new page
      },
      {
        path: "*", // 404 Page Route
        element: <ErrorPage />, // 404 page
      },
    ],
  },
]);
