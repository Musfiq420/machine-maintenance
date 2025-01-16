// MachineForm.jsx
import React, { useContext, useState } from "react";
import FormInputFields from "../../../../shared/components/ui/formInputFields";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { UserContext } from "../../../../context/userProvider";
import DashboardLoading from "../../../../shared/components/dashboard/dashboardLoading";
import { Box, Button } from "@mui/material";

export default function MachineForm({
  machine = null,
  brandsOptions,
  suppliersOptions,
  typesOptions,
  catsOptions,
  lineOptions,
  sucess,
  setSucess,
}) {
  const { userRole, getToken } = useContext(UserContext); // Access 'userRole' from context
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorFields, setErrorFields] = useState([]);

  const statusOptions = [
    { id: "active", name: "Active" },
    { id: "broken", name: "Broken" },
    { id: "maintenance", name: "Maintenance" },
    { id: "inactive", name: "Inactive" },
  ];

  const [formData, setFormData] = useState({
    machine_id: machine ? machine.machine_id || "" : "",
    category: machine ? machine.category || "" : "",
    type: machine ? machine.type || "" : "",
    brand: machine ? machine.brand || "" : "",
    model_number: machine ? machine.model_number || "" : "",
    serial_no: machine ? machine.serial_no || "" : "",
    supplier: machine ? machine.supplier || "" : "",
    purchase_date: machine ? machine.purchase_date || "" : "",
    status: machine ? machine.status || "" : "",
  });

  const staticFields = {
    last_breakdown_start: null,
    last_problem: machine ? machine?.last_problem || "" : "",
    sequence: null,
    mechanic: null,
    operator: null,
    location: "",
    company: 1,
    line: null,
    // company_id: 1,
  };

  const fields = [
    { id: "machine_id", label: "Machine Id", type: "text" },
    { id: "category", label: "Category", type: "select", options: catsOptions },
    { id: "type", label: "Type", type: "select", options: typesOptions },
    { id: "brand", label: "Brand", type: "select", options: brandsOptions },
    { id: "model_number", label: "Model Number", type: "text" },
    { id: "serial_no", label: "Serial No", type: "number" },
    {
      id: "supplier",
      label: "Supplier",
      type: "select",
      options: suppliersOptions,
    },
    { id: "purchase_date", label: "Purchase Date", type: "date" },
    {
      id: "status",
      label: "Status",
      type: "select",
      options: statusOptions,
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

  const handleSaveMachine = async () => {
    setLoading(true);

    const url = machine
      ? `${import.meta.env.VITE_MACHINE_QR_DATA_API}/${machine?.id}/`
      : `${import.meta.env.VITE_MACHINE_QR_DATA_API}/`;
    const token = getToken();
    const empty = Object.keys(formData).filter(
      (key) => formData[key].toString().trim().length === 0
    );
    console.log(empty);
    setErrorFields(empty);
    if (empty.length !== 0) {
      setLoading(false);
      return;
    }
    console.log(url);
    try {
      const res = await fetch(url, {
        method: machine ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`, // Use 'Token' prefix as per UserProvider
        },
        body: JSON.stringify({ ...formData, ...staticFields }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to save machine.");
      }

      setSucess(true);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      // Optionally, display the error message to the user
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Define allowed roles
  const allowedRoles = ["Mechanic", "Admin Officer"];

  // Check if the user has an allowed role
  const isAuthorized = userRole && allowedRoles.includes(userRole);

  return (
    <>
      {isAuthorized && (
        <div>
          <button
            className="px-8 py-3 font-semibold w-fit text-white h-fit bg-primary-dark rounded-md"
            onClick={() => setOpenModal(true)}
          >
            {machine ? "Update" : "Add Machine"}
          </button>
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            maxWidth="sm"
            fullWidth
          >
            {!loading ? (
              <>
                <DialogTitle>
                  {machine ? "Update Machine" : "Add Machine"}
                </DialogTitle>
                <DialogContent>
                  <div>
                    {fields.map(({ id, label, type, options }) => (
                      <FormInputFields
                        key={id}
                        errorField={errorFields}
                        input={formData[id]}
                        name={label}
                        setInput={handleInputChange}
                        id={id}
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
                    onClick={handleCloseModal}
                    variant="outlined"
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveMachine}
                    variant="contained"
                    color="primary"
                  >
                    {machine ? "Update Machine" : "Save Machine"}
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
