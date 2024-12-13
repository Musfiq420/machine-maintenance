
import React from 'react';
import DashboardSidebar from '../../../shared/components/dashboardSidebar/DashboardSidebar';
import AddMachineForm from '../components/AddMachineForm';
import Footer from '../../../shared/components/footer/Footer';

const AddMachineFormLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                {/* Make the sidebar fixed */}
                <div className="fixed top-0 left-0 h-full z-10">
                    <DashboardSidebar/>
                </div>

                {/* Main Content with margin-left to make space for the sidebar */}
                <div className="flex-1 ml-64 overflow-auto">
                    <AddMachineForm/>
                </div>
            </div>
            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default AddMachineFormLayout;