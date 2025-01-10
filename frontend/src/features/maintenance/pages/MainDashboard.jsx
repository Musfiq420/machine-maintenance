import React, { useContext } from "react";
import AllMachineDetails from "../components/machine-monitoring/AllMachineDetails";
import DashboardWrapper from "../../../shared/components/dashboard/dashboardWrapper";
import MaintenanceDashboardHeader from "../components/MaintenanceDashboardHeader";

const MainDashboard = () => {
  return (
    <DashboardWrapper>
      <MaintenanceDashboardHeader />
      <AllMachineDetails />
    </DashboardWrapper>
  );
};

export default MainDashboard;
