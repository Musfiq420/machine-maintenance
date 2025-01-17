import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../../../context/userProvider";
import DashboardLoading from "../../../../shared/components/dashboard/dashboardLoading";
import DeleteModal from "../../../../shared/components/ui/deleteModal";
import EmployeeForm from "./employeeForm";
import { constrainedMemory } from "process";
import UserForm from "./userForm";

const EmployeeList = () => {
  const navigate = useNavigate();
  const { getToken, isHr, isAdmin, isMechanic } = useContext(UserContext);
  const hasAccess = isAdmin || isHr;

  const [employees, setEmployees] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10; // Number of employees per page

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const dept_url = `${
        import.meta.env.VITE_URL_PREFIX
      }/api/user_management/department/`;
      const role_url = `${
        import.meta.env.VITE_URL_PREFIX
      }/api/user_management/designation/`;
      const comp_url = `${
        import.meta.env.VITE_URL_PREFIX
      }/api/user_management/groups/`;
      try {
        const dept_res = await fetch(dept_url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const dept_data = await dept_res.json();
        const role_res = await fetch(role_url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const role_data = await role_res.json();
        const comp_res = await fetch(comp_url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const comp_data = await comp_res.json();
        const roles = role_data.map((d) => {
          return { name: d.title, id: d.id };
        });
        const comps = comp_data.map((d) => {
          return { name: d.name, id: d.id };
        });
        const depts = dept_data.map((d) => {
          return { name: d.name, id: d.id };
        });
        setRoleOptions(roles);
        setDepartmentOptions(depts);
        setCompanyOptions(comps);
      } catch (error) {
        console.log(error);
      }
    };
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
      }
    };

    fetchData();
    fetchEmployees();
    setLoading(false);
  }, []);

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
    <>
      {loading ? (
        <DashboardLoading />
      ) : (
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
                  {hasAccess && <th className="p-3">User Actions</th>}
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
                    {hasAccess && (
                      <td className="p-3 gap-4 flex ">
                        <EmployeeForm
                          employee={employee}
                          departmentOptions={departmentOptions}
                          roleOptions={roleOptions}
                          companyOptions={companyOptions}
                          hasAccess={hasAccess}
                        />
                        <DeleteModal
                          data_type={"Employee"}
                          url={`${import.meta.env.VITE_EMPLOYEE_UPDATE_API}${
                            employee.id
                          }/`}
                          hasAccess={hasAccess}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-8 my-5">
              <EmployeeForm
                employee={null}
                departmentOptions={departmentOptions}
                roleOptions={roleOptions}
                companyOptions={companyOptions}
                hasAccess={hasAccess}
              />
              <UserForm
                departmentOptions={departmentOptions}
                hasAccess={hasAccess}
                roleOptions={roleOptions}
              />
            </div>
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
      )}
    </>
  );
};

export default EmployeeList;
