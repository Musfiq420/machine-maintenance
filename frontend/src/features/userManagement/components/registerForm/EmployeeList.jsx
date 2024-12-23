import { useEffect, useState } from "react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5; // Number of employees per page

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user_management/employees/"
        );
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
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
    return <div className="text-center p-4 text-xl">Loading...</div>;
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Employee List</h1>
      <div className="overflow-x-auto">
        <table className="table w-full table-striped table-hover">
          <thead>
            <tr>
              <th className="bg-primary text-white p-3">Name</th>
              <th className="bg-primary text-white p-3">Company</th>
              <th className="bg-primary text-white p-3">Department</th>
              <th className="bg-primary text-white p-3">Designation</th>
              <th className="bg-primary text-white p-3">Mobile</th>
              <th className="bg-primary text-white p-3">User Email</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-100">
                <td className="p-3">{employee.name || "N/A"}</td>
                <td className="p-3">{employee.company || "N/A"}</td>
                <td className="p-3">{employee.department || "N/A"}</td>
                <td className="p-3">{employee.designation || "N/A"}</td>
                <td className="p-3">{employee.mobile || "N/A"}</td>
                <td className="p-3">
                  {employee.user_email ? (
                    <span className="text-green-500 font-semibold">
                      {employee.user_email}
                    </span>
                  ) : (
                    <span className="text-red-500 font-semibold">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                  ? "bg-primary text-white"
                  : "bg-gray-200"
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
