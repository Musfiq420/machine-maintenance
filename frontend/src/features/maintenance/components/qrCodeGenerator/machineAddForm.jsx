import React, { useState } from "react";

export default function MachineAddForm() {
  const [formData, SetFormData] = useState({
    machine_id: "",
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
    status: "",
  });
  const fields = [
    { id: "machine_id", label: "machine_id", type: "text" },
    { id: "category", label: "category", type: "text" },
    { id: "type", label: "type", type: "text" },
    { id: "brand", label: "brand", type: "text" },
    { id: "model_number", label: "model_number", type: "text" },
    { id: "serial_no", label: "serial_no", type: "text" },
    { id: "floor_no", label: "floor_no", type: "text" },
    { id: "line_no", label: "line_no", type: "text" },
    { id: "supplier", label: "supplier", type: "text" },
    { id: "purchase_date", label: "purchase_date", type: "text" },
    { id: "location", label: "location", type: "text" },
    { id: "last_breakdown_start", label: "last_breakdown_start", type: "text" },
    { id: "status", label: "status", type: "text" },
  ];

  return (
    <div>
      <Dialog
        open={openAddModal}
        onClose={handleCloseAddModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Machine</DialogTitle>
        <DialogContent>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Machine ID"
              variant="outlined"
              value={newMachineId}
              onChange={(e) => setNewMachineId(e.target.value)}
              required
            />
            <TextField
              label="Category"
              variant="outlined"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <TextField
              label="Type"
              variant="outlined"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            />
            <TextField
              label="Brand"
              variant="outlined"
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
            />
            <TextField
              label="Model Number"
              variant="outlined"
              value={newModelNumber}
              onChange={(e) => setNewModelNumber(e.target.value)}
            />
            <TextField
              label="Serial No"
              variant="outlined"
              value={newSerialNo}
              onChange={(e) => setNewSerialNo(e.target.value)}
            />
            <TextField
              label="Floor No"
              variant="outlined"
              value={newFloorNo}
              onChange={(e) => setNewFloorNo(e.target.value)}
              type="number"
            />
            <TextField
              label="Line No"
              variant="outlined"
              value={newLineNo}
              onChange={(e) => setNewLineNo(e.target.value)}
              type="number"
            />
            <TextField
              label="Supplier"
              variant="outlined"
              value={newSupplier}
              onChange={(e) => setNewSupplier(e.target.value)}
            />
            <TextField
              label="Purchase Date (YYYY-MM-DD)"
              variant="outlined"
              value={newPurchaseDate}
              onChange={(e) => setNewPurchaseDate(e.target.value)}
            />
            <TextField
              label="Location"
              variant="outlined"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />
            <TextField
              label="Last Breakdown Start (YYYY-MM-DDTHH:MM:SS)"
              variant="outlined"
              value={newLastBreakdownStart}
              onChange={(e) => setNewLastBreakdownStart(e.target.value)}
            />
            <FormControl>
              <InputLabel>Status</InputLabel>
              <Select
                value={newStatus}
                label="Status"
                onChange={(e) => setNewStatus(e.target.value)}
              >
                {STATUS_CHOICES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal} variant="text">
            Cancel
          </Button>
          <Button
            onClick={handleSaveMachine}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
