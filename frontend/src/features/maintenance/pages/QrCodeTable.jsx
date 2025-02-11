import React from "react";
import DashboardWrapper from "../../../shared/components/dashboard/dashboardWrapper";
import MachineTable from "../components/machineTablePagination/machineTablePagination"

const QrCodeTable = () => {
  return (
    <DashboardWrapper>
      {/* <MachineTable /> */}
      <MachineTable />
    </DashboardWrapper>
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
