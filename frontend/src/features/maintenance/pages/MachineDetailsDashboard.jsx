import DashboardHeader from "../../../shared/components/dashboardHeader/DashboardHeader";
import MachineDetails from "../components/machineDetails/MachineDetails";
import TrendChart from "../../../shared/components/trendChart/TrendChart";
import Footer from "../../../shared/components/footer/Footer";
import DashboardSidebar from "../../../shared/components/dashboardSidebar/DashboardSidebar";

const MachineDetailsDashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Make the sidebar fixed */}
        <div className="fixed top-0 left-0 h-full z-10">
          <DashboardSidebar />
        </div>

        {/* Main Content with margin-left to make space for the sidebar */}
        <div className="flex-1 ml-64 overflow-auto">
          <DashboardHeader />
          <MachineDetails />
          <TrendChart />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MachineDetailsDashboard;
