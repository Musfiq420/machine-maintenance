import MachineDetails from "../components/machineDetails/MachineDetails";
import DashboardWrapper from "../../../shared/components/dashboard/dashboardWrapper";
import MaintenanceDashboardHeader from "../../../shared/components/dashboard/DashboardHeader";

const MachineDetailsDashboard = () => {
  return (
    <DashboardWrapper>
      <MachineDetails />
    </DashboardWrapper>
  );
};

export default MachineDetailsDashboard;
