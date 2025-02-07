import React, { useContext, useEffect, useState } from "react";
import FormInputFields from "../ui/formInputFields";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../../context/userProvider";

export default function MachineLineForm({}) {
  const [selectedFloor, setSelectedFloor] = useState([]);
  const [selectedLine, setSelectedLine] = useState([]);
  const [location, setLocation] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const { getToken } = useContext(UserContext);
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
      console.log("res", res);
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
      setSearchParams((prev) => {
        prev.set("floor", encodeURI([1]));
        prev.set("line", encodeURI([1]));
        return prev;
      });
      setSelectedFloor([1]);
      setSelectedLine([1]);
    } catch (error) {
      console.error("Error fetching lines:", error);
    }
  };

  useEffect(() => {
    fetchLines();
  }, []);

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
      ].map((line) => ({ id: line.id, name: line.name })), // Pass value and label
      setInput: (id, value) => setSelectedLine(value),
    },
    {
      input: selectedDate,
      name: "Date",
      id: "date",
      setInput: (id, value) => setSelectedDate(value),
    },
  ];

  useEffect(() => {
    if ((selectedFloor && selectedLine) || selectedDate) {
      setSearchParams((prev) => {
        prev.set("floor", selectedFloor);
        prev.set("line", selectedLine);
        prev.set("date", selectedDate);
        return prev;
      });
    }
  }, [selectedFloor, selectedLine, selectedDate]);

  return (
    <div>
      {" "}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
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
            multiple={f.options ? true : false}
            type={f.options ? "select" : "date"}
          />
        ))}
      </div>
    </div>
  );
}
