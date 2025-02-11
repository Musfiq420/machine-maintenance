import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { UserContext } from "../../../../context/userProvider";
import DashboardLoading from "../../../../shared/components/dashboard/dashboardLoading";
import DashboardError from "../../../../shared/components/dashboard/dashboardError";

// -------------------------------------
// 1) MultiDateInput: For selecting multiple dates via a popup calendar
// -------------------------------------
const MultiDateInput = ({ selectedDates, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Display comma-separated dates
  const displayValue = selectedDates.map((d) => d.toLocaleDateString()).join(", ");

  // Toggle or remove date from array
  const handleDateChange = (date) => {
    if (!date) return;
    const index = selectedDates.findIndex(
      (d) => d.toDateString() === date.toDateString()
    );
    if (index > -1) {
      // remove
      const newDates = [...selectedDates];
      newDates.splice(index, 1);
      onChange(newDates);
    } else {
      // add
      onChange([...selectedDates, date]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        readOnly
        value={displayValue}
        onClick={() => setIsOpen(true)}
        className="border rounded p-2 w-full cursor-pointer bg-white"
        placeholder="Select date(s)"
      />
      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white shadow-lg rounded">
          <DatePicker
            inline
            onChange={handleDateChange}
            shouldCloseOnSelect={false}
            highlightDates={[
              {
                "react-datepicker__day--selected": selectedDates,
              },
            ]}
            onClickOutside={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

// -------------------------------------
// 2) FilterBar: date, floor, line, Apply
// -------------------------------------
const FilterBar = ({
  onApplyFilters,
  selectedDates,
  setSelectedDates,
  selectedFloor,
  setSelectedFloor,
  selectedLine,
  setSelectedLine,
  floors,
  lines,
}) => {
  // Filter lines based on selectedFloor
  const filteredLines = lines.filter(
    (line) => line.floor?.id?.toString() === selectedFloor
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert selectedDates to comma-separated YYYY-MM-DD
    const dateStrings = selectedDates
      .map((d) => d.toISOString().slice(0, 10))
      .join(",");

    onApplyFilters({
      date: dateStrings,
      floor: selectedFloor,
      line: selectedLine,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center mb-4"
    >
      <div className="bg-white rounded shadow px-6 py-4 w-full md:w-3/4 lg:w-1/2 flex flex-col md:flex-row items-center gap-4">
        {/* Date Picker Input */}
        <div className="flex-1">
          <label className="text-sm font-semibold text-gray-700 mb-1 block">
            Date (multiple select)
          </label>
          <MultiDateInput
            selectedDates={selectedDates}
            onChange={setSelectedDates}
          />
        </div>

        {/* Floor Dropdown */}
        <div className="flex-1">
          <label
            htmlFor="floor"
            className="text-sm font-semibold text-gray-700 mb-1 block"
          >
            Floor
          </label>
          <select
            id="floor"
            className="border rounded p-2 w-full"
            value={selectedFloor}
            onChange={(e) => {
              setSelectedFloor(e.target.value);
              setSelectedLine("");
            }}
          >
            <option value="">-- Select Floor --</option>
            {floors.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Line Dropdown */}
        <div className="flex-1">
          <label
            htmlFor="line"
            className="text-sm font-semibold text-gray-700 mb-1 block"
          >
            Line
          </label>
          <select
            id="line"
            className="border rounded p-2 w-full"
            value={selectedLine}
            onChange={(e) => setSelectedLine(e.target.value)}
            disabled={!selectedFloor}
          >
            <option value="">-- Select Line --</option>
            {filteredLines.map((line) => (
              <option key={line.id} value={line.id}>
                {line.name}
              </option>
            ))}
          </select>
        </div>

        {/* Apply Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-3 md:mt-6 self-start"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

// -------------------------------------
// 3) SummaryStats: show top-level stats
// -------------------------------------
const SummaryStats = ({ data }) => {
  const stats = [
    { label: "Total Lost Time", value: data?.total_lost_time },
    { label: "Total Machines", value: data?.total_machine_count },
    { label: "Active", value: data?.total_active_machines },
    { label: "Repairing", value: data?.total_repairing_machines },
    { label: "Idle", value: data?.total_idle_machines },
    { label: "Avg Response Time", value: data?.avg_time_to_respond },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-4 rounded shadow flex flex-col items-center"
        >
          <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
          <div className="text-xl font-bold text-gray-800">
            {stat.value || "N/A"}
          </div>
        </div>
      ))}
    </div>
  );
};

// -------------------------------------
// 4) TabBar: pick which summary table to show
// -------------------------------------
const TabBar = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { key: "machine_id", label: "By Machine ID" },
    { key: "type", label: "By Type" },
    { key: "problem", label: "By Problem" },
    { key: "line", label: "By Line" },
    { key: "day", label: "By Day" },
    { key: "mechanic", label: "By Mechanic" },
  ];

  return (
    <div className="flex border-b border-gray-200 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChangeTab(tab.key)}
          className={`px-4 py-2 text-sm font-semibold 
            ${
              activeTab === tab.key
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// -------------------------------------
// 5) CSV download helper
// -------------------------------------
function downloadCSV(filename, columns, data) {
  const header = columns.map((col) => col.label).join(",");
  const rows = data.map((row) =>
    columns
      .map((col) => {
        let val = row[col.key] ?? "";
        if (typeof val === "string") {
          val = `"${val.replace(/"/g, '""')}"`;
        }
        return val;
      })
      .join(",")
  );
  const csvContent = [header, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// -------------------------------------
// 6) SummaryTable: The table for whichever tab is active
// -------------------------------------
const SummaryTable = ({ columns, data, activeTab }) => {
  const handleDownload = () => {
    const fileName = `${activeTab}_summary_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    downloadCSV(fileName, columns, data);
  };

  return (
    <div className="overflow-x-auto bg-white p-4 rounded shadow relative mb-4">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 bg-gray-100"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(!data || data.length === 0) && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-2 text-center">
                No data found.
              </td>
            </tr>
          )}
          {data &&
            data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                {columns.map((col) => {
                  let cellValue = row[col.key] ?? "N/A";
                  // If tab = "machine_id" and col = "machine_id", link to machine details
                  if (
                    activeTab === "machine_id" &&
                    col.key === "machine_id" &&
                    cellValue !== "N/A"
                  ) {
                    cellValue = (
                      <Link
                        to={`/dashboard/machine-monitoring/${encodeURIComponent(
                          cellValue
                        )}`}
                        className="text-blue-600 underline"
                      >
                        {cellValue}
                      </Link>
                    );
                  }
                  return (
                    <td key={col.key} className="px-4 py-2 text-sm text-gray-800">
                      {cellValue}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>

      {/* Download CSV button */}
      <div className="flex justify-end mt-2">
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

// -------------------------------------
// 7) Visualization for each tab
//    We'll show a custom chart or set of charts below each table
// -------------------------------------

function TabVisualization({ activeTab, data }) {
  if (!data || data.length === 0) {
    return null; // no data to visualize
  }

  switch (activeTab) {
    case "machine_id":
      return <MachineIDCharts data={data} />;
    case "type":
      return <TypeCharts data={data} />;
    case "problem":
      return <ProblemCharts data={data} />;
    case "line":
      return <LineCharts data={data} />;
    case "day":
      return <DayCharts data={data} />;
    case "mechanic":
      return <MechanicCharts data={data} />;
    default:
      return null;
  }
}

// Example: MachineIDCharts
function MachineIDCharts({ data }) {
  // BarChart comparing total lost_time in minutes for each machine
  const parseLostTimeToMinutes = (lostTimeStr) => {
    // If invalid, return 0
    let days = 0;
    let timePart = "0:00:00";
    if (lostTimeStr.includes("days") || lostTimeStr.includes("day")) {
      const [daysPart, hmsPart] = lostTimeStr.split(", ");
      // e.g. "4 days"
      days = parseInt(daysPart) || 0;
      timePart = hmsPart.trim();
    } else {
      timePart = lostTimeStr.trim();
    }
    // timePart e.g. "2:30:45"
    const [hh, mm, ss] = timePart.split(":");
    const hours = parseInt(hh) || 0;
    const mins = parseInt(mm) || 0;
    const secs = parseInt(ss) || 0;
    return days * 1440 + hours * 60 + mins + secs / 60.0; // total minutes
  };

  const chartData = data.map((item) => ({
    machine_id: item.machine_id,
    lostTimeMins: parseLostTimeToMinutes(item.lost_time || "0:00:00"),
    breakdowns: item.breakdowns_count,
  }));

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-gray-700 text-lg font-semibold mb-2">
        Lost Time (minutes) by Machine
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="machine_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="lostTimeMins" fill="#82ca9d" name="Lost Time (mins)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Example: TypeCharts
function TypeCharts({ data }) {
  // nameKey = type, value = breakdowns_count
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#8dd1e1"];

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-gray-700 text-lg font-semibold mb-2">
        Breakdown Count by Machine Type
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data.map((d) => ({
              name: d.type || "N/A",
              value: d.breakdowns_count,
            }))}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Example: ProblemCharts
function ProblemCharts({ data }) {
  // BarChart for problems vs breakdown count
  const chartData = data.map((p) => ({
    problem: p.problem || "N/A",
    breakdowns: p.breakdowns_count,
  }));

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-gray-700 text-lg font-semibold mb-2">
        Breakdowns by Problem
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="problem" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="breakdowns" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Example: LineCharts
function LineCharts({ data }) {
  // bar chart showing lost_time in minutes, or a bar chart for breakdowns_count
  const parseLostTimeToMinutes = (str) => {
    if (!str) return 0;
    // Quick parse for "X days, HH:MM:SS" or "HH:MM:SS"
    let days = 0;
    let timePart = str;
    if (str.includes("day")) {
      const [daysPart, hmsPart] = str.split(",");
      days = parseInt(daysPart) || 0;
      timePart = hmsPart.trim();
    }
    const [hh, mm, ss] = timePart.split(":");
    const hours = parseInt(hh) || 0;
    const mins = parseInt(mm) || 0;
    const secs = parseInt(ss) || 0;
    return days * 1440 + hours * 60 + mins + secs / 60.0;
  };
  const chartData = data.map((l) => ({
    line: l.line || `Line ${l.id}`,
    lostTimeMins: parseLostTimeToMinutes(l.lost_time),
    breakdowns: l.breakdowns_count,
  }));

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-gray-700 text-lg font-semibold mb-2">
        Lost Time (minutes) by Line
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="line" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="lostTimeMins" fill="#82ca9d" name="Lost Time (mins)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Example: DayCharts
function DayCharts({ data }) {
  // line chart for day => breakdowns_count
  const chartData = data.map((d) => ({
    date: d.date,
    breakdowns: d.breakdowns_count,
  }));

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-gray-700 text-lg font-semibold mb-2">
        Breakdowns Over Days
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="breakdowns"
            stroke="#8884d8"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Example: MechanicCharts
function MechanicCharts({ data }) {
  // bar chart of breakdowns_count by mechanic ID
  const chartData = data.map((m) => ({
    mechanic_id: m.id === null ? "Unknown" : `Mech #${m.id}`,
    breakdowns: m.breakdowns_count,
  }));

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-gray-700 text-lg font-semibold mb-2">
        Breakdowns By Mechanic
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mechanic_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="breakdowns" fill="#ff7f7f" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// -------------------------------------
// 8) The main component
// -------------------------------------
export default function AllMachineDetails() {
  const { getToken } = useContext(UserContext);

  // States for floors, lines
  const [floors, setFloors] = useState([]);
  const [lines, setLines] = useState([]);

  // Filter states
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedLine, setSelectedLine] = useState("");

  // Loading / Error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Lost-time API response
  const [responseData, setResponseData] = useState(null);

  // Active summary tab
  const [activeTab, setActiveTab] = useState("machine_id");

  // Define table columns for each tab
  const columnsByMachineID = [
    { key: "id", label: "ID" },
    { key: "machine_id", label: "Machine ID" },
    { key: "status", label: "Status" },
    { key: "type", label: "Type" },
    { key: "breakdowns_count", label: "Breakdowns Count" },
    { key: "lost_time", label: "Lost Time" },
  ];
  const columnsByType = [
    { key: "type", label: "Type" },
    { key: "machine_count", label: "Machine Count" },
    { key: "breakdowns_count", label: "Breakdowns Count" },
    { key: "lost_time", label: "Lost Time" },
  ];
  const columnsByProblem = [
    { key: "problem", label: "Problem" },
    { key: "breakdowns_count", label: "Breakdowns Count" },
    { key: "lost_time", label: "Lost Time" },
  ];
  const columnsByLine = [
    { key: "id", label: "Line ID" },
    { key: "line", label: "Line Name" },
    { key: "breakdowns_count", label: "Breakdowns Count" },
    { key: "lost_time", label: "Lost Time" },
  ];
  const columnsByDay = [
    { key: "date", label: "Date" },
    { key: "breakdowns_count", label: "Breakdowns Count" },
    { key: "lost_time", label: "Lost Time" },
  ];
  const columnsByMechanic = [
    { key: "id", label: "Mechanic ID" },
    { key: "avg_time_to_respond", label: "Avg Time to Respond" },
    { key: "breakdowns_count", label: "Breakdowns Count" },
    { key: "lost_time", label: "Lost Time" },
  ];

  // Decide which summary to show (table)
  const renderSummaryTable = () => {
    if (!responseData) return null;

    switch (activeTab) {
      case "machine_id":
        return (
          <SummaryTable
            columns={columnsByMachineID}
            data={responseData.summary_by_machine_id || []}
            activeTab={activeTab}
          />
        );
      case "type":
        return (
          <SummaryTable
            columns={columnsByType}
            data={responseData.summary_by_type || []}
            activeTab={activeTab}
          />
        );
      case "problem":
        return (
          <SummaryTable
            columns={columnsByProblem}
            data={responseData.summary_by_problem || []}
            activeTab={activeTab}
          />
        );
      case "line":
        return (
          <SummaryTable
            columns={columnsByLine}
            data={responseData.summary_by_line || []}
            activeTab={activeTab}
          />
        );
      case "day":
        return (
          <SummaryTable
            columns={columnsByDay}
            data={responseData.summary_by_day || []}
            activeTab={activeTab}
          />
        );
      case "mechanic":
        return (
          <SummaryTable
            columns={columnsByMechanic}
            data={responseData.summary_by_mechanic || []}
            activeTab={activeTab}
          />
        );
      default:
        return null;
    }
  };

  // Decide which data array to pass to TabVisualization

  const getTabData = () => {
    if (!responseData) return [];
    switch (activeTab) {
      case "machine_id":
        return responseData.summary_by_machine_id || [];
      case "type":
        return responseData.summary_by_type || [];
      case "problem":
        return responseData.summary_by_problem || [];
      case "line":
        return responseData.summary_by_line || [];
      case "day":
        return responseData.summary_by_day || [];
      case "mechanic":
        return responseData.summary_by_mechanic || [];
      default:
        return [];
    }
  };

  // Fetch floors
  const fetchFloors = async () => {
    try {
      const token = getToken();
      const res = await fetch(
        `${import.meta.env.VITE_URL_PREFIX}/production/floors/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setFloors(data || []);
    } catch (error) {
      console.error("Error fetching floors:", error);
    }
  };

  // Fetch lines
  const fetchLines = async () => {
    try {
      const token = getToken();
      const res = await fetch(
        `${import.meta.env.VITE_URL_PREFIX}/production/lines/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setLines(data || []);
    } catch (error) {
      console.error("Error fetching lines:", error);
    }
  };

  // Main fetch function
  const fetchData = async ({ floor, line, date }) => {
    setLoading(true);
    setError(false);
    setResponseData(null);

    const token = getToken();
    let query = [];
    if (floor) query.push(`floor=${encodeURIComponent(floor)}`);
    if (line) query.push(`line=${encodeURIComponent(line)}`);
    if (date) query.push(`date=${encodeURIComponent(date)}`);
    const queryString = query.length > 0 ? `?${query.join("&")}` : "";

    try {
      const url = `${import.meta.env.VITE_URL_PREFIX}/maintenance/breakdown-logs/total-lost-time-per-location/${queryString}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setResponseData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching summary data:", error);
      setError(true);
      setLoading(false);
    }
  };

  // On mount, fetch floors & lines & default data
  useEffect(() => {
    fetchFloors();
    fetchLines();

    // Default to today's date
    const today = new Date();
    const defaultDate = today.toISOString().slice(0, 10);
    setSelectedDates([today]);
    // fetch default data (no floor, no line, today's date)
    fetchData({ date: defaultDate, floor: "", line: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-50">
      {/* Filter Bar */}
      <FilterBar
        onApplyFilters={fetchData}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        selectedFloor={selectedFloor}
        setSelectedFloor={setSelectedFloor}
        selectedLine={selectedLine}
        setSelectedLine={setSelectedLine}
        floors={floors}
        lines={lines}
      />

      {/* Loading / Error */}
      {loading && <DashboardLoading title={"Loading Summaries"} />}
      {error && <DashboardError title={"Summary Error"} />}

      {/* If no error and not loading, show data */}
      {!loading && !error && responseData && (
        <>
          <SummaryStats data={responseData} />

          <TabBar activeTab={activeTab} onChangeTab={setActiveTab} />

          {/* Table for the selected tab */}
          {renderSummaryTable()}

          {/* Visualization for the selected tab (below the table) */}
          <TabVisualization activeTab={activeTab} data={getTabData()} />
        </>
      )}
    </div>
  );
}









// import React, { useState, useEffect, useContext } from "react";
// import { FaArrowUp, FaArrowDown, FaQuestionCircle } from "react-icons/fa";
// import PieChartComponent from "../../../../shared/components/PieChartComponent";
// import { getApiUrl } from "../../../../shared/components/getApiUrl";
// import { UserContext } from "../../../../context/userProvider";
// import { Link, useSearchParams } from "react-router-dom";
// import DashboardLoading from "../../../../shared/components/dashboard/dashboardLoading";
// import DashboardError from "../../../../shared/components/dashboard/dashboardError";
// import MachineCards from "../../../../shared/components/cards/machineCards";
// import FormInputFields from "../../../../shared/components/ui/formInputFields";
// import MachineLineForm from "../../../../shared/components/forms/machineLineForm";

// const AllMachineDetails = () => {
//   const [machines, setMachines] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);
//   const { getToken } = useContext(UserContext);

//   const [stats, setStats] = useState([]);

//   // Fetch lines and floors dynamically

//   // Fetch machine data based on selected floor and lines
//   const fetchMachines = async (floor, lines) => {
//     setError(false);
//     const token = getToken();
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `${
//           import.meta.env.VITE_URL_PREFIX
//         }/maintenance/breakdown-logs/total-lost-time-per-location/?floor=${floor}&line=${lines}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const res = await response.json();
//       setMachines(res.machines);
//       setLoading(false);
//       setStats([
//         { stat: "Total Lost Time", value: res.total_lost_time },
//         { stat: "Total Machines", value: res.total_machine_count },
//         { stat: "Active", value: res.total_active_machines },
//         {
//           stat: "Broken",
//           value:
//             res.total_machine_count -
//             (res.total_active_machines +
//               res.total_repairing_machines +
//               res.total_idle_machines),
//         },
//         { stat: "Repairing", value: res.total_repairing_machines },
//         // { stat: "Idle", value: res.total_idle_machines },
//       ]);
//     } catch (error) {
//       console.error("Error fetching machines:", error);
//       setError(true);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const selectedFloor = decodeURI(searchParams.get("floor")).split(",");
//     const selectedLine = decodeURI(searchParams.get("line")).split(",");
//     if (selectedFloor.length && selectedLine.length) {
//       fetchMachines(selectedFloor, selectedLine);
//     }
//   }, [searchParams]);

//   return (
//     <div className="bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6 min-h-screen">
//       {/* Dropdowns for Floor and Line Selection */}
//       <MachineLineForm />

//       {/* Loading and Error States */}
//       {loading && <DashboardLoading title={"Machines"} />}
//       {error && <DashboardError title={"Machines"} />}

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
//         {stats.map((stat) => (
//           <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col space-y-2">
//             <h2 className="text-sm text-gray-500 font-semibold">{stat.stat}</h2>
//             <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
//             {/* {stat.change && (
//                   <div
//                     className={`flex items-center ${
//                       stat.change > 0 ? "text-green-500" : "text-red-500"
//                     } space-x-1 text-sm my-1 font-semibold `}
//                   >
//                     {stat.change > 0 ? <FaArrowUp /> : <FaArrowDown />}
//                     <span> {stat.change}</span>
//                   </div>
//                 )} */}
//           </div>
//         ))}
//       </div>

//       {/* Machine Grid */}
//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
//         {machines.map((machine) => (
//           <MachineCards
//             machine_id={encodeURIComponent(machine.machine_id)}
//             status={machine.status}
//             type={machine.type}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllMachineDetails;
