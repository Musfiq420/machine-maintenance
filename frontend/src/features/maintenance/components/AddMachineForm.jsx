import React, { useState } from "react";
import { getApiUrl } from "../../../shared/components/getApiUrl";

const AddMachineForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    type: "",
    brand: "",
    model_number: "",
    serial_no: "",
    floor_no: "",
    line_no: "",
    supplier: "",
    purchase_date: "",
    location: "",
    last_breakdown_start: "",
    status: "active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Frontend validation for required fields
    if (!formData.category || !formData.purchase_date || !formData.last_breakdown_start) {
      setError("Please fill in all the required fields.");
      setLoading(false);
      return;
    }

    const Machine_QR_Data_API = getApiUrl('Machine_QR_Data_API');

    try {
      const response = await fetch(Machine_QR_Data_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add machine. Please try again.");
      }

      const data = await response.json();
      setSuccess("Machine added successfully!");
      
      // Reset form data after success
      setFormData({
        category: "",
        type: "",
        brand: "",
        model_number: "",
        serial_no: "",
        floor_no: "",
        line_no: "",
        supplier: "",
        purchase_date: "",
        location: "",
        last_breakdown_start: "",
        status: "active",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Add Machine</h2>

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8">
        {/* Form Start */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="form-group">
              <label htmlFor="category" className="block text-lg font-medium text-gray-700">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input"
                placeholder="Enter machine category"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type" className="block text-lg font-medium text-gray-700">Type</label>
              <input
                type="text"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input"
                placeholder="Enter machine type"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="form-group">
              <label htmlFor="brand" className="block text-lg font-medium text-gray-700">Brand</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="input"
                placeholder="Enter machine brand"
              />
            </div>

            <div className="form-group">
              <label htmlFor="model_number" className="block text-lg font-medium text-gray-700">Model Number</label>
              <input
                type="text"
                id="model_number"
                name="model_number"
                value={formData.model_number}
                onChange={handleChange}
                className="input"
                placeholder="Enter model number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="form-group">
              <label htmlFor="serial_no" className="block text-lg font-medium text-gray-700">Serial No</label>
              <input
                type="text"
                id="serial_no"
                name="serial_no"
                value={formData.serial_no}
                onChange={handleChange}
                className="input"
                placeholder="Enter serial number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="floor_no" className="block text-lg font-medium text-gray-700">Floor No</label>
              <input
                type="number"
                id="floor_no"
                name="floor_no"
                value={formData.floor_no}
                onChange={handleChange}
                className="input"
                placeholder="Enter floor number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="form-group">
              <label htmlFor="line_no" className="block text-lg font-medium text-gray-700">Line No</label>
              <input
                type="number"
                id="line_no"
                name="line_no"
                value={formData.line_no}
                onChange={handleChange}
                className="input"
                placeholder="Enter line number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="supplier" className="block text-lg font-medium text-gray-700">Supplier</label>
              <input
                type="text"
                id="supplier"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="input"
                placeholder="Enter supplier name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="form-group">
              <label htmlFor="purchase_date" className="block text-lg font-medium text-gray-700">Purchase Date</label>
              <input
                type="datetime-local"
                id="purchase_date"
                name="purchase_date"
                value={formData.purchase_date}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location" className="block text-lg font-medium text-gray-700">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input"
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="form-group">
              <label htmlFor="last_breakdown_start" className="block text-lg font-medium text-gray-700">Last Breakdown Start</label>
              <input
                type="datetime-local"
                id="last_breakdown_start"
                name="last_breakdown_start"
                value={formData.last_breakdown_start}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status" className="block text-lg font-medium text-gray-700">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Under Maintenance</option>
                <option value="broken">Broken</option>
              </select>
            </div>
          </div>

          <div className="mb-6 text-center">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Machine"}
            </button>
          </div>

          {success && <div className="text-green-500 text-center">{success}</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
        {/* Form End */}
      </div>
    </div>
  );
};

export default AddMachineForm;