import { useEffect, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import { RiResetRightLine } from "react-icons/ri";

import './machineTable.css';
import FilterSection from './filterSection';
import TablePagination from './tablePagination';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteModal from '../../../../shared/components/ui/deleteModal';
import MachineForm from '../../../../shared/components/forms/machineForm';
import QRCode from "react-qr-code";
import PrintQrCode from '../machineTable/printQrCode';


const MachineTable = () => {
    const [filterUrl, setFilterUrl] = useState("")
    const [machinesData, setMachinesData] = useState([]);
    const [resetData, setResetData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [filterCategory, setFilterCategory] = useState([]);
    const [filterBrand, setFilterBrand] = useState([]);
    const [filterType, setFilterType] = useState([]);
    const [filterLine, setFilterLine] = useState([]);
    const [filterSupplier, setFilterSupplier] = useState([]);

    const [lineOptions, setlineOptions] = useState([]);
    const [brandsOptions, setBrandsOptions] = useState([]);
    const [suppliersOptions, setSuppliersOptions] = useState([]);
    const [typesOptions, setTypesOptions] = useState([]);
    const [catsOptions, setCatsOptions] = useState([]);

    //Modal
    const [openModal, setOpenModal] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState(null);

    //Pagination state 
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);


    // filter open and close states
    const [filterOpen, setFilterOpen] = useState(false);
    const handleFilterClick = () => {
        setFilterOpen(!filterOpen);
    }
    const handleResetClick = () => {
        setFilterUrl("");
        setMachinesData(resetData);
    }

    useEffect(() => {
        const fetchMachines = async (page) => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.panamach.com/maintenance/machinepagination/?page=${page}${filterUrl}`);
                const data = await response.json();
                const machinesData = data.results;
                setCount(data.count);
                setCurrentPage(page);

                const categoriesData = await fetch(`https://api.panamach.com/maintenance/category/`).then((res) => res.json());
                const typesData = await fetch(`https://api.panamach.com/maintenance/type/`).then((res) => res.json());
                const brandsData = await fetch(`https://api.panamach.com/maintenance/brand/`).then((res) => res.json());
                const linesData = await fetch(`https://api.panamach.com/production/lines/`).then((res) => res.json());
                const suppliersData = await fetch(`https://api.panamach.com/maintenance/supplier/`).then((res) => res.json());

                
                setBrandsOptions(brandsData.map((d) => ({ name: d.name, id: d.id })));
                setSuppliersOptions(
                    suppliersData.map((d) => ({ name: d.name, id: d.id }))
                );
                setTypesOptions(typesData.map((d) => ({ name: d.name, id: d.id })));
                setCatsOptions(categoriesData.map((d) => ({ name: d.name, id: d.id })));
                setlineOptions(
                    linesData.map((d) => ({ name: d.name, id: d.id, floor: d.floor }))
                );

                await Promise.all([categoriesData, typesData, brandsData, linesData, suppliersData]).then(([categoriesData, typesData, brandsData, linesData, suppliersData]) => {
                    setFilterCategory(categoriesData);
                    setFilterBrand(brandsData);
                    setFilterType(typesData);
                    setFilterLine(linesData);
                    setFilterSupplier(suppliersData);

                    // update machine data with fetched category, type, brand, supplier, line identifiers
                    const updateMachineData = machinesData.map((machine) => {
                        const updateMachineData = { ...machine };
                        for (let i = 0; i < categoriesData.length; i++) {
                            if (updateMachineData.category === categoriesData[i].id) {
                                updateMachineData.category = categoriesData[i].name;
                            }
                        }
                        for (let i = 0; i < typesData.length; i++) {
                            if (updateMachineData.type === typesData[i].id) {
                                updateMachineData.type = typesData[i].name;
                            }
                        }

                        for (let i = 0; i < brandsData.length; i++) {
                            if (updateMachineData.brand === brandsData[i].id) {
                                updateMachineData.brand = brandsData[i].name;
                            }
                        }

                        for (let i = 0; i < linesData.length; i++) {
                            if (updateMachineData.line === linesData[i].id) {
                                updateMachineData.line = linesData[i].name;
                            }
                        }

                        for (let i = 0; i < suppliersData.length; i++) {
                            if (updateMachineData.supplier === suppliersData[i].id) {
                                updateMachineData.supplier = suppliersData[i].name;
                            }
                        }
                        return updateMachineData;
                    }
                    );

                    // set the updated machines data to the state variable
                    setMachinesData(updateMachineData);
                    // console.log({ updateMachineData });
                    setResetData(updateMachineData);
                    setLoading(false);
                });
            } catch (error) {
                console.error('Error fetching machines:', error);
            }
        }
        fetchMachines(currentPage);
    }, [currentPage, filterUrl]);

    const handleOpenModal = (machine) => {
        setSelectedMachine(machine);
        setOpenModal(true);
      };
    
      const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedMachine(null);
      };

    // console.log({ machinesData });
    return (
        <>
            <section className="machine-table-section text-center">
                <h1>Machine List & Details Table</h1>
                <div className="filter-reset-button">
                    <div className='flex '>
                    <MachineForm
                                      machine={null}
                                      brandsOptions={brandsOptions}
                                      catsOptions={catsOptions}
                                      lineOptions={lineOptions}
                                      suppliersOptions={suppliersOptions}
                                      typesOptions={typesOptions}
                                      hasAccess={true}
                                    />
                                    <PrintQrCode data={machinesData} />
                                    </div>
                    <div>
                        
                        <div className="filter" onClick={() => handleFilterClick()} title="Filter">
                            <p className="filter-text">Filter</p>
                            <FaFilter />
                        </div>
                        <div className="reset" onClick={() => handleResetClick()}>
                            <p>Reset Filter</p>
                            <RiResetRightLine />
                        </div>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Sequence</th>
                            <th>Machine ID</th>
                            <th>Model Number</th>
                            <th>Serial No</th>
                            <th>Purchase Date</th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Brand</th>
                            <th>Line</th>
                            <th>Supplier</th>
                            <th>QR Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            machinesData?.map((machine) => (
                                <tr key={machine.id}>
                                    <td>{machine.sequence}</td>
                                    <td>{machine.machine_id}</td>
                                    <td>{machine.model_number}</td>
                                    <td>{machine.serial_no}</td>
                                    <td>{machine.purchase_date}</td>
                                    <td>{machine.status}</td>
                                    <td>{machine.category}</td>
                                    <td>{machine.type}</td>
                                    <td>{machine.brand}</td>
                                    <td>{machine.line}</td>
                                    <td>{machine.supplier}</td>
                                    <td>
                                        <Box
                                            sx={{
                                                cursor: "pointer",
                                                display: "inline-block",
                                                border: "1px solid #ccc",
                                                padding: "2px",
                                                borderRadius: "4px",
                                            }}
                                            onClick={() => handleOpenModal(machine)}
                                            >
                                                Open QR
                                            {/* <QRCode value={machine.machine_id} size={24} /> */}
                                        </Box>
                                    </td>
                                    <td>
                                        <Box sx={{ display: "flex", gap: 1 }}>
                                            <DeleteModal
                                            data_type={"machine"}
                                            url={`${
                                                import.meta.env.VITE_MACHINE_MONITORING_DATA_API
                                            }${machine.id}/`}
                                            hasAccess={true}
                                            />
                                            <MachineForm
                                            machine={machine}
                                            brandsOptions={brandsOptions}
                                            catsOptions={catsOptions}
                                            lineOptions={lineOptions}
                                            suppliersOptions={suppliersOptions}
                                            typesOptions={typesOptions}
                                            hasAccess={true}
                                            />
                                        </Box>
                                    </td>
                                </tr>
                            ))
                        }{
                            machinesData.length === 0 && !loading && <tr><td className="loader" colSpan={10}>No machines data found!</td></tr>
                        }
                        {
                            loading && <tr><td className="loader" colSpan={10}>Loading...</td></tr>
                        }
                    </tbody>
                </table>
                <div>
                        <TablePagination count={count} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                    </div>
                {/* Filter popup menu */}
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
                <FilterSection setFilterUrl={setFilterUrl} filterCategory={filterCategory} filterBrand={filterBrand} filterType={filterType} filterLine={filterLine} filterSupplier={filterSupplier} filterOpen={filterOpen} setFilterOpen={setFilterOpen} setMachinesData={setMachinesData} />
            </section>
        </>
    )
}

export default MachineTable