import React, { useEffect, useState } from 'react';

const EmployeeName = () => {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [company, setCompany] = useState('');

    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchEmployeeName = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/user_management/employee/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`, // Ensure this header matches what your server expects
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setDesignation(data.designation);
                    setDepartment(data.department);
                    setCompany(data.company);
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || 'Failed to fetch employee name');
                }
            } catch (error) {
                setError('An error occurred while fetching employee name');
            }
        };

        fetchEmployeeName();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return <>
    <p>{name || 'Loading...'}</p>
    <p className="text-gray-500">{designation}, {department}</p>
    <p className="text-gray-500">{company}</p>
    </>;
};

export default EmployeeName;
