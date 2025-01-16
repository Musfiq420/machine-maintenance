// EmployeeForm.jsx
import React, { useContext, useEffect, useState } from "react";
import FormInputFields from "../../../../shared/components/ui/formInputFields";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { UserContext } from "../../../../context/userProvider";
import DashboardLoading from "../../../../shared/components/dashboard/dashboardLoading";
import { Box, Button } from "@mui/material";

export default function EmployeeForm({ employee }) {
  const { userRole, getToken } = useContext(UserContext); // Access 'userRole' from context
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roleOptions, setRoleOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [errorFields, setErrorFields] = useState([]);

  // Define allowed roles
  const allowedRoles = ["HR Manager", "Admin Officer"];
  const isAuthorized = userRole && allowedRoles.includes(userRole);

  useEffect(() => {
    const fetchData = async () => {
      const dept_url = `${import.meta.env.VITE_URL_PREFIX}/api/user_management/department/`;
      const role_url = `${import.meta.env.VITE_URL_PREFIX}/api/user_management/designation/`;
      const comp_url = `${import.meta.env.VITE_URL_PREFIX}/api/user_management/groups/`;
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

  const [formData, setFormData] = useState({
    name: employee.name || "",
    company: employee.company || "",
    department:
      departmentOptions?.find((d) => d.name === employee.department)?.id ||
      "",
    mobile: employee.mobile || "",
    designation:
      roleOptions?.find((d) => d.name === employee.designation)?.id || "",
    employee_id: employee.employee_id || "",
    date_of_joining: employee.date_of_joining || "",
  });

  useEffect(() => {
    // Update formData when options are fetched
    setFormData((prevData) => ({
      ...prevData,
      department:
        departmentOptions?.find((d) => d.name === employee.department)?.id ||
        prevData.department,
      designation:
        roleOptions?.find((d) => d.name === employee.designation)?.id ||
        prevData.designation,
      company: companyOptions?.find((c) => c.name === employee.company)?.id || prevData.company,
    }));
  }, [departmentOptions, roleOptions, companyOptions, employee.department, employee.designation, employee.company]);

  const fields = [
    { id: "name", label: "Name", type: "text" },
    {
      id: "company",
      label: "Company ",
      type: "select",
      options: companyOptions,
    },
    {
      id: "department",
      label: "Department ",
      type: "select",
      options: departmentOptions,
    },
    {
      id: "designation",
      label: "Designation",
      type: "select",
      options: roleOptions,
    },
    { id: "mobile", label: "Mobile ", type: "number" },
    { id: "employee_id", label: "Employee Id", type: "text" },
    {
      id: "date_of_joining",
      label: "Joining Date",
      type: "date",
    },
  ];

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

  const handleUpdate = async () => {
    setLoading(true);

    const url = `${import.meta.env.VITE_EMPLOYEE_UPDATE_API}${employee?.id}/`;

    const token = getToken();
    const empty = Object.keys(formData).filter(
      (key) => formData[key].toString().trim().length === 0
    );
    setErrorFields(empty);
    if (empty.length !== 0) {
      setLoading(false);
      return;
    }
    console.log({ ...formData });
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`, // Use 'Token' prefix as per UserProvider
        },
        body: JSON.stringify({ ...formData, company: 1 }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to update employee.");
      }

      // Optionally, you can handle success more gracefully
      window.location.reload();
    } catch (error) {
      console.error(error);
      // Optionally, display the error message to the user
      // alert(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Conditionally render "Update Employee" button */}
      {isAuthorized && (
        <div>
          <button
            className="px-8 py-3 font-semibold w-fit text-white h-fit bg-primary-dark rounded-md"
            onClick={() => setOpenModal(true)}
          >
            Update Employee
          </button>
          <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            maxWidth="sm"
            fullWidth
          >
            {!loading ? (
              <>
                <DialogTitle>Update Employee</DialogTitle>
                <DialogContent>
                  <div>
                    {fields.map(({ id, label, type, options }) => (
                      <FormInputFields
                        errorField={errorFields}
                        input={formData[id]}
                        name={label}
                        setInput={handleInputChange}
                        id={id}
                        key={id}
                        multiple={false}
                        options={options}
                        type={type}
                      />
                    ))}
                  </div>
                </DialogContent>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "16px",
                    gap: "8px",
                  }}
                >
                  <Button
                    onClick={() => setOpenModal(false)}
                    variant="outlined"
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdate}
                    variant="contained"
                    color="primary"
                  >
                    Update Employee
                  </Button>
                </Box>
              </>
            ) : (
              <DashboardLoading />
            )}
          </Dialog>
        </div>
      )}
    </>
  );
}
