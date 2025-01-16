import React, { useContext, useEffect, useState } from "react";
import FormInputFields from "../../../../shared/components/ui/formInputFields";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { UserContext } from "../../../../context/userProvider";

export default function MachineForm({ machine = null, sucess, setSucess }) {
  const initialForm = {
    machine_id: machine ? machine.machine_id || "" : "",
    category: machine ? machine.category || "" : "",
    type: machine ? machine.type || "" : "",
    brand: machine ? machine.brand || "" : "",
    model_number: machine ? machine.model_number || "" : "",
    serial_no: machine ? machine.serial_no || "" : "",
    supplier: machine ? machine.supplier || "" : "",
    purchase_date: machine ? machine.purchase_date || "" : "",
    status: machine ? machine.status || "" : "",
  };
  const { getToken, user } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const [brandsOptions, setBrandsOptions] = useState([]);
  const [probsOptions, setProbsOptions] = useState([]);
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [lineOptions, setlineOptions] = useState([]);
  const [typesOptions, setTypesOptions] = useState([]);
  const [catsOptions, setCatsOptions] = useState([]);
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
      const line_url = `${
        import.meta.env.VITE_URL_PREFIX
      }/api/production/lines/`;

      try {
        const [brand_data, supplier_data, type_data, cat_data, line_data] =
          await Promise.all([
            fetch(brand_url, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }).then((res) => res.json()),
            fetch(supplier_url, {
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
            fetch(line_url, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }).then((res) => res.json()),
          ]);

        const lines = line_data.map((d) => {
          return { name: d.name, id: d.name };
        });
        setlineOptions(lines);
        const brands = brand_data.map((d) => {
          return { name: d.name, id: d.id };
        });
        setBrandsOptions(brands);
        const suppliers = supplier_data.map((d) => {
          return { name: d.name, id: d.id };
        });
        setSuppliersOptions(suppliers);

        const types = type_data.map((d) => {
          return { name: d.name, id: d.id };
        });
        setTypesOptions(types);
        const cats = cat_data.map((d) => {
          return { name: d.name, id: d.id };
        });
        setCatsOptions(cats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState(initialForm);

  const staticFields = {
    last_breakdown_start: null,
    last_problem: machine ? machine?.last_problem || "" : "",
    sequence: null,
    mechanic: null,
    operator: null,
    company: 1,
    line: null,
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
  useEffect(() => {
    if (sucess) {
      setFormData(initialForm);
      setOpenModal(false);
    }
  }, [sucess]);
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
    const id = encodeURI(machine?.machine_id);
    const url = machine
      ? `${import.meta.env.VITE_MACHINE_QR_DATA_API}/${machine?.machine_id}`
      : `${import.meta.env.VITE_MACHINE_QR_DATA_API}/`;
    const token = getToken();
    const empty = Object.keys(formData).filter(
      (key) => formData[key].length === 0
    );
    console.log(empty);
    setErrorFields(empty);
    if (empty.length !== 0) {
      return;
    }
    console.log(url);
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
      setSucess(true);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(lineOptions);
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
