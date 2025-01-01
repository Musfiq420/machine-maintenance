import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
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
} from '@mui/material';
import QRCode from 'react-qr-code';
import { getApiUrl } from '../../../../shared/components/getApiUrl';

import { jsPDF } from 'jspdf';
import qrcode from 'qrcode'; // For generating QR code data URLs

const QrCodeGenerator = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals state
  const [openModal, setOpenModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);

  // Add Machine Modal
  const [openAddModal, setOpenAddModal] = useState(false);

  // Update Machine Modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  // Delete Confirmation
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [machineToDelete, setMachineToDelete] = useState(null);

  // Add Machine Form States
  const [newMachineId, setNewMachineId] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newType, setNewType] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newModelNumber, setNewModelNumber] = useState('');
  const [newSerialNo, setNewSerialNo] = useState('');
  const [newFloorNo, setNewFloorNo] = useState('');
  const [newLineNo, setNewLineNo] = useState('');
  const [newSupplier, setNewSupplier] = useState('');
  const [newPurchaseDate, setNewPurchaseDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newLastBreakdownStart, setNewLastBreakdownStart] = useState('');
  const [newStatus, setNewStatus] = useState('active');

  // Update Form States
  const [updateMachineId, setUpdateMachineId] = useState('');
  const [updateCategory, setUpdateCategory] = useState('');
  const [updateType, setUpdateType] = useState('');
  const [updateBrand, setUpdateBrand] = useState('');
  const [updateModelNumber, setUpdateModelNumber] = useState('');
  const [updateSerialNo, setUpdateSerialNo] = useState('');
  const [updateFloorNo, setUpdateFloorNo] = useState('');
  const [updateLineNo, setUpdateLineNo] = useState('');
  const [updateSupplier, setUpdateSupplier] = useState('');
  const [updatePurchaseDate, setUpdatePurchaseDate] = useState('');
  const [updateLocation, setUpdateLocation] = useState('');
  const [updateLastBreakdownStart, setUpdateLastBreakdownStart] = useState('');
  const [updateStatus, setUpdateStatus] = useState('active');

  const [formError, setFormError] = useState('');

  const STATUS_CHOICES = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'maintenance', label: 'Under Maintenance' },
    { value: 'broken', label: 'Broken' },
  ];

  const statusColors = {
    active: '#28a745',
    inactive: '#6c757d',
    maintenance: '#ffc107',
    broken: '#dc3545',
  };

  const Machine_QR_Data_API = getApiUrl('Machine_QR_Data_API');
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(Machine_QR_Data_API,{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, // Ensure this header matches what your server expects
      },
  })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setData(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [Machine_QR_Data_API]);

  const handleOpenModal = (machine) => {
    setSelectedMachine(machine);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMachine(null);
  };

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setFormError('');
    resetAddFields();
  };

  const resetAddFields = () => {
    setNewMachineId('');
    setNewCategory('');
    setNewType('');
    setNewBrand('');
    setNewModelNumber('');
    setNewSerialNo('');
    setNewFloorNo('');
    setNewLineNo('');
    setNewSupplier('');
    setNewPurchaseDate('');
    setNewLocation('');
    setNewLastBreakdownStart('');
    setNewStatus('active');
  };

  const handleOpenUpdateModal = (machine) => {
    // Pre-fill update fields
    setUpdateMachineId(machine.machine_id);
    setUpdateCategory(machine.category || '');
    setUpdateType(machine.type || '');
    setUpdateBrand(machine.brand || '');
    setUpdateModelNumber(machine.model_number || '');
    setUpdateSerialNo(machine.serial_no || '');
    setUpdateFloorNo(machine.floor_no || '');
    setUpdateLineNo(machine.line_no || '');
    setUpdateSupplier(machine.supplier || '');
    setUpdatePurchaseDate(machine.purchase_date || '');
    setUpdateLocation(machine.location || '');
    setUpdateLastBreakdownStart(machine.last_breakdown_start || '');
    setUpdateStatus(machine.status || 'active');

    setSelectedMachine(machine);
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedMachine(null);
  };

  const handleSaveMachine = () => {
    setFormError('');
    const floorNoInt = newFloorNo ? parseInt(newFloorNo, 10) : null;
    const lineNoInt = newLineNo ? parseInt(newLineNo, 10) : null;

    const payload = {
      machine_id: newMachineId,
      category: newCategory || null,
      type: newType || null,
      brand: newBrand || null,
      model_number: newModelNumber || null,
      serial_no: newSerialNo || null,
      floor_no: floorNoInt,
      line_no: lineNoInt,
      supplier: newSupplier || null,
      purchase_date: newPurchaseDate || null,
      location: newLocation || null,
      last_breakdown_start: newLastBreakdownStart || null,
      status: newStatus,
    };

    fetch(Machine_QR_Data_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errData) => {
            if (res.status === 400 && errData && errData.machine_id) {
              throw new Error(`Machine with ID "${newMachineId}" already exists.`);
            }
            throw new Error('Failed to create machine');
          });
        }
        return res.json();
      })
      .then(() => fetch(Machine_QR_Data_API))
      .then((res) => res.json())
      .then((updatedData) => {
        setData(updatedData);
        handleCloseAddModal();
      })
      .catch((error) => {
        console.error(error);
        setFormError(error.message);
      });
  };

  const handleUpdateMachine = () => {
    if (!selectedMachine) return;
    const floorNoInt = updateFloorNo ? parseInt(updateFloorNo, 10) : null;
    const lineNoInt = updateLineNo ? parseInt(updateLineNo, 10) : null;

    const payload = {
      machine_id: updateMachineId,
      category: updateCategory || null,
      type: updateType || null,
      brand: updateBrand || null,
      model_number: updateModelNumber || null,
      serial_no: updateSerialNo || null,
      floor_no: floorNoInt,
      line_no: lineNoInt,
      supplier: updateSupplier || null,
      purchase_date: updatePurchaseDate || null,
      location: updateLocation || null,
      last_breakdown_start: updateLastBreakdownStart || null,
      status: updateStatus,
    };

    fetch(`${Machine_QR_Data_API}${updateMachineId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update machine');
        }
        return res.json();
      })
      .then(() => fetch(Machine_QR_Data_API))
      .then((res) => res.json())
      .then((updatedData) => {
        setData(updatedData);
        handleCloseUpdateModal();
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
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
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete machine');
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
        id: 'no',
        header: 'No',
        size: 50,
        Cell: ({ row }) => row.index + 1,
      },
      { accessorKey: 'machine_id', header: 'Machine ID', size: 100 },
      { accessorKey: 'category', header: 'Category', size: 100 },
      { accessorKey: 'type', header: 'Type', size: 100 },
      { accessorKey: 'brand', header: 'Brand', size: 100 },
      { accessorKey: 'model_number', header: 'Model Number', size: 150 },
      { accessorKey: 'serial_no', header: 'Serial No.', size: 150 },
      { accessorKey: 'floor_no', header: 'Floor No.', size: 80 },
      { accessorKey: 'line_no', header: 'Line No.', size: 80 },
      { accessorKey: 'supplier', header: 'Supplier', size: 150 },
      { accessorKey: 'purchase_date', header: 'Purchase Date', size: 120 },
      { accessorKey: 'location', header: 'Location', size: 150 },
      { accessorKey: 'last_breakdown_start', header: 'Last Breakdown Start', size: 180 },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        Cell: ({ cell }) => {
          const val = cell.getValue();
          const bgColor = statusColors[val] || '#17a2b8';
          return (
            <Box
              sx={{
                backgroundColor: bgColor,
                color: '#fff',
                textAlign: 'center',
                borderRadius: '4px',
                padding: '4px',
                fontSize: '0.9rem',
              }}
            >
              {val}
            </Box>
          );
        },
      },
      {
        accessorKey: 'qrCode',
        header: 'QR Code',
        Cell: ({ row }) => {
          const { machine_id } = row.original;
          const qrValue = JSON.stringify({ machine_id });

          return (
            <Box
              sx={{
                cursor: 'pointer',
                display: 'inline-block',
                border: '1px solid #ccc',
                padding: '2px',
                borderRadius: '4px',
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
        id: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ row }) => {
          const machine = row.original;
          return (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" color="error" onClick={() => handleOpenDeleteConfirm(machine)}>
                Delete
              </Button>
              <Button variant="contained" color="info" onClick={() => handleOpenUpdateModal(machine)}>
                Update
              </Button>
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
      alert('No machines found.');
      return;
    }

    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const qrSize = 30;
    const perRow = 4;
    const perPage = 40;

    let x = margin;
    let y = margin + 10;

    doc.setFontSize(14);
    doc.text('All Machine QRs', pageWidth / 2, margin, { align: 'center' });

    for (let i = 0; i < finalData.length; i++) {
      const machine = finalData[i];
      const val = machine.machine_id;
      const qrDataURL = await qrcode.toDataURL(val, { width: 200 });

      doc.addImage(qrDataURL, 'PNG', x, y, qrSize, qrSize);
      doc.setFontSize(10);
      doc.text(`ID: ${machine.machine_id}`, x, y + qrSize + 4);

      x += qrSize + margin;

      if ((i + 1) % perRow === 0) {
        x = margin;
        y += qrSize + 15;
      }

      if ((i + 1) % perPage === 0 && i + 1 < finalData.length) {
        doc.addPage();
        doc.text('All Machine QRs', pageWidth / 2, margin, { align: 'center' });
        x = margin;
        y = margin + 10;
      }
    }

    doc.save('all_qrs.pdf');
  };

  const handlePrintQr = async () => {
    if (!selectedMachine) return;
    const machine_id = selectedMachine.machine_id;
    if (!machine_id) return;

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Machine QR Code', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    const val = machine_id;
    const qrDataURL = await qrcode.toDataURL(val, { width: 200 });

    doc.addImage(qrDataURL, 'PNG', 80, 40, 50, 50);
    doc.setFontSize(12);
    doc.text(`Machine ID: ${machine_id}`, 80, 100);

    doc.save(`${machine_id}_qr.pdf`);
  };

  // Updated loading state with CircularProgress spinner
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
          backgroundColor: '#f5f5f5', // Optional: Light background color
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative', padding: '8px' }}>
      {/* Optional: Loading Overlay if you prefer overlay instead of full screen spinner */}
      {/* Uncomment the following block if you want an overlay spinner */}

      {/* 
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <CircularProgress size={60} thickness={4} />
        </Box>
      )}
      */}

      <MaterialReactTable
        columns={columns}
        data={data}
        enableStickyHeader
        muiTableContainerProps={{
          sx: {
            maxHeight: 'calc(100vh - 200px)',
            overflow: 'auto',
          },
        }}
        renderBottomToolbarCustomActions={() => (
          <Button variant="contained" color="secondary" onClick={handlePrintAllQrs}>
            Print QR
          </Button>
        )}
        renderTopToolbarCustomActions={() => (
          <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
            Add Machine
          </Button>
        )}
        muiTableBodyCellProps={{
          sx: {
            padding: '4px 8px',
            fontSize: '0.9rem',
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            padding: '4px 8px',
            fontWeight: 'bold',
            fontSize: '0.9rem',
          },
        }}
      />

      {/* Modal for QR code details */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
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
                <strong>Last Breakdown Start:</strong> {selectedMachine.last_breakdown_start}
              </p>
              <p>
                <strong>Status:</strong> {selectedMachine.status}
              </p>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <QRCode value={selectedMachine.machine_id} size={128} />
              </Box>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {selectedMachine && (
            <Button variant="contained" color="secondary" onClick={handlePrintQr}>
              Print
            </Button>
          )}
          <Button onClick={handleCloseModal} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Adding a Machine */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal} maxWidth="sm" fullWidth>
        <DialogTitle>Add Machine</DialogTitle>
        <DialogContent>
          {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
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
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal} variant="text">Cancel</Button>
          <Button onClick={handleSaveMachine} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Update Machine */}
      <Dialog open={openUpdateModal} onClose={handleCloseUpdateModal} maxWidth="sm" fullWidth>
        <DialogTitle>Update Machine</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              disabled
              label="Machine ID"
              variant="outlined"
              value={updateMachineId}
              onChange={(e) => setUpdateMachineId(e.target.value)}
            />
            <TextField
              label="Category"
              variant="outlined"
              value={updateCategory}
              onChange={(e) => setUpdateCategory(e.target.value)}
            />
            <TextField
              label="Type"
              variant="outlined"
              value={updateType}
              onChange={(e) => setUpdateType(e.target.value)}
            />
            <TextField
              label="Brand"
              variant="outlined"
              value={updateBrand}
              onChange={(e) => setUpdateBrand(e.target.value)}
            />
            <TextField
              label="Model Number"
              variant="outlined"
              value={updateModelNumber}
              onChange={(e) => setUpdateModelNumber(e.target.value)}
            />
            <TextField
              label="Serial No"
              variant="outlined"
              value={updateSerialNo}
              onChange={(e) => setUpdateSerialNo(e.target.value)}
            />
            <TextField
              label="Floor No"
              variant="outlined"
              value={updateFloorNo}
              onChange={(e) => setUpdateFloorNo(e.target.value)}
              type="number"
            />
            <TextField
              label="Line No"
              variant="outlined"
              value={updateLineNo}
              onChange={(e) => setUpdateLineNo(e.target.value)}
              type="number"
            />
            <TextField
              label="Supplier"
              variant="outlined"
              value={updateSupplier}
              onChange={(e) => setUpdateSupplier(e.target.value)}
            />
            <TextField
              label="Purchase Date (YYYY-MM-DD)"
              variant="outlined"
              value={updatePurchaseDate}
              onChange={(e) => setUpdatePurchaseDate(e.target.value)}
            />
            <TextField
              label="Location"
              variant="outlined"
              value={updateLocation}
              onChange={(e) => setUpdateLocation(e.target.value)}
            />
            <TextField
              label="Last Breakdown Start (YYYY-MM-DDTHH:MM:SS)"
              variant="outlined"
              value={updateLastBreakdownStart}
              onChange={(e) => setUpdateLastBreakdownStart(e.target.value)}
            />
            <FormControl>
              <InputLabel>Status</InputLabel>
              <Select
                value={updateStatus}
                label="Status"
                onChange={(e) => setUpdateStatus(e.target.value)}
              >
                {STATUS_CHOICES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateModal} variant="text">Cancel</Button>
          <Button onClick={handleUpdateMachine} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm}>
        <DialogTitle>Delete Machine</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this machine?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm} variant="text">Cancel</Button>
          <Button onClick={handleDeleteMachine} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QrCodeGenerator;