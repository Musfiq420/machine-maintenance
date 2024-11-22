import DashboardHeader from '../../../../shared/components/dashboardHeader/DashboardHeader';
import MachineDetails from '../../components/machineDetails/MachineDetails';
import TrendChart from '../../../../shared/components/trendChart/TrendChart';
import Footer from '../../../../shared/components/footer/Footer';
import DashboardSidebar from '../../../../shared/components/dashboardSidebar/DashboardSidebar';

const MachineDetailsDashboard = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <DashboardSidebar></DashboardSidebar>
                <div className="flex-1 p-8 bg-gray-50">
                    <DashboardHeader></DashboardHeader>
                    <MachineDetails></MachineDetails>
                    <TrendChart></TrendChart>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MachineDetailsDashboard;