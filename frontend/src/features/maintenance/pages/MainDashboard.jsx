import React, { useContext } from "react";
import DashboardSidebar from "../../../shared/components/dashboard/DashboardSidebar";
import MachineStatus from "../components/machineStatus/MachineStatus";
import CompleteStatus from "../components/completeStatus/CompleteStatus";
import DashboardHeader from "../../../shared/components/dashboard/DashboardHeader";
import Footer from "../../../shared/components/footer/Footer";
import AllMachineDetails from "../components/machine-monitoring/AllMachineDetails";
import { UserContext } from "../../../context/userProvider";
import DashboardWrapper from "../../../shared/components/dashboard/dashboardWrapper";

const MainDashboard = () => {
  return (
    <DashboardWrapper>
      <AllMachineDetails />
    </DashboardWrapper>
  );
};

export default MainDashboard;
