import { useEffect, useState } from 'react';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user_management/employees/');
                if (response.ok) {
                    const data = await response.json();
                    setEmployees(data);
                } else {
                    console.error('Error fetching employees:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    if (loading) {
        return <div className="text-center p-4 text-xl">Loading...</div>;
    }

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
                            <th className="bg-primary text-white p-3">User</th> {/* New column */}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id} className="hover:bg-gray-100">
                                <td className="p-3">{employee.name || "N/A"}</td>
                                <td className="p-3">{employee.company || "N/A"}</td>
                                <td className="p-3">{employee.department || "N/A"}</td>
                                <td className="p-3">{employee.designation || "N/A"}</td>
                                <td className="p-3">{employee.mobile || "N/A"}</td>
                                <td className="p-3">
                                    {/* Displaying "User" status based on the `user` field */}
                                    {employee.user ? (
                                        <span className="text-green-500 font-semibold">Active</span>
                                    ) : (
                                        <span className="text-red-500 font-semibold">Inactive</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
