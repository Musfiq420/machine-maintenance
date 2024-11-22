

const CompleteStatus = () => {
  return (
    <div>
      {/* Dropdown */}
      <div className="mb-6">
        <select className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none">
          <option>Select Block</option>
          <option>Block A</option>
          <option>Block B</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-sm text-gray-500">Total Lost Time</h2>
          <p className="text-xl font-bold">2:13 hrs</p>
          <span className="text-green-500 text-sm">+5.9%</span>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-sm text-gray-500">Total Machines</h2>
          <p className="text-xl font-bold">431</p>
          <span className="text-green-500 text-sm">+5.9%</span>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-sm text-gray-500">Active</h2>
          <p className="text-xl font-bold">420</p>
          <span className="text-green-500 text-sm">+5.9%</span>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-sm text-gray-500">Repairing</h2>
          <p className="text-xl font-bold">12</p>
          <span className="text-green-500 text-sm">+5.9%</span>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-sm text-gray-500">Idle</h2>
          <p className="text-xl font-bold">11</p>
          <span className="text-green-500 text-sm">+5.9%</span>
        </div>
      </div>
    </div>
  );
};

export default CompleteStatus;