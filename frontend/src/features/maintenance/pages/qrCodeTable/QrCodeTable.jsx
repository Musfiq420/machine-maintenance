
import React from 'react';
import QrCodeGenerator from '../../components/qrCodeGenerator/QrCodeGenerator';
import DashboardSidebar from '../../../../shared/components/dashboardSidebar/DashboardSidebar';
import Footer from '../../../../shared/components/footer/Footer';

const QrCodeTable = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-1">
                {/* Make the sidebar fixed */}
                <div className="fixed top-0 left-0 h-full z-10">
                    <DashboardSidebar />
                </div>

                {/* Main Content with margin-left to make space for the sidebar */}
                <div className="flex-1 ml-64 overflow-auto">
                    <QrCodeGenerator />
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default QrCodeTable;





//If need his code, can use later

// import React from 'react';
// import QrCodeGenerator from '../../components/qrCodeGenerator/QrCodeGenerator';
// import DashboardSidebar from '../../../../shared/components/dashboardSidebar/DashboardSidebar';
// import Footer from '../../../../shared/components/footer/Footer';

// const QrCodeTable = () => {
//     return (
//         <div>
//             <div className="flex flex-col h-screen">
//             <div className="flex flex-1">
//                 <DashboardSidebar/>
//                 <QrCodeGenerator/>
//             </div>
//             <Footer/>
//         </div>
//         </div>
//     );
// };

// export default QrCodeTable;