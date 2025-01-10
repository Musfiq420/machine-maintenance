import React from "react";

export default function FormInputFields({
  input,
  setInput,
  name,
  errorField,
  id = "",
  type = "text",
}) {
  const dateValue = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 8) value = value.slice(0, 8); // Limit to 8 characters

    // Automatically add '/' at the correct positions
    if (value.length > 2 && value.length <= 4) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    } else if (value.length > 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
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

    setInput(e, value);
  };
  const isError = input.length === 0 && errorField.includes(id);
  return (
    <div className="mb-5">
      <h6
        style={{ color: isError ? "#dc2626" : "black" }}
        className="text-black font-semibold text-sm"
      >
        {name}:
      </h6>
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
      {isError && (
        <p className="text-red-600 text-sm ">Please Fill {name} Field</p>
      )}
    </div>
  );
}
