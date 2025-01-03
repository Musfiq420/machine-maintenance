import Footer from "../../../shared/components/footer/Footer";
import EmployeeList from "../components/employeeList/EmployeeList";
import DashboardSidebar from "../../../shared/components/dashboardSidebar/DashboardSidebar";

const EmployeeListLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Sidebar with fixed width */}
        <div className="w-64">
          <DashboardSidebar />
        </div>
        {/* Employee List takes remaining space */}
        <div className="flex-1 overflow-auto">
          <EmployeeList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeListLayout;
