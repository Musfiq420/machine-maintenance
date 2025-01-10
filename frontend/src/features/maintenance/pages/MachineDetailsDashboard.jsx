import MachineDetails from "../components/machineDetails/MachineDetails";
import DashboardWrapper from "../../../shared/components/dashboard/dashboardWrapper";
import MaintenanceDashboardHeader from "../components/MaintenanceDashboardHeader";

const MachineDetailsDashboard = () => {
  return (
    <DashboardWrapper>
      <MaintenanceDashboardHeader />
      <MachineDetails />
    </DashboardWrapper>
  );
};

export default MachineDetailsDashboard;
