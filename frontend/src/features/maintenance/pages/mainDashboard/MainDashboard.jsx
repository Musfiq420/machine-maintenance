import React from 'react';
import DashboardSidebar from '../../../../shared/components/dashboardSidebar/DashboardSidebar';

import Footer from '../../../../shared/components/footer/Footer';
import MainContent from '../mainContent/MainContent';


const MainDashboard = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                <DashboardSidebar></DashboardSidebar>
                <MainContent></MainContent>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainDashboard;