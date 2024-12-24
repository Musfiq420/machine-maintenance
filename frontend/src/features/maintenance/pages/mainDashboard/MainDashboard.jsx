import React from 'react';
import DashboardSidebar from '../../../../shared/components/dashboardSidebar/DashboardSidebar';
import MachineStatus from '../../components/machineStatus/MachineStatus';
import CompleteStatus from '../../components/completeStatus/CompleteStatus';
import DashboardHeader from '../../../../shared/components/dashboardHeader/DashboardHeader';
import Footer from '../../../../shared/components/footer/Footer';
import AllMachineDetails from '../../components/AllMachineDetails';

const MainDashboard = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                {/* Make the sidebar fixed */}
                <div className="fixed top-0 left-0 h-full z-10">
                    <DashboardSidebar />
                </div>

                {/* Main Content with margin-left to make space for the sidebar */}
                <div className="flex-1 ml-64 overflow-auto">
                    <div className="flex-1 p-8 bg-gray-50">
                        <DashboardHeader/>
                        <AllMachineDetails/>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainDashboard;
