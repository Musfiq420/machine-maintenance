import React, { useState, useEffect, useContext } from "react";
import { FaArrowUp, FaArrowDown, FaQuestionCircle } from "react-icons/fa";
import PieChartComponent from "../../../../shared/components/PieChartComponent";
import { getApiUrl } from "../../../../shared/components/getApiUrl";
import { UserContext } from "../../../../context/userProvider";
import { Link } from "react-router-dom";
import DashboardLoading from "../../../../shared/components/dashboard/dashboardLoading";
import DashboardError from "../../../../shared/components/dashboard/dashboardError";
import MachineCards from "../../../../shared/components/cards/machineCards";
import FormInputFields from "../../../../shared/components/ui/formInputFields";

const AllMachineDetails = () => {
  const [location, setLocation] = useState([]); // Dynamic location data
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { getToken } = useContext(UserContext);

  const [selectedFloor, setSelectedFloor] = useState([]);
  const [selectedLine, setSelectedLine] = useState([]);

  const [stats, setStats] = useState([]);

  // Fetch lines and floors dynamically
  const fetchLines = async () => {
    const token = getToken();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_PREFIX}/api/production/lines/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      const formattedLocation = res.reduce((acc, curr) => {
        const floor = acc.find((f) => f.id === curr.floor.id);
        if (floor) {
          floor.line.push({ id: curr.id, name: curr.name });
        } else {
          acc.push({
            id: curr.floor.id,
            name: curr.floor.name,
            line: [{ id: curr.id, name: curr.name }],
          });
        }
        return acc;
      }, []);
      setLocation(formattedLocation);
    } catch (error) {
      console.error("Error fetching lines:", error);
    }
  };

  // Fetch machine data based on selected floor and lines
  const fetchMachines = async (floor, lines) => {
    setError(false);
    const token = getToken();
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_URL_PREFIX}/api/maintenance/breakdown-logs/total-lost-time-per-location/?floor=${floor}&line=${lines}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      setMachines(res.machines);
      setLoading(false);
      setStats([
        { stat: "Total Lost Time", value: res.total_lost_time },
        { stat: "Total Machines", value: res.total_machine_count },
        { stat: "Active", value: res.total_active_machines },
        { stat: "Broken", value: (res.total_machine_count - (res.total_active_machines + res.total_repairing_machines + res.total_idle_machines)) },
        { stat: "Repairing", value: res.total_repairing_machines },
        // { stat: "Idle", value: res.total_idle_machines },
      ]);
    } catch (error) {
      console.error("Error fetching machines:", error);
      setError(true);
      setLoading(false);
    }
  };

  const fields = [
    {
      input: selectedFloor,
      name: "Floors",
      prefix: "Floor",
      id: "floor",
      options: location.map((l) => ({ id: l.id, name: l.name })), // Pass value and label
      setInput: (id, value) => setSelectedFloor(value),
    },
    {
      input: selectedLine,
      name: "Lines",
      prefix: "Line",
      id: "line",
      options: [
        ...new Set(
          location
            .filter((l) => selectedFloor.includes(l.id))
            .reduce((prev, curr) => [...prev, ...curr?.line], [])
        ),
      ]
        .map((line) => ({ id: line.id, name: line.name })), // Pass value and label
      setInput: (id, value) => setSelectedLine(value),
    },
  ];

  useEffect(() => {
    fetchLines();
  }, []);

  useEffect(() => {
    if (selectedFloor.length && selectedLine.length) {
      fetchMachines(selectedFloor, selectedLine);
    }
  }, [selectedLine, selectedFloor]);

  return (
    <div className="bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6 min-h-screen">
      {/* Dropdowns for Floor and Line Selection */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((f) => (
          <FormInputFields
            key={f.id}
            input={f.input}
            name={f.name}
            id={f.id}
            options={f.options} // Pass correctly formatted options
            option_pref={f.prefix}
            setInput={f.setInput}
            errorField={[]}
            multiple={true}
            type="select"
          />
        ))}
      </div>

      {/* Loading and Error States */}
      {loading && <DashboardLoading title={"Machines"} />}
      {error && <DashboardError title={"Machines"} />}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
            {stats.map((stat) => (
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
                <h2 className="text-sm text-gray-500 font-semibold">
                  {stat.stat}
                </h2>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                {/* {stat.change && (
                  <div
                    className={`flex items-center ${
                      stat.change > 0 ? "text-green-500" : "text-red-500"
                    } space-x-1 text-sm my-1 font-semibold `}
                  >
                    {stat.change > 0 ? <FaArrowUp /> : <FaArrowDown />}
                    <span> {stat.change}</span>
                  </div>
                )} */}
              </div>
            ))}
          </div>

      {/* Machine Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {machines.map((machine) => (
              <MachineCards
                machine_id={encodeURIComponent(machine.machine_id)}
                status={machine.status}
                type={machine.type}
              />
            ))}
          </div>
    </div>
  );
};

export default AllMachineDetails;
