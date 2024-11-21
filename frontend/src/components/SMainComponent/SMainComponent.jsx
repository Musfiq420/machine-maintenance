import React from 'react';
import Header from '../Header/Header';
import MachineDetails from '../MachineDetails/MachineDetails';
import TrendChart from '../TrendChart/TrendChart';
import Sidebar from '../Sidebar/Sidebar';

const SMainComponent = () => {
  return (
    <div className="flex-1 p-8 bg-gray-50">
      <Header />
      <MachineDetails></MachineDetails>
      <TrendChart></TrendChart>
    </div>
    
  );
};

export default SMainComponent;