import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import SMainComponent from '../SMainComponent/SMainComponent';
import Footer from '../Footer/Footer';

const MachineDetailsPage = () => {
    return (
        <div className="flex flex-col h-screen">
        <div className="flex flex-1">
        <Sidebar></Sidebar>
        <SMainComponent></SMainComponent>
        </div>
        <Footer></Footer>
      </div>
    );
};

export default MachineDetailsPage;