import DashboardWrapper from "../../../shared/components/dashboard/dashboardWrapper";
import LostTimeVisualDashboard from "../components/machine-monitoring/VisualDashboard";

const VisualDashboardPage = () => {
  return (
    <DashboardWrapper>
      <LostTimeVisualDashboard/>
    </DashboardWrapper>
  );
};

export default VisualDashboardPage;
