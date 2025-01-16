import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../../context/userProvider";
import DashboardLoading from "../../../../shared/components/dashboard/dashboardLoading";
import DeleteModal from "../../../../shared/components/ui/deleteModal";
import EmployeeForm from "./employeeForm";

const EmployeeList = () => {
  const navigate = useNavigate();
  const { getToken } = useContext(UserContext);

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10; // Number of employees per page

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = getToken();
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_URL_PREFIX
          }/api/user_management/employee-list/`,
          {
            headers: {
              Authorization: token, // Ensure the token is being sent
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setEmployees(data); // Set the state
        } else {
          console.error("Error fetching employees:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <DashboardLoading title={"Employee"} />;
  }

  // Get current employees for the page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-primary-accent h-full">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary-dark">
        Employee List
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full border border-primary-accent rounded-md shadow-md">
          <thead>
            <tr className="bg-primary-dark text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Company</th>
              <th className="p-3">Department</th>
              <th className="p-3">Designation</th>
              <th className="p-3">Mobile</th>
              <th className="p-3">User Email</th>
              <th className="p-3">User Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-green-200 border-b cursor-pointer bg-white text-black border-primary-accent"
              >
                <td className="p-3">{employee.name || "N/A"}</td>
                <td className="p-3">{employee.company || "N/A"}</td>
                <td className="p-3">{employee.department || "N/A"}</td>
                <td className="p-3">{employee.designation || "N/A"}</td>
                <td className="p-3">{employee.mobile || "N/A"}</td>
                <td className="p-3">
                  {employee.user ? (
                    <span className="text-green-700 font-semibold">
                      {employee.user.email}
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">N/A</span>
                  )}
                </td>
                <td className="p-3 gap-4 flex ">
                  <EmployeeForm employee={employee} />
                  <DeleteModal
                    data_type={"Employee"}
                    url={`${import.meta.env.VITE_EMPLOYEE_UPDATE_API}${
                      employee.id
                    }/`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="btn mt-5 bg-primary-dark text-white"
        >
          Add Employee
        </button>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(employees.length / employeesPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-primary-dark text-white"
                  : "bg-green-200 hover:bg-primary-dark hover:text-white text-black"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
