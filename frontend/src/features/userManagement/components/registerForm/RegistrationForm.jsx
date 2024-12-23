/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../../styles/registerForm/RegistrationForm.css"; // Shared styling.

const TabbedForm = () => {
  const [activeTab, setActiveTab] = useState("user");

  // Shared Form Data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    company: "",
    department: "",
    mobile: "",
    designation: "",
    employee_id: "",
    date_of_joining: "",
    assigned_line: "",
    assigned_block: "",
  });

  // Handle Tab Switching
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle Form Submission
  const handleSubmit = async (e, formType) => {
    e.preventDefault();

    const url =
      formType === "user"
        ? "http://127.0.0.1:8000/api/user_management/register/"
        : "http://127.0.0.1:8000/api/user_management/employees/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(
          `${
            formType === "user" ? "User" : "Employee"
          } registered successfully!`
        );
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Tabs */}
      <div className="w-full bg-white shadow-md z-10 flex justify-center space-x-4 py-2">
        <button
          onClick={() => handleTabSwitch("user")}
          className={`px-4 py-2 rounded ${
            activeTab === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          User Form
        </button>
        <button
          onClick={() => handleTabSwitch("employee")}
          className={`px-4 py-2 rounded ${
            activeTab === "employee" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Employee Form
        </button>
      </div>

      {/* Forms */}
      <div className="mt-20 flex justify-center items-center">
        <form
          onSubmit={(e) => handleSubmit(e, activeTab)}
          className="bg-white p-6 rounded shadow-md w-full max-w-3xl"
        >
          <h2 className="text-xl font-bold mb-4">
            {activeTab === "user"
              ? "User Registration"
              : "Employee Registration"}
          </h2>
          {/* Name Field (Full Width) */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* User-Specific Fields */}
          {activeTab === "user" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
          )}
          {/* Shared Fields (Two Columns) */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "company", label: "Company", type: "text" },
              { id: "department", label: "Department", type: "text" },
              { id: "mobile", label: "Mobile", type: "tel" },
              { id: "designation", label: "Designation", type: "text" },
              { id: "employee_id", label: "Employee ID", type: "text" },
              { id: "date_of_joining", label: "Date of Joining", type: "date" },
              { id: "assigned_line", label: "Assigned Line", type: "number" },
              { id: "assigned_block", label: "Assigned Block", type: "number" },
            ].map(({ id, label, type }) => (
              <div key={id} className="mb-4">
                <label htmlFor={id} className="block text-sm font-medium">
                  {label}:
                </label>
                <input
                  type={type}
                  id={id}
                  value={formData[id]}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required={id !== "mobile"} // Only 'mobile' is optional
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {activeTab === "user" ? "Register User" : "Register Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TabbedForm;
