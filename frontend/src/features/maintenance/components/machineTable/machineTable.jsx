import React, { useMemo, useState, useEffect, useContext } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  // Imported CircularProgress
} from "@mui/material";
import QRCode from "react-qr-code";

import { jsPDF } from "jspdf";
import qrcode from "qrcode"; // For generating QR code data URLs
import { UserContext } from "../../../../context/userProvider";
import DashboardLoading from "../../../../shared/components/dashboard/dashboardLoading";
import MachineForm from "./machineForm";
import DeleteModal from "../../../../shared/components/ui/deleteModal";
import PrintQrCode from "./printQrCode";
import { useSearchParams } from "react-router-dom";

const MachineTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getToken, isMechanic, isAdmin } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [tabledata, settableData] = useState(null);
  const [filtereddata, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sucess, setSucess] = useState(false);
  const hasAccess = isAdmin || isMechanic;

  // Modals state
  const [openModal, setOpenModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);

  const [lineOptions, setlineOptions] = useState([]);
  const [brandsOptions, setBrandsOptions] = useState([]);
  const [suppliersOptions, setSuppliersOptions] = useState([]);
  const [typesOptions, setTypesOptions] = useState([]);
  const [catsOptions, setCatsOptions] = useState([]);

  const fetchAndParse = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error fetching data");
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      throw error;
    }
  };

  const fetchData = async () => {
    const baseURL = import.meta.env.VITE_URL_PREFIX;

    const urls = {
      brand: `${baseURL}/api/maintenance/brand/`,
      supplier: `${baseURL}/api/maintenance/supplier/`,
      type: `${baseURL}/api/maintenance/type/`,
      category: `${baseURL}/api/maintenance/category/`,
      line: `${baseURL}/api/production/lines/`,
    };

    try {
      const [brandData, supplierData, typeData, catData, lineData] =
        await Promise.all(Object.values(urls).map(fetchAndParse));

      // Map and update state
      setBrandsOptions(brandData.map((d) => ({ name: d.name, id: d.id })));
      setSuppliersOptions(
        supplierData.map((d) => ({ name: d.name, id: d.id }))
      );
      setTypesOptions(typeData.map((d) => ({ name: d.name, id: d.id })));
      setCatsOptions(catData.map((d) => ({ name: d.name, id: d.id })));
      setlineOptions(
        lineData.map((d) => ({ name: d.name, id: d.id, floor: d.floor }))
      );
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const getMachineData = async () => {
    const token = getToken();
    try {
      const response = await fetch(import.meta.env.VITE_MACHINE_DATA_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error fetching machine data");
      }

      const data = await response.json();

      setData(data || []);
    } catch (error) {
      console.error("Error fetching machine data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllData = async () => {
    setLoading(true);
    try {
      await fetchData();
      await getMachineData();
    } catch (error) {
      console.error("Error fetching all data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    const updatedData = data.map((machine) => {
      const { category, brand, supplier, type, line } = machine;
      return {
        ...machine,
        category: catsOptions.find((c) => c.id === category)?.name || "",
        brand: brandsOptions.find((c) => c.id === brand)?.name || "",
        supplier: suppliersOptions.find((c) => c.id === supplier)?.name || "",
        type: typesOptions.find((c) => c.id === type)?.name || "",
        line: lineOptions.find((c) => c.id === line)?.name || "",
        floor: lineOptions.find((c) => c.id === line)?.floor?.name || "",
      };
    });
    settableData(updatedData);
  }, [
    catsOptions,
    brandsOptions,
    suppliersOptions,
    typesOptions,
    data,
    lineOptions,
  ]);

  const handleOpenModal = (machine) => {
    setSelectedMachine(machine);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMachine(null);
  };

  useEffect(() => {
    if (sucess) {
      getMachineData();
      setSucess(false);
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        id: "no",
        header: "No",
        size: 50,
        Cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "machine_id",
        header: "Machine ID",
        size: 100,
        enableColumnFilter: false,
      },
      {
        accessorKey: "category",
        header: "Category",
        filterVariant: "multi-select",
        filterSelectOptions: catsOptions.map((c) => c.name) || [],
        size: 100,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 100,
        filterVariant: "multi-select",
        filterSelectOptions: typesOptions.map((c) => c.name) || [],
      },
      {
        accessorKey: "brand",
        header: "Brand",
        size: 100,
        filterVariant: "multi-select",
        filterSelectOptions: brandsOptions.map((c) => c.name) || [],
      },
      { accessorKey: "model_number", header: "Model Number", size: 150 },
      { accessorKey: "serial_no", header: "Serial No.", size: 150 },
      {
        accessorKey: "floor",
        header: "Floor No.",
        size: 80,
      },
      {
        accessorKey: "line",
        header: "Line No.",
        size: 80,
      },
      {
        accessorKey: "supplier",
        header: "Supplier",
        size: 150,
      },
      { accessorKey: "purchase_date", header: "Purchase Date", size: 120 },
      {
        accessorKey: "last_breakdown_start",
        header: "Last Breakdown Start",
        size: 180,
      },
      {
        accessorKey: "status",
        enableColumnFilter: false,
        header: "Status",
        size: 100,
        Cell: ({ cell }) => <StatusComp cell={cell} />,
      },
      {
        accessorKey: "qrCode",
        enableColumnFilter: false,
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
      ...(hasAccess
        ? [
            {
              id: "actions",
              enableColumnFilter: false,
              header: "Actions",
              size: 150,
              Cell: ({ row }) => {
                const machine = row.original;
                return (
                  <>
                    {machine.status == "active" && (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <MachineForm
                          machine={machine}
                          sucess={sucess}
                          brandsOptions={brandsOptions}
                          catsOptions={catsOptions}
                          lineOptions={lineOptions}
                          suppliersOptions={suppliersOptions}
                          typesOptions={typesOptions}
                          setSucess={setSucess}
                          hasAccess={hasAccess}
                        />
                        <DeleteModal
                          data_type={"machine"}
                          url={`${
                            import.meta.env.VITE_MACHINE_MONITORING_DATA_API
                          }${machine.id}/`}
                          hasAccess={hasAccess}
                        />
                      </Box>
                    )}
                  </>
                );
              },
            },
          ]
        : []),
    ],
    [brandsOptions, catsOptions, lineOptions, suppliersOptions, typesOptions]
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

  useEffect(() => {
    const filters = {};

    searchParams.forEach((value, key) => {
      filters[key] = decodeURI(value).split(","); // Handle comma-separated values
    });

    if (Object.keys(filters).length > 0 && tabledata) {
      if (filters["search"]) {
        const searchData = tabledata.filter((machine) =>
          Object.values(machine).some((value) => {
            return (
              value !== null &&
              value !== undefined && // Exclude null or undefined values
              value
                .toString()
                .toLowerCase()
                .includes(filters["search"]?.toString().toLowerCase())
            );
          })
        );
        delete filters["search"];

        const newData = searchData.filter((machine) =>
          Object.entries(filters).every(([key, values]) => {
            return values.length === 1
              ? machine[key].toLowerCase().includes(values[0].toLowerCase())
              : values.includes(machine[key]);
          })
        );
        setFilteredData(newData);
      } else {
        const newData = tabledata.filter((machine) =>
          Object.entries(filters).every(([key, values]) => {
            return values.length === 1
              ? machine[key].toLowerCase().includes(values[0].toLowerCase())
              : values.includes(machine[key]);
          })
        );
        setFilteredData(newData);
      }
    }
  }, [searchParams, tabledata]);
  console.log(lineOptions);

  return (
    <div>
      {!loading ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            padding: "8px",
          }}
        >
          {tabledata && (
            <MaterialReactTable
              columns={columns}
              data={filtereddata ? filtereddata : tabledata}
              enableStickyHeader
              muiTableContainerProps={{
                sx: {
                  maxHeight: "calc(100vh - 200px)",
                  overflow: "auto",
                },
              }}
              onGlobalFilterChange={handleSearch}
              manualFiltering={true}
              onColumnFiltersChange={handleFilter}
              renderBottomToolbarCustomActions={() => <PrintQrCode />}
              renderTopToolbarCustomActions={() => (
                <MachineForm
                  machine={null}
                  brandsOptions={brandsOptions}
                  catsOptions={catsOptions}
                  lineOptions={lineOptions}
                  suppliersOptions={suppliersOptions}
                  typesOptions={typesOptions}
                  sucess={sucess}
                  setSucess={setSucess}
                  hasAccess={hasAccess}
                />
              )}
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
          )}

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
                    <strong>Model Number:</strong>{" "}
                    {selectedMachine.model_number}
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
                    <strong>Purchase Date:</strong>{" "}
                    {selectedMachine.purchase_date}
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

                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
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
        </Box>
      ) : (
        <DashboardLoading />
      )}
    </div>
  );
};

export default MachineTable;

function StatusComp({ cell }) {
  const val = cell.getValue();
  const statusColors = {
    active: "#28a745",
    inactive: "#6c757d",
    maintenance: "#ffc107",
    broken: "#dc3545",
  };

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
}
