import Footer from "../../../shared/components/footer/Footer";
import EmployeeList from "../components/employeeList/EmployeeList";
import DashboardSidebar from "../../../shared/components/dashboard/DashboardSidebar";
import DashboardWrapper from "../../../shared/components/dashboard/dashboardWrapper";

const EmployeeListLayout = () => {
  return (
    <DashboardWrapper>
      <EmployeeList />
    </DashboardWrapper>
  );
};

export default EmployeeListLayout;
