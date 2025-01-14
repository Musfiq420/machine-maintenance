import React, { useContext, useEffect, useState } from "react";
import FormInputFields from "../../../../shared/components/ui/formInputFields";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { UserContext } from "../../../../context/userProvider";

export default function MachineForm({ machine = null }) {
  const { getToken } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [brandsOptions, setBrandsOptions] = useState([]);
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [probsOptions, setProbsOptions] = useState([]);
  const [typesOptions, setTypesOptions] = useState([]);
  const [catsOptions, setCatsOptions] = useState([]);
  const [errorFields, setErrorFields] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const brand_url = `${
        import.meta.env.VITE_URL_PREFIX
      }/api/maintenance/brand/`;
      const prob_url = `${
        import.meta.env.VITE_URL_PREFIX
      }/api/maintenance/problem-category/`;
      const supplier_url = `${
        import.meta.env.VITE_URL_PREFIX
      }/api/maintenance/supplier/`;
      const cat_url = `${
        import.meta.env.VITE_URL_PREFIX
      }/api/maintenance/category/`;
      const type_url = `${
        import.meta.env.VITE_URL_PREFIX
      }/api/maintenance/type/`;
      try {
        const [brand_data, supplier_data, prob_data, type_data, cat_data] =
          await Promise.all([
            fetch(brand_url, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }).then((res) => res.json()),
            fetch(supplier_url, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }).then((res) => res.json()),
            fetch(prob_url, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }).then((res) => res.json()),
            fetch(type_url, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }).then((res) => res.json()),
            fetch(cat_url, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }).then((res) => res.json()),
          ]);

        const brands = brand_data.map((d) => d.name);
        setBrandsOptions(brands);
        const suppliers = supplier_data.map((d) => d.name);
        setSuppliersOptions(suppliers);
        const probs = prob_data.map((d) => d.name);
        setProbsOptions(probs);
        const types = type_data.map((d) => d.name);
        setTypesOptions(types);
        const cats = cat_data.map((d) => d.name);
        setCatsOptions(cats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
    last_problem: machine ? machine?.last_problem || "" : "",
  });
  console.log(machine);

  const fields = [
    { id: "machine_id", label: "Machine Id", type: "text" },
    { id: "category", label: "Category", type: "select", options: catsOptions },
    { id: "type", label: "Type", type: "select", options: typesOptions },
    { id: "brand", label: "Brand", type: "select", options: brandsOptions },
    { id: "model_number", label: "Model Number", type: "text" },
    { id: "serial_no", label: "Serial No", type: "number" },
    { id: "floor_no", label: "Floor No", type: "number" },
    { id: "line_no", label: "Line No", type: "number" },
    {
      id: "supplier",
      label: "Supplier",
      type: "select",
      options: suppliersOptions,
    },
    { id: "purchase_date", label: "Purchase Date", type: "date" },
    { id: "location", label: "Location", type: "text" },
    {
      id: "last_problem",
      label: "Problem Category",
      type: "text",
      options: probsOptions,
    },
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
    const empty = Object.keys(formData).filter(
      (key) => formData[key].length === 0
    );
    setErrorFields(empty);
    if (empty.length !== 0) {
      return;
    }
    try {
      const res = await fetch(url, {
        method: machine ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Ensure the token is being sent
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
