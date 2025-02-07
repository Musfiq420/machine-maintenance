import React, { useContext, useEffect, useState } from "react";
import FormInputFields from "../ui/formInputFields";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { UserContext } from "../../../context/userProvider";
import DashboardLoading from "../dashboard/dashboardLoading";
import { MdEdit, MdDelete  } from "react-icons/md";

export default function MachineForm({
  machine = null,
  lineOptions,
  brandsOptions,
  suppliersOptions,
  typesOptions,
  catsOptions,
  hasAccess,
}) {
  const { getToken, user } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorFields, setErrorFields] = useState([]);
  const statusOptions = [
    {
      id: "active",
      name: "Active",
    },
    {
      id: "broken",
      name: "Inactive",
    },
    {
      id: "maintenance",
      name: "Maintenance",
    },
    {
      id: "inactive",
      name: "Broken",
    },
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
    sequence: machine ? machine.sequence || "" : "",
    line: machine ? machine.line || "" : "",
  });

  const staticFields = {
    last_breakdown_start: null,
    last_problem: machine ? machine?.last_problem || "" : "",
    mechanic: null,
    operator: null,
    location: "",
    company: 1,
    status: "active",
    // company_id: 1,
  };

  const fields = [
    { id: "machine_id", label: "Machine Id", type: "text" },
    { id: "category", label: "Category", type: "select", options: catsOptions },
    { id: "type", label: "Type", type: "select", options: typesOptions },
    { id: "brand", label: "Brand", type: "select", options: brandsOptions },
    { id: "model_number", label: "Model Number", type: "text" },
    { id: "serial_no", label: "Serial No", type: "number" },
    { id: "sequence", label: "Sequence No", type: "number" },
    {
      id: "supplier",
      label: "Supplier",
      type: "select",
      options: suppliersOptions,
    },
    {
      id: "line",
      label: "Line",
      type: "select",
      options: lineOptions,
    },
    { id: "purchase_date", label: "Purchase Date", type: "date" },
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
      (key) => formData[key].length === 0
    );
    console.log(empty);
    setErrorFields(empty);
    if (empty.length !== 0) {
      setLoading(false);
      return;
    }
    console.log(formData);
    try {
      const res = await fetch(url, {
        method: machine ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Ensure the token is being sent
        },
        body: JSON.stringify({ ...formData, ...staticFields }),
      });

      const data = await res.text();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    // setLoading(false);
  };
  return (
    <>
      {hasAccess && (
        <div>
          <button
            className="px-2 py-2 font-semibold  w-fit text-white h-fit bg-primary-dark rounded-md"
            onClick={() => setOpenModal(true)}
          >
            {machine ? <MdEdit /> : "Add Machine"}
          </button>
          <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            maxWidth="sm"
            fullWidth
          >
            {!loading ? (
              <>
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
