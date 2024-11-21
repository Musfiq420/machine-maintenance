import React from "react";

const MachineDetails = () => {
  return (
    <div className="bg-green-50 p-6 rounded-lg shadow-lg">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-green-800">Machine #45</h1>
          <h2 className="text-lg text-green-700">Single Needle</h2>
          <p className="text-gray-500">
            Collar Join <span className="text-gray-700 font-medium">By Mehedi Hasan</span>
          </p>
        </div>
        <div className="w-2/3">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Breakdown Timeline</h3>
          <div className="w-full bg-gray-200 h-4 rounded-lg flex">
            <div className="bg-green-400 h-4 rounded-l-lg" style={{ width: "70%" }}></div>
            <div className="bg-yellow-400 h-4" style={{ width: "10%" }}></div>
            <div className="bg-red-400 h-4 rounded-r-lg" style={{ width: "20%" }}></div>
          </div>
          <div className="flex justify-between text-gray-500 text-sm mt-1">
            <span>8</span>
            <span>9</span>
            <span>10</span>
            <span>11</span>
            <span>12</span>
            <span>13</span>
            <span>14</span>
            <span>15</span>
            <span>16</span>
            <span>17</span>
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Lost Time</p>
          <h3 className="text-xl font-bold text-gray-800">13 mins</h3>
        </div>
        <div className="text-center bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Utilization</p>
          <h3 className="text-xl font-bold text-gray-800">89%</h3>
        </div>
        <div className="text-center bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Cycle Time</p>
          <h3 className="text-xl font-bold text-gray-800">56s</h3>
        </div>
        <div className="text-center bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Quality</p>
          <h3 className="text-xl font-bold text-gray-800">93%</h3>
        </div>
      </div>
    </div>
  );
};

export default MachineDetails;
