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
import MachineForm from "../../../../shared/components/forms/machineForm";
import DeleteModal from "../../../../shared/components/ui/deleteModal";
import PrintQrCode from "./printQrCode";
import { useSearchParams } from "react-router-dom";
import MachineLineForm from "../../../../shared/components/forms/machineLineForm";

const MachineTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const line = searchParams.get("line");
  const floor = searchParams.get("floor");
  const { getToken, isMechanic, isAdmin } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [colFilters, setColFilters] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
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
      brand: `${baseURL}/maintenance/brand/`,
      supplier: `${baseURL}/maintenance/supplier/`,
      type: `${baseURL}/maintenance/type/`,
      category: `${baseURL}/maintenance/category/`,
      line: `${baseURL}/production/lines/`,
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
        size: 180,
        filterVariant: "multi-select",

        filterSelectOptions: typesOptions.map((c) => c.name) || [],
      },
      {
        accessorKey: "line",
        header: "Line",
        size: 100,
        filterVariant: "multi-select",

        filterSelectOptions: lineOptions.map((c) => c.name) || [],
      },

      {
        accessorKey: "floor",
        header: "Floor",
        size: 100,
        filterVariant: "multi-select",

        filterSelectOptions:
          [...new Set(lineOptions.map((c) => c.floor.name))] || [],
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
        accessorKey: "supplier",
        header: "Supplier",
        size: 150,
      },
      { accessorKey: "purchase_date", header: "Purchase Date", size: 120 },

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
                    {!loading && (
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <DeleteModal
                          data_type={"machine"}
                          url={`${
                            import.meta.env.VITE_MACHINE_MONITORING_DATA_API
                          }${machine.id}/`}
                          hasAccess={hasAccess}
                        />
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
                      </Box>
                    )}
                  </>
                );
              },
            },
          ]
        : []),
    ],
    [
      brandsOptions,
      catsOptions,
      lineOptions,
      suppliersOptions,
      typesOptions,
      hasAccess,
      tabledata,
    ]
  );

  useEffect(() => {
    const filters = colFilters.reduce((acc, f) => {
      acc[f.id] = encodeURI(f.value);
      return acc;
    }, {});
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(); // Clone the current parameters
      Object.keys(filters).forEach((key) => {
        newParams.set(key, filters[key]); // Update the parameters with filters
      });
      return newParams;
    });
  }, [colFilters]);

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("search", searchFilter);
      return prev;
    });
  }, [searchFilter]);

  useEffect(() => {
    const filters = {};

    searchParams.forEach((value, key) => {
      filters[key] = decodeURI(value).split(","); // Handle comma-separated values
    });

    // delete filters["floor"];
    // delete filters["line"];

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
    } else {
      setFilteredData(tabledata || []);
    }
  }, [searchParams, tabledata]);

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
              onGlobalFilterChange={setSearchFilter}
              manualFiltering={true}
              onColumnFiltersChange={setColFilters}
              state={{ columnFilters: colFilters, globalFilter: searchFilter }}
              renderBottomToolbarCustomActions={() => (
                <PrintQrCode data={filtereddata || tabledata} />
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
              <button
                className="bg-none mx-6 text-primary font-semibold"
                onClick={handleCloseModal}
              >
                Close
              </button>
              {selectedMachine && <PrintQrCode data={[selectedMachine]} />}
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
