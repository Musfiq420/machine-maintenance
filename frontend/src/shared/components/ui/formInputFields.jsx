import { MenuItem, Select } from "@mui/material";
import React from "react";

export default function FormInputFields({
  input,
  setInput,
  name,
  errorField,
  id = "",
  type = "text",
  options = [],
  multiple = false,
}) {
  const dateValue = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 8) value = value.slice(0, 8); // Limit to 8 characters

    // Format as 'YYYY-MM-DD'
    if (value.length > 6) {
      value = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6)}`;
    } else if (value.length > 4) {
      value = `${value.slice(0, 4)}-${value.slice(4)}`;
    }
    return value;
  };

  const numericalValue = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    return value;
  };
  const handleInput = (e) => {
    const value =
      type === "number"
        ? numericalValue(e)
        : type === "date"
        ? dateValue(e)
        : e.target.value;

    setInput(e.target.id, value);
  };
  const isError = input.length === 0 && errorField.includes(id);
  const isSelect = type === "select";
  return (
    <div className="mb-5">
      <h6
        style={{ color: isError ? "#dc2626" : "black" }}
        className="text-black font-semibold text-lg"
      >
        {name}:
      </h6>

      {isSelect ? (
        <Select
          multiple={multiple}
          displayEmpty
          disabled={options.length === 0}
          value={input}
          error={isError}
          onChange={(e) => setInput(id, e.target.value)}
          id={id}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{name}</em>;
            }
            if (Array.isArray(selected)) {
              return selected.join(", ");
            }
            return selected;
          }}
          className="w-full my-2 h-11 border-black border-[2px]"
        >
          <MenuItem disabled value="">
            <em>{name}</em>
          </MenuItem>
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <input
          className="bg-transparent  focus-visible:border-primary focus-visible:outline-none text-black border-[2px] rounded-sm w-full p-2 my-2  "
          id={id}
          type="text"
          value={input}
          onChange={(e) => handleInput(e)}
          style={{
            borderColor: isError ? "#dc2626" : "black",
          }}
        />
      )}

      {isError && (
        <p className="text-red-600 text-sm ">Please Fill {name} Field</p>
      )}
      {type === "date" && (
        <p className="text-sm ">Please Enter Date in YYYY-MM-DD Format</p>
      )}
    </div>
  );
}
