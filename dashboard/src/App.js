import React, { useState, useEffect } from "react";
import "./App.css";
import api from "./api";

const App = () => {
  const [blocks, setBlocks] = useState([]); // List of blocks
  const [selectedBlock, setSelectedBlock] = useState(1);
  const [machines, setMachines] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    // Fetch initial data
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    // Mock API call for blocks
    const blocks = await api.get('machines/');// Assuming this returns blocks
    const uniqueBlocks = [...new Set(blocks.data.map((m) => m.block_no))];
    setBlocks(uniqueBlocks);
    if (uniqueBlocks.length > 0) {
      setSelectedBlock(uniqueBlocks[0]);
    }
  };

  const fetchMachines = async (block) => {
    const response = await api.get('machines/');
    
    const blockMachines = response.data.filter(machine => machine.block_no == block);
    console.log(blockMachines);
    setMachines(blockMachines);
    calculateSummary(blockMachines);
  };

  const calculateSummary = (data) => {
    const totalMachines = data.length;
    const active = data.filter((m) => m.status === "Running").length;
    const repairing = data.filter((m) => m.status === "Under Maintenance").length;
    const idle = data.filter((m) => m.status === "Broken").length;

    setSummary({
      totalMachines,
      active,
      repairing,
      idle,
      lostTime: data.reduce((acc, m) => acc + (m.lost_time || 0), 0),
    });
  };

  useEffect(() => {
    if (selectedBlock) {
      fetchMachines(selectedBlock);
    }
  }, [selectedBlock]);

  return (
    <div className="container">
      <h1>Machine Monitoring</h1>
      
      {/* Block Selector */}
      <div className="block-selector">
        <label>Select Block: </label>
        <select onChange={(e) => setSelectedBlock(e.target.value)
          } value={selectedBlock}>
          {blocks.map((block) => (
            <option key={block} value={block}>
              Block {block}
            </option>
          ))}
        </select>
      </div>
      
      {/* Summary Cards */}
      <div className="summary-cards">
        <SummaryCard title="Total Machines" value={summary.totalMachines} />
        <SummaryCard title="Active Machines" value={summary.active} />
        <SummaryCard title="Repairing Machines" value={summary.repairing} />
        <SummaryCard title="Idle Machines" value={summary.idle} />
        <SummaryCard title="Total Lost Time" value={summary.lostTime} />
      </div>
      
      {/* Machine Grid */}
      <div className="machine-grid">
        {[...new Set(machines.map((m) => m.line_no))].map((line) => (
          <div key={line} className="line-column">
            <h4>Line {line}</h4>
            {machines
              .filter((m) => m.line_no === line)
              .map((machine) => (
                <MachineCard key={machine.id} machine={machine} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value }) => (
  <div className="summary-card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

const MachineCard = ({ machine }) => {
  const statusColors = {
    "Running": "lightgreen",
    "Under Maintenance": "lightyellow",
    "Broken": "lightcoral", // light red
  };
  
  return (<div className="machine-card"
    style={{ backgroundColor: statusColors[machine.status] || "white" }}
  >
    <h5>{machine.name}</h5>
    <p>Status: {machine.status}</p>
    <p>Model: {machine.model_number}</p>
    <p>Location: {machine.location}</p>
  </div>)
};

export default App;
