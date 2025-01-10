/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInputFields from "../../../../shared/components/ui/formInputFields";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  const [errorFields, setErrorFields] = useState([]);

  // Shared Form Data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    company: [],
    department: "",
    mobile: "",
    designation: "",
    employee_id: "",
    date_of_joining: "",
    assigned_line: "",
    assigned_block: "",
  });

  // Handle Input Changes
  const handleInputChange = (id, value) => {
    console.log(id);
    if (Array.isArray(value)) {
      setFormData({
        ...formData,
        [id]: value,
      });
      return;
    }
    setFormData({ ...formData, [id]: value });
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    const currErrorFields = Object.keys(formData).filter(
      (key) => formData[key] === ""
    );
    setErrorFields(currErrorFields);
    if (errorFields.length) {
      return;
    }
    console.log("error", errorFields);

    const url =
      activeTab === "user"
        ? "http://127.0.0.1:8000/api/user_management/register/"
        : "http://127.0.0.1:8000/api/user_management/employees/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.redirect_url) {
          alert(data.message); // Show success message
          navigate(data.redirect_url); // Redirect to the login page
        } else {
          alert("Registration successful, but no redirect URL provided.");
        }
      } else if (response.status === 400) {
        // Handle validation errors
        const errorData = await response.json();
        const errorMessage = Object.values(errorData).flat().join("\n"); // Concatenate all error messages
        alert(`Validation Error: ${errorMessage}`);
      } else {
        // Handle unexpected errors
        const text = await response.text();
        console.error("Server Error:", text);
        alert("An unexpected server error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const userFields = [
    { id: "email", label: "Email" },
    { id: "password", label: "Password" },
    { id: "confirm_password", label: "Confirm Password" },
  ];
  const commmonFields = [
    {
      id: "company",
      label: "Company",
      type: "select",
      options: [
        "Company 1",
        "Company 2",
        "Company 3",
        "Company 4",
        "Company 5",
        "Company 6",
      ],
    },
    { id: "department", label: "Department", type: "text" },
    { id: "mobile", label: "Mobile", type: "number" },
    { id: "designation", label: "Designation", type: "text" },
    { id: "employee_id", label: "Employee ID", type: "text" },
    { id: "date_of_joining", label: "Date of Joining", type: "date" },
    { id: "assigned_line", label: "Assigned Line", type: "text" },
    { id: "assigned_block", label: "Assigned Block", type: "text" },
  ];

  return (
    <div className="mb-20 bg-primary-accent">
      {/* Fixed Tabs */}
      <div className="w-fit py-3 px-10 text-black  rounded-full mx-auto mt-12 bg-primary-dark shadow-md z-10 flex justify-center space-x-4 ">
        <button
          onClick={() => setActiveTab("user")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "user"
              ? "bg-primary-accent text-black"
              : " text-white"
          }`}
        >
          User Form
        </button>
        <button
          onClick={() => setActiveTab("employee")}
          className={`px-4 py-2 rounded-full ${
            activeTab === "employee"
              ? "bg-primary-accent text-black"
              : "text-white"
          }`}
        >
          Employee Form
        </button>
      </div>

      {/* Forms */}
      <div className="mt-20 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl">
          <h2 className="text-xl text-center text-black  font-bold mb-4">
            {activeTab === "user"
              ? "User Registration"
              : "Employee Registration"}
          </h2>
          {/* Name Field (Full Width) */}
          <FormInputFields
            errorField={errorFields}
            input={formData["name"]}
            setInput={handleInputChange}
            name={"Name"}
            id={"name"}
          />
          {/* User-Specific Fields */}
          {activeTab === "user" && (
            <div className="grid grid-cols-2 gap-4">
              {userFields.map(({ id, label }) => (
                <FormInputFields
                  errorField={errorFields}
                  input={formData[id]}
                  setInput={handleInputChange}
                  name={label}
                  id={id}
                />
              ))}
            </div>
          )}
          {/* Shared Fields (Two Columns) */}
          <div className="grid grid-cols-2 gap-4">
            {commmonFields.map(({ id, label, type, options }) => (
              <FormInputFields
                errorField={errorFields}
                input={formData[id]}
                name={label}
                id={id}
                setInput={handleInputChange}
                type={type}
                multiple={false}
                options={options}
              />
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-primary-dark text-white py-2 rounded hover:bg-primary-"
          >
            {activeTab === "user" ? "Register User" : "Register Employee"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
