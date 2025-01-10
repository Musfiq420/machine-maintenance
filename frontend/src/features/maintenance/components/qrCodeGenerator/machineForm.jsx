import React, { useContext, useState } from "react";
import FormInputFields from "../../../../shared/components/ui/formInputFields";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { UserContext } from "../../../../context/userProvider";

export default function MachineForm({ machine = null }) {
  const { getToken } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [errorFields, setErrorFields] = useState([]);
  const [formData, setFormData] = useState({
    machine_id: machine ? machine.machine_id || "" : "",
    category: machine ? machine.category || "" : "",
    type: machine ? machine.type || "" : "",
    brand: machine ? machine.brand || "" : "",
    model_number: machine ? machine.model_number || "" : "",
    serial_no: machine ? machine.serial_no || "" : "",
    floor_no: machine ? machine.floor_no || "" : "",
    line_no: machine ? machine.line_no || "" : "",
    supplier: machine ? machine.supplier || "" : "",
    purchase_date: machine ? machine.purchase_date || "" : "",
    location: machine ? machine.location || "" : "",
    last_breakdown_start: machine ? machine.last_breakdown_start || "" : "",
    status: machine ? machine.status || "" : "",
  });

  const fields = [
    { id: "machine_id", label: "Machine Id", type: "text" },
    { id: "category", label: "Category", type: "text" },
    { id: "type", label: "Type", type: "text" },
    { id: "brand", label: "Brand", type: "text" },
    { id: "model_number", label: "Model Number", type: "text" },
    { id: "serial_no", label: "Serial No", type: "number" },
    { id: "floor_no", label: "Floor No", type: "number" },
    { id: "line_no", label: "Line No", type: "number" },
    { id: "supplier", label: "Supplier", type: "text" },
    { id: "purchase_date", label: "Purchase Date", type: "date" },
    { id: "location", label: "Location", type: "text" },
    { id: "last_breakdown_start", label: "Last Breakdown Start", type: "text" },
    {
      id: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive", "Maintenance", "Broken"],
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
    const url = machine
      ? `${import.meta.env.VITE_MACHINE_QR_DATA_API}/${machine?.id}`
      : `${import.meta.env.VITE_MACHINE_QR_DATA_API}`;
    const token = getToken();
    console.log(token);
    const empty = Object.keys(formData).filter(
      (key) => formData[key].length === 0
    );
    setErrorFields(empty);
    console.log(empty);
    if (empty.length !== 0) {
      return;
    }
    try {
      const res = await fetch(url, {
        method: machine ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`, // Ensure the token is being sent
        },
        body: JSON.stringify(formData),
      });

      const data = await res.text();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button
        className="px-8 py-3 font-semibold  w-fit text-white h-fit bg-primary-dark rounded-md"
        onClick={() => setOpenModal(true)}
      >
        {machine ? "Update" : "Add Machine"}
      </button>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Machine</DialogTitle>
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
          onClick={handleSaveMachine}
          className="bg-primary-dark text-white px-12 py-3 font-semibold "
        >
          {machine ? "Update Machine" : "Save Machine"}
        </button>
      </Dialog>
    </div>
  );
}
