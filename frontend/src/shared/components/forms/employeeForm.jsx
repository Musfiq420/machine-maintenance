import React, { useContext, useEffect, useState } from "react";
import FormInputFields from "../ui/formInputFields";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { UserContext } from "../../../context/userProvider";
import DashboardLoading from "../dashboard/dashboardLoading";

export default function EmployeeForm({
  employee,
  roleOptions,
  departmentOptions,
  hasAccess,
}) {
  const { getToken } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorFields, setErrorFields] = useState([]);
  const [formData, setFormData] = useState({
    name: employee?.name || "",
    company: 1,
    department: employee?.department || "",
    mobile: employee?.mobile || "",
    designation: employee?.designation || "",
    employee_id: employee?.employee_id || "",
    date_of_joining: employee?.date_of_joining || "",
  });

  const fields = [
    { id: "name", label: "Name", type: "text" },
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
      label: "Joining  Date",
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

    const url = `${import.meta.env.VITE_EMPLOYEE_UPDATE_API}${
      employee ? employee.id + "/" : ""
    }`;
    console.log("URL", url);

    const token = getToken();
    const empty = Object.keys(formData).filter(
      (key) => formData[key].length === 0
    );
    setErrorFields(empty);
    if (empty.length !== 0) {
      return;
    }
    try {
      console.log({ ...formData });
      const res = await fetch(url, {
        method: employee ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Ensure the token is being sent
        },
        body: JSON.stringify({ ...formData, company: 1 }),
      });

      const data = await res.text();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <>
      {hasAccess && (
        <div>
          <button
            className="px-8 py-3 font-semibold  w-fit text-white h-fit bg-primary-dark rounded-md"
            onClick={() => setOpenModal(true)}
          >
            {employee ? "Update" : "Add Employee"}
          </button>
          <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            maxWidth="sm"
            fullWidth
          >
            {!loading ? (
              <>
                <DialogTitle>
                  {employee ? "Update Employee" : "Add Employee"}
                </DialogTitle>
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

                <button
                  className="text-primary font-semibold px-8 py-4 "
                  onClick={() => setOpenModal(false)}
                  variant="text"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-primary-dark text-white px-12 py-3 font-semibold "
                >
                  {employee ? "Update Employee" : "Add Employee"}{" "}
                </button>
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
