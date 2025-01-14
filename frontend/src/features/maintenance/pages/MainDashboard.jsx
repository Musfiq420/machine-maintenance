import React, { useContext } from "react";
import AllMachineDetails from "../components/machine-monitoring/AllMachineDetails";
import DashboardWrapper from "../../../shared/components/dashboard/dashboardWrapper";
import MaintenanceDashboardHeader from "../../../shared/components/dashboard/DashboardHeader";

const MainDashboard = () => {
  return (
    <DashboardWrapper>
      <AllMachineDetails />
    </DashboardWrapper>
  );
};

export default MainDashboard;
