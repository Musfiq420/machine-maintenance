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

const MachineTable = () => {
  const { getToken, isMechanic, isHr, isAdmin } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          return { name: d.name, id: d.id, floor: d.floor };
        });
        console.log(lines);
        setlineOptions(lines);
        const brands = brand_data.map((d) => {
          return { name: d.name, id: d.id, floor: d.floor };
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
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const statusColors = {
    active: "#28a745",
    inactive: "#6c757d",
    maintenance: "#ffc107",
    broken: "#dc3545",
  };

  const token = getToken();
  const getMachineData = () => {
    setLoading(true);
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
        setData(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        setData([]);
      });
  };

  useEffect(() => {
    getMachineData();
  }, []);

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
      { accessorKey: "machine_id", header: "Machine ID", size: 100 },
      {
        accessorKey: "category",
        header: "Category",
        size: 100,
        Cell: ({ row }) => {
          const { category } = row.original;
          const title = catsOptions.find((c) => c.id === category)?.name || "";

          return <>{title}</>;
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 100,
        Cell: ({ row }) => {
          const { type } = row.original;
          const title = typesOptions.find((c) => c.id === type)?.name || "";

          return <>{title}</>;
        },
      },
      {
        accessorKey: "brand",
        header: "Brand",
        size: 100,
        Cell: ({ row }) => {
          const { brand } = row.original;
          const title = brandsOptions.find((c) => c.id === brand)?.name || "";

          return <>{title}</>;
        },
      },
      { accessorKey: "model_number", header: "Model Number", size: 150 },
      { accessorKey: "serial_no", header: "Serial No.", size: 150 },
      {
        accessorKey: "floor_no",
        header: "Floor No.",
        size: 80,
        Cell: ({ row }) => {
          const { line } = row.original;
          const title =
            lineOptions.find((c) => c.id === line)?.floor?.name || "";
          console.log(lineOptions.find((c) => c.id === line));
          return <>{title}</>;
        },
      },
      {
        accessorKey: "line",
        header: "Line No.",
        size: 80,
        Cell: ({ row }) => {
          const { line } = row.original;
          const title = lineOptions.find((c) => c.id === line)?.name || "";

          return <>{title}</>;
        },
      },
      {
        accessorKey: "supplier",
        header: "Supplier",
        size: 150,
        Cell: ({ row }) => {
          const { supplier } = row.original;
          const title =
            suppliersOptions.find((c) => c.id === supplier)?.name || "";

          return <>{title}</>;
        },
      },
      { accessorKey: "purchase_date", header: "Purchase Date", size: 120 },
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
      ...(hasAccess
        ? [
            {
              id: "actions",
              header: "Actions",
              size: 150,
              Cell: ({ row }) => {
                const machine = row.original;
                return (
                  <>
                    {machine.status=='active' && (
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
    const perRow = 5;
    const perPage = 30;

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
