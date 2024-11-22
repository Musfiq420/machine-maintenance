import React from 'react';
import MachineStatus from '../../components/machineStatus/MachineStatus';
import CompleteStatus from '../../components/completeStatus/CompleteStatus';
import DashboardHeader from '../../../../shared/components/dashboardHeader/DashboardHeader';
const MainContent = () => {
    return (
        <div className="flex-1 p-8 bg-gray-50">
            <DashboardHeader></DashboardHeader>
            <CompleteStatus></CompleteStatus>
            <MachineStatus></MachineStatus>
        </div>
    );
};

export default MainContent;