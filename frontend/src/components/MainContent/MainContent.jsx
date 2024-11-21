import React from 'react';
import Header from '../Header/Header';
import Status from '../Status/Status';
import MachineStatus from '../MachineStatus/MachineStatus';

const MainContent = () => {
  return (
    <div className="flex-1 p-8 bg-gray-50">
      <Header />
      <Status></Status>
      <MachineStatus />
    </div>
  );
};

export default MainContent;

