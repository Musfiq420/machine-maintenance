import { useState } from 'react';
import '../../styles/registerForm/RegistrationForm.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        name: '',
        company: '',
        department: '',
        mobile: '',
        designation: '',
        employee_id: '',
        date_of_joining: '',
        assigned_line: '',
        assigned_block: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user_management/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Registration successful!');
                setErrorMessage('');
                console.log('User registered:', data);
            } else {
                const errorData = await response.json();
                setErrorMessage('Registration failed. ' + (errorData.detail || ''));
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred during registration.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gray-100">
            {/* Form Wrapper */}
            <div className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl overflow-auto">
                    <h2 className="text-2xl font-bold text-center mb-6">Employee Registration</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* User Details */}
                        <div className="form-group">
                            <label htmlFor="email" className="block text-sm font-medium">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="block text-sm font-medium">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm_password" className="block text-sm font-medium">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        {/* Employee Details */}
                        <div className="form-group">
                            <label htmlFor="name" className="block text-sm font-medium">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="company" className="block text-sm font-medium">Company:</label>
                            <input
                                type="text"
                                id="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department" className="block text-sm font-medium">Department:</label>
                            <input
                                type="text"
                                id="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobile" className="block text-sm font-medium">Mobile:</label>
                            <input
                                type="tel"
                                id="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="designation" className="block text-sm font-medium">Designation:</label>
                            <input
                                type="text"
                                id="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="employee_id" className="block text-sm font-medium">Employee ID:</label>
                            <input
                                type="text"
                                id="employee_id"
                                value={formData.employee_id}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date_of_joining" className="block text-sm font-medium">Date of Joining:</label>
                            <input
                                type="date"
                                id="date_of_joining"
                                value={formData.date_of_joining}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="assigned_line" className="block text-sm font-medium">Assigned Line:</label>
                            <input
                                type="number"
                                id="assigned_line"
                                value={formData.assigned_line}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="assigned_block" className="block text-sm font-medium">Assigned Block:</label>
                            <input
                                type="number"
                                id="assigned_block"
                                value={formData.assigned_block}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                            Register
                        </button>
                    </form>
                    {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                    {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
