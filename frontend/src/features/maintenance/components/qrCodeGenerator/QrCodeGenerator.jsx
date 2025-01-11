import React, { useMemo, useState, useEffect, useContext } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
  CircularProgress, // Imported CircularProgress
} from "@mui/material";
import QRCode from "react-qr-code";
import { getApiUrl } from "../../../../shared/components/getApiUrl";

import { jsPDF } from "jspdf";
import qrcode from "qrcode"; // For generating QR code data URLs
import { UserContext } from "../../../../context/userProvider";
import DashboardLoading from "../../../../shared/components/dashboard/dashboardLoading";
import MachineForm from "./machineForm";

const QrCodeGenerator = () => {
  const { getToken } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals state
  const [openModal, setOpenModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);

  // Delete Confirmation
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [machineToDelete, setMachineToDelete] = useState(null);

  const statusColors = {
    active: "#28a745",
    inactive: "#6c757d",
    maintenance: "#ffc107",
    broken: "#dc3545",
  };

  const Machine_QR_Data_API = getApiUrl("Machine_QR_Data_API");
  const token = getToken();

  useEffect(() => {
    fetch(import.meta.env.VITE_MACHINE_DATA_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`, // Ensure this header matches what your server expects
      },
    })
      .then((response) => {
        if (!response.ok) {
          // If the response is not ok, throw an error with the response details
          return response.json().then((err) => {
            throw new Error(err.detail || "An error occurred");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        setData([]);
      });
  }, []);

  const handleOpenModal = (machine) => {
    setSelectedMachine(machine);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMachine(null);
  };

  const handleOpenDeleteConfirm = (machine) => {
    setMachineToDelete(machine);
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
    setMachineToDelete(null);
  };

  const handleDeleteMachine = () => {
    if (!machineToDelete) return;
    const { machine_id } = machineToDelete;
    fetch(`${Machine_QR_Data_API}${machine_id}/`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete machine");
        }
        return fetch(Machine_QR_Data_API);
      })
      .then((res) => res.json())
      .then((updatedData) => {
        setData(updatedData);
        handleCloseDeleteConfirm();
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

  const columns = useMemo(
    () => [
      {
        id: "no",
        header: "No",
        size: 50,
        Cell: ({ row }) => row.index + 1,
      },
      { accessorKey: "machine_id", header: "Machine ID", size: 100 },
      { accessorKey: "category", header: "Category", size: 100 },
      { accessorKey: "type", header: "Type", size: 100 },
      { accessorKey: "brand", header: "Brand", size: 100 },
      { accessorKey: "model_number", header: "Model Number", size: 150 },
      { accessorKey: "serial_no", header: "Serial No.", size: 150 },
      { accessorKey: "floor_no", header: "Floor No.", size: 80 },
      { accessorKey: "line_no", header: "Line No.", size: 80 },
      { accessorKey: "supplier", header: "Supplier", size: 150 },
      { accessorKey: "purchase_date", header: "Purchase Date", size: 120 },
      { accessorKey: "location", header: "Location", size: 150 },
      {
        accessorKey: "last_breakdown_start",
        header: "Last Breakdown Start",
        size: 180,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        Cell: ({ cell }) => {
          const val = cell.getValue();
          const bgColor = statusColors[val] || "#17a2b8";
          return (
            <Box
              sx={{
                backgroundColor: bgColor,
                color: "#fff",
                textAlign: "center",
                borderRadius: "4px",
                padding: "4px",
                fontSize: "0.9rem",
              }}
            >
              {val}
            </Box>
          );
        },
      },
      {
        accessorKey: "qrCode",
        header: "QR Code",
        Cell: ({ row }) => {
          const { machine_id } = row.original;
          const qrValue = JSON.stringify({ machine_id });

          return (
            <Box
              sx={{
                cursor: "pointer",
                display: "inline-block",
                border: "1px solid #ccc",
                padding: "2px",
                borderRadius: "4px",
              }}
              onClick={() => handleOpenModal(row.original)}
            >
              <QRCode value={qrValue} size={48} />
            </Box>
          );
        },
        size: 100,
      },
      {
        id: "actions",
        header: "Actions",
        size: 150,
        Cell: ({ row }) => {
          const machine = row.original;
          return (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleOpenDeleteConfirm(machine)}
              >
                Delete
              </Button>
              <MachineForm machine={machine} />
            </Box>
          );
        },
      },
    ],
    []
  );

  const handlePrintAllQrs = async () => {
    const finalData = data;
    if (finalData.length === 0) {
      alert("No machines found.");
      return;
    }

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const qrSize = 30;
    const perRow = 4;
    const perPage = 40;

    let x = margin;
    let y = margin + 10;

    doc.setFontSize(14);
    doc.text("All Machine QRs", pageWidth / 2, margin, { align: "center" });

    for (let i = 0; i < finalData.length; i++) {
      const machine = finalData[i];
      const val = machine.machine_id;
      const qrDataURL = await qrcode.toDataURL(val, { width: 200 });

      doc.addImage(qrDataURL, "PNG", x, y, qrSize, qrSize);
      doc.setFontSize(10);
      doc.text(`ID: ${machine.machine_id}`, x, y + qrSize + 4);

      x += qrSize + margin;

      if ((i + 1) % perRow === 0) {
        x = margin;
        y += qrSize + 15;
      }

      if ((i + 1) % perPage === 0 && i + 1 < finalData.length) {
        doc.addPage();
        doc.text("All Machine QRs", pageWidth / 2, margin, { align: "center" });
        x = margin;
        y = margin + 10;
      }
    }

    doc.save("all_qrs.pdf");
  };

  const handlePrintQr = async () => {
    if (!selectedMachine) return;
    const machine_id = selectedMachine.machine_id;
    if (!machine_id) return;

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Machine QR Code", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    const val = machine_id;
    const qrDataURL = await qrcode.toDataURL(val, { width: 200 });

    doc.addImage(qrDataURL, "PNG", 80, 40, 50, 50);
    doc.setFontSize(12);
    doc.text(`Machine ID: ${machine_id}`, 80, 100);

    doc.save(`${machine_id}_qr.pdf`);
  };

  // Updated loading state with CircularProgress spinner
  if (loading) {
    return <DashboardLoading />;
  }

  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        padding: "8px",
      }}
    >
      <MaterialReactTable
        columns={columns}
        data={data}
        enableStickyHeader
        muiTableContainerProps={{
          sx: {
            maxHeight: "calc(100vh - 200px)",
            overflow: "auto",
          },
        }}
        renderBottomToolbarCustomActions={() => (
          <button
            className="px-12 py-3 bg-primary text-white font-semibold rounded-md"
            onClick={handlePrintAllQrs}
          >
            Print QR
          </button>
        )}
        renderTopToolbarCustomActions={() => <MachineForm />}
        muiTableBodyCellProps={{
          sx: {
            padding: "4px 8px",
            fontSize: "0.9rem",
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            padding: "4px 8px",
            fontWeight: "bold",
            fontSize: "0.9rem",
          },
        }}
      />

      {/* Modal for QR code details */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Machine Details</DialogTitle>
        <DialogContent>
          {selectedMachine && (
            <>
              <p>
                <strong>Machine ID:</strong> {selectedMachine.machine_id}
              </p>
              <p>
                <strong>Category:</strong> {selectedMachine.category}
              </p>
              <p>
                <strong>Model Number:</strong> {selectedMachine.model_number}
              </p>
              <p>
                <strong>Type:</strong> {selectedMachine.type}
              </p>
              <p>
                <strong>Brand:</strong> {selectedMachine.brand}
              </p>
              <p>
                <strong>Serial No:</strong> {selectedMachine.serial_no}
              </p>
              <p>
                <strong>Floor No:</strong> {selectedMachine.floor_no}
              </p>
              <p>
                <strong>Line No:</strong> {selectedMachine.line_no}
              </p>
              <p>
                <strong>Supplier:</strong> {selectedMachine.supplier}
              </p>
              <p>
                <strong>Purchase Date:</strong> {selectedMachine.purchase_date}
              </p>
              <p>
                <strong>Location:</strong> {selectedMachine.location}
              </p>
              <p>
                <strong>Last Breakdown Start:</strong>{" "}
                {selectedMachine.last_breakdown_start}
              </p>
              <p>
                <strong>Status:</strong> {selectedMachine.status}
              </p>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <QRCode value={selectedMachine.machine_id} size={128} />
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {selectedMachine && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePrintQr}
            >
              Print
            </Button>
          )}
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Delete Machine</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this machine?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} variant="text">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteMachine}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QrCodeGenerator;
