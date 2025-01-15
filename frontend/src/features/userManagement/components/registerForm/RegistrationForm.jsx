/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInputFields from "../../../../shared/components/ui/formInputFields";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  const [roleOptions, setRoleOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
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
    if (Array.isArray(value)) {
      setFormData({
        ...formData,
        [id]: value,
      });
      return;
    }
    setFormData({ ...formData, [id]: value });
  };

  const commmonFields = [
    {
      id: "company",
      label: "Company",
      type: "select",
      options: companyOptions,
    },
    {
      id: "department",
      label: "Department",
      type: "select",
      options: departmentOptions,
    },
    { id: "mobile", label: "Mobile", type: "number" },
    {
      id: "designation",
      label: "Designation",
      type: "select",
      options: roleOptions,
    },
    { id: "employee_id", label: "Employee ID", type: "text" },
    { id: "date_of_joining", label: "Date of Joining", type: "date" },
    { id: "assigned_line", label: "Assigned Line", type: "text" },
    { id: "assigned_block", label: "Assigned Block", type: "text" },
  ];

  // Handle Form Submission
  const handleSubmit = async () => {
    const currErrorFields = commmonFields.filter(
      (fields) => formData[fields.id] === ""
    );
    setErrorFields(currErrorFields);
    console.log(currErrorFields);
    if (errorFields.length) {
      console.log("error", errorFields);
      return;
    }

    const url = `${import.meta.env.VITE_EMPLOYEE_UPDATE_API}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, company: 1 }),
      });

      if (response.ok) {
        navigate("/dashboard/employees"); // Redirect to the login page
      } else if (response.status === 400) {
        // Handle validation errors
        const errorData = await response.json();
        console.log(errorData);
        const errorMessage = Object.values(errorData).flat().join("\n"); // Concatenate all error messages
        // alert(`Validation Error: ${errorMessage}`);
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

  useEffect(() => {
    const fetchData = async () => {
      const dept_url = `${
        import.meta.env.VITE_URL_PREFIX
      }/api/user_management/department/`;
      const role_url = `${
        import.meta.env.VITE_URL_PREFIX
      }/api/user_management/designation/`;
      const comp_url = `${
        import.meta.env.VITE_URL_PREFIX
      }/api/user_management/groups/`;
      try {
        const dept_res = await fetch(dept_url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const dept_data = await dept_res.json();
        const role_res = await fetch(role_url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const role_data = await role_res.json();
        const comp_res = await fetch(comp_url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const comp_data = await comp_res.json();
        const roles = role_data.map((d) => {
          return { name: d.title, id: d.id };
        });
        const comps = comp_data.map((d) => {
          return { name: d.name, id: d.id };
        });
        const depts = dept_data.map((d) => {
          return { name: d.name, id: d.id };
        });
        setRoleOptions(roles);
        setDepartmentOptions(depts);
        setCompanyOptions(comps);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const userFields = [
    { id: "email", label: "Email" },
    { id: "password", label: "Password" },
    { id: "confirm_password", label: "Confirm Password" },
  ];

  return (
    <div className="mb-20 bg">
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
