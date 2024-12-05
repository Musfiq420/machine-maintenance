import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table'; // Importing MaterialReactTable
import { Box } from '@mui/material'; // Importing Material UI components
import QRCode from 'react-qr-code'; // Importing QRCode component

const QrCodeGenerator = () => {
  // Define the state for storing data and loading state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API on component mount
  useEffect(() => {
    // Fetching data from the API
    fetch('http://127.0.0.1:8000/api/maintenance/machines/')
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Set the fetched data into state
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        setError(err); // Set error if API request fails
        setLoading(false); // Set loading to false if an error occurs
      });
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // Define columns using useMemo to ensure stable reference
  const columns = useMemo(
    () => [
      {
        accessorKey: 'category',
        header: 'Category',
        size: 150,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 150,
      },
      {
        accessorKey: 'brand',
        header: 'Brand',
        size: 150,
      },
      {
        accessorKey: 'model_number',
        header: 'Model Number',
        size: 200,
      },
      {
        accessorKey: 'serial_no',
        header: 'Serial No.',
        size: 200,
      },
      {
        accessorKey: 'floor_no',
        header: 'Floor No.',
        size: 100,
      },
      {
        accessorKey: 'line_no',
        header: 'Line No.',
        size: 100,
      },
      {
        accessorKey: 'supplier',
        header: 'Supplier',
        size: 200,
      },
      {
        accessorKey: 'purchase_date',
        header: 'Purchase Date',
        size: 150,
      },
      {
        accessorKey: 'location',
        header: 'Location',
        size: 200,
      },
      {
        accessorKey: 'last_breakdown_start',
        header: 'Last Breakdown Start',
        size: 200,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
      },
      {
        accessorKey: 'qrCode', // New column for QR Code
        header: 'QR Code',
        Cell: ({ row }) => {
          // Generate a QR code based on the serial number (or any unique property)
          const qrValue = row.original.serial_no; // Using serial number for the QR code
          return <QRCode value={qrValue} size={64} />;
        },
        size: 150,
      },
    ],
    []
  );

  // Render loading, error, or the table depending on the state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <Box sx={{ width: '100%', height: '100%', maxWidth: '100%', overflowX: 'auto' }}>
      {/* Render MaterialReactTable with columns and data */}
      <MaterialReactTable columns={columns} data={data} />
    </Box>
  );
};

export default QrCodeGenerator;
