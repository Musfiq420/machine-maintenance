import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../../context/userProvider";
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

//
// 1) A filter bar for date, floor, line
//
const LostTimeFilterBar = ({
  floors,
  lines,
  selectedDates,
  setSelectedDates,
  selectedFloor,
  setSelectedFloor,
  selectedLine,
  setSelectedLine,
  onFetchData,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Filter lines based on selectedFloor
  const filteredLines = lines.filter(
    (l) => l.floor?.id?.toString() === selectedFloor
  );

  // Convert selectedDates to comma-separated for the API
  const getDateString = () => {
    return selectedDates
      .map((date) => date.toISOString().slice(0, 10))
      .join(",");
  };

  // On apply
  const handleApply = () => {
    const date = getDateString();
    onFetchData({
      floor: selectedFloor,
      line: selectedLine,
      date: date,
    });
  };

  // Toggle or remove date from array
  const handleDateChange = (date) => {
    if (!date) return;
    const index = selectedDates.findIndex(
      (d) => d.toDateString() === date.toDateString()
    );
    if (index > -1) {
      const newDates = [...selectedDates];
      newDates.splice(index, 1);
      setSelectedDates(newDates);
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow flex flex-col md:flex-row items-center gap-4 justify-around mb-4">
      {/* Date Selection */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dates
        </label>
        <div
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="border rounded p-2 w-48 cursor-pointer bg-gray-50"
        >
          {selectedDates.length > 0
            ? selectedDates.map((d) => d.toLocaleDateString()).join(", ")
            : "Select Date(s)"}
        </div>
        {isCalendarOpen && (
          <div className="absolute z-50 bg-white shadow p-2">
            <DatePicker
              inline
              shouldCloseOnSelect={false}
              onClickOutside={() => setIsCalendarOpen(false)}
              onChange={(date) => handleDateChange(date)}
              highlightDates={[
                {
                  "react-datepicker__day--selected": selectedDates,
                },
              ]}
            />
          </div>
        )}
      </div>

      {/* Floor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Floor
        </label>
        <select
          className="border p-2 rounded w-48 bg-gray-50"
          value={selectedFloor}
          onChange={(e) => {
            setSelectedFloor(e.target.value);
            setSelectedLine("");
          }}
        >
          <option value="">-- Select Floor --</option>
          {floors.map((floor) => (
            <option key={floor.id} value={floor.id}>
              {floor.name}
            </option>
          ))}
        </select>
      </div>

      {/* Line */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Line
        </label>
        <select
          className="border p-2 rounded w-48 bg-gray-50"
          disabled={!selectedFloor}
          value={selectedLine}
          onChange={(e) => setSelectedLine(e.target.value)}
        >
          <option value="">-- Select Line --</option>
          {filteredLines.map((line) => (
            <option key={line.id} value={line.id}>
              {line.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleApply}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Apply
      </button>
    </div>
  );
};

//
// 2) The main visualization component
//
export default function LostTimeVisualDashboard() {
  const { getToken } = useContext(UserContext);

  // Floors & lines
  const [floors, setFloors] = useState([]);
  const [lines, setLines] = useState([]);

  // Filters
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedLine, setSelectedLine] = useState("");

  // Loading & Error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Response data
  const [apiData, setApiData] = useState(null);

  // On mount, fetch floors & lines
  useEffect(() => {
    fetchFloors();
    fetchLines();
    // Default to today's date
    // const today = new Date();
    // setSelectedDates([today]);

    // Fetch initial data for today
    // const defaultDateParam = today.toISOString().slice(0, 10);
    // fetchData({ date: defaultDateParam, floor: "", line: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    } catch (err) {
      console.error("Error fetching floors:", err);
    }
  };

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
    } catch (err) {
      console.error("Error fetching lines:", err);
    }
  };

  // Main data fetch
  const fetchData = async ({ date, floor, line }) => {
    setLoading(true);
    setError(false);
    setApiData(null);

    let queryParts = [];
    if (date) queryParts.push(`date=${encodeURIComponent(date)}`);
    if (floor) queryParts.push(`floor=${encodeURIComponent(floor)}`);
    if (line) queryParts.push(`line=${encodeURIComponent(line)}`);
    const query = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    try {
      const token = getToken();
      const res = await fetch(
        `${import.meta.env.VITE_URL_PREFIX}/maintenance/breakdown-logs/total-lost-time-per-location/${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setApiData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching API data:", error);
      setError(true);
      setLoading(false);
    }
  };

  // When user applies filters
  const handleFetchData = ({ floor, line, date }) => {
    fetchData({ floor, line, date });
  };

  //
  // 3) Data transformations for charts
  //    - Example: Summaries by day, by problem, by type, etc.
  //
  // PieChart: summary_by_type => each slice is "type" with "breakdowns_count"
  const buildTypePieData = () => {
    if (!apiData?.summary_by_type) return [];
    return apiData.summary_by_type.map((t) => ({
      name: t.type || "N/A",
      value: t.breakdowns_count,
    }));
  };

  // BarChart: summary_by_line => bars for each "line" with "breakdowns_count"
  const buildLineBarData = () => {
    if (!apiData?.summary_by_line) return [];
    return apiData.summary_by_line.map((l) => ({
      line: l.line || `Line #${l.id}`,
      breakdowns: l.breakdowns_count,
    }));
  };

  // LineChart: summary_by_day => x = "date", y = "breakdowns_count"
  // For lost_time, we might parse "lost_time" into hours or minutes,
  // but we’ll just show breakdown count in this example.
  const buildDayLineData = () => {
    if (!apiData?.summary_by_day) return [];
    return apiData.summary_by_day.map((d) => ({
      date: d.date,
      breakdowns: d.breakdowns_count,
    }));
  };

  // Colors for the Pie
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#8dd1e1"];

  //
  // 4) Render
  //
  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-100">
      {/* Filter Bar */}
      <LostTimeFilterBar
        floors={floors}
        lines={lines}
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
        selectedFloor={selectedFloor}
        setSelectedFloor={setSelectedFloor}
        selectedLine={selectedLine}
        setSelectedLine={setSelectedLine}
        onFetchData={handleFetchData}
      />

      {/* Loading / Error */}
      {loading && (
        <div className="text-center my-4">
          <span className="text-gray-500">Loading data...</span>
        </div>
      )}
      {error && (
        <div className="text-center my-4">
          <span className="text-red-500">
            Error loading data. Please try again.
          </span>
        </div>
      )}

      {/* If we have data, show summary stats + charts */}
      {apiData && !loading && !error && (
        <>
          {/* Overall Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <StatCard
              title="Total Lost Time"
              value={apiData.total_lost_time || "N/A"}
            />
            <StatCard
              title="Total Machines"
              value={apiData.total_machine_count || "N/A"}
            />
            <StatCard
              title="Active"
              value={apiData.total_active_machines || "N/A"}
            />
            <StatCard
              title="Repairing"
              value={apiData.total_repairing_machines || "N/A"}
            />
            <StatCard
              title="Idle"
              value={apiData.total_idle_machines || "N/A"}
            />
            <StatCard
              title="Avg Response"
              value={apiData.avg_time_to_respond || "N/A"}
            />
          </div>

          {/* Row of charts */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Pie Chart (Breakdowns by Type) */}
            <div className="bg-white rounded shadow p-4 w-full lg:w-1/3">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                Breakdowns by Type
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={buildTypePieData()}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {buildTypePieData().map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart (Breakdowns by Line) */}
            <div className="bg-white rounded shadow p-4 w-full lg:w-1/3">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                Breakdowns by Line
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={buildLineBarData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="line" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="breakdowns" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart (Breakdowns by Day) */}
            <div className="bg-white rounded shadow p-4 w-full lg:w-1/3">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                Breakdowns Over Time
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={buildDayLineData()}>
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
          </div>
        </>
      )}
    </div>
  );
}

//
// 5) Simple Card for showing top-level stats
//
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col items-center justify-center">
      <div className="text-sm text-gray-500 font-medium">{title}</div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
    </div>
  );
}
