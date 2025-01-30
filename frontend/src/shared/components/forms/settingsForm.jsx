import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FormInputFields from "../ui/formInputFields";
import { UserContext } from "../../../context/userProvider";

export default function SettingsForm({ activeTab, currData = null }) {
  const [modalOpen, setModalOpen] = useState();
  const [errorField, setErrorField] = useState([]);
  const { getToken } = useContext(UserContext);
  const capitalizeProper = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const { data, title, link, id } = activeTab;
  const fields = Object.keys(data[0]).filter((f) => !f.includes("id"));
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData(
      fields.reduce((acc, field) => {
        acc[field] = currData ? currData[field] : "";
        return acc; // Ensure the accumulator is returned
      }, {})
    );
  }, [activeTab]);

  const formTitle = !currData ? `Add ${title}` : `Update ${title}`;
  const inputHandler = (id, value) => {
    setFormData((prev) => {
      return { ...prev, [id]: value };
    });
  };

  const handleSubmit = async () => {
    const token = getToken();
    const empty = Object.keys(formData).filter(
      (key) => formData[key].length === 0
    );
    setErrorField(empty);
    try {
      const url = link + `${currData ? `${currData.id}/` : ""}`;
      console.log(url);
      const res = await fetch(url, {
        method: currData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Ensure the token is being sent
        },
        body: JSON.stringify({ ...formData, company: 1 }),
      });

      const data = await res.text();
      console.log(data);
      //   window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-primary-dark ml-auto w-fit block mb-8 px-6 py-3 rounded-md text-white"
      >
        {formTitle}
      </button>
      <Dialog
        open={modalOpen}
        fullWidth
        maxWidth="sm"
        onClose={() => setModalOpen(false)}
      >
        <DialogContent>
          <div className="px-12">
            <div className="font-bold text-xl mb-5 ">{formTitle}</div>
            {fields.map((f) => (
              <FormInputFields
                errorField={errorField}
                input={formData[f] || ""}
                setInput={inputHandler}
                name={capitalizeProper(f.replace("_", " "))}
                id={f}
                type="string"
                key={f}
              />
            ))}
          </div>
        </DialogContent>
        <>
          <button
            onClick={() => setModalOpen(false)}
            className=" w-full  text-primary-dark font-semibold py-4"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className=" w-full  bg-primary-dark text-white font-semibold py-4"
          >
            {formTitle}
          </button>
        </>
      </Dialog>
    </div>
  );
}
