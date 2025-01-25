import React, { useState, useEffect, useContext } from "react";
import { FaArrowUp, FaArrowDown, FaQuestionCircle } from "react-icons/fa";
import PieChartComponent from "../../../../shared/components/PieChartComponent";
import { getApiUrl } from "../../../../shared/components/getApiUrl";
import { UserContext } from "../../../../context/userProvider";
import { Link, useSearchParams } from "react-router-dom";
import DashboardLoading from "../../../../shared/components/dashboard/dashboardLoading";
import DashboardError from "../../../../shared/components/dashboard/dashboardError";
import MachineCards from "../../../../shared/components/cards/machineCards";
import FormInputFields from "../../../../shared/components/ui/formInputFields";
import MachineLineForm from "../../../../shared/components/forms/machineLineForm";

const AllMachineDetails = () => {
  const [machines, setMachines] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { getToken } = useContext(UserContext);

  const [stats, setStats] = useState([]);

  // Fetch lines and floors dynamically

  // Fetch machine data based on selected floor and lines
  const fetchMachines = async (floor, lines) => {
    setError(false);
    const token = getToken();
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_URL_PREFIX
        }/api/maintenance/breakdown-logs/total-lost-time-per-location/?floor=${floor}&line=${lines}`,
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
        {
          stat: "Broken",
          value:
            res.total_machine_count -
            (res.total_active_machines +
              res.total_repairing_machines +
              res.total_idle_machines),
        },
        { stat: "Repairing", value: res.total_repairing_machines },
        // { stat: "Idle", value: res.total_idle_machines },
      ]);
    } catch (error) {
      console.error("Error fetching machines:", error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedFloor = decodeURI(searchParams.get("floor")).split(",");
    const selectedLine = decodeURI(searchParams.get("line")).split(",");
    if (selectedFloor.length && selectedLine.length) {
      fetchMachines(selectedFloor, selectedLine);
    }
  }, [searchParams]);

  return (
    <div className="bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6 min-h-screen">
      {/* Dropdowns for Floor and Line Selection */}
      <MachineLineForm />

      {/* Loading and Error States */}
      {loading && <DashboardLoading title={"Machines"} />}
      {error && <DashboardError title={"Machines"} />}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
        {stats.map((stat) => (
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
            <h2 className="text-sm text-gray-500 font-semibold">{stat.stat}</h2>
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
