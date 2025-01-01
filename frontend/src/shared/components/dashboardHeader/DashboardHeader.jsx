import EmployeeName from "../user";

const DashboardHeader = () => {
    return (
        <div>
            <header className="flex justify-between items-center py-4 px-6 bg-white shadow">
                {/* Left Section: Title and LIVE badge */}
                <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold text-gray-900">Machine Monitoring</h1>
                    <span className="px-2 py-1 text-sm font-bold text-white bg-red-500 rounded">
                        LIVE
                    </span>
                </div>

                {/* Right Section: Admin Panel and Profile */}
                <div className="flex items-center space-x-6">
                    <button className="text-gray-600 font-medium">Admin Panel</button>
                    <div className="flex items-center space-x-2">
                        {/* Email Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 8l7.89 5.26c.26.17.57.26.89.26s.63-.09.89-.26L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        {/* Profile Information */}
                        <div className="text-sm">
                            <EmployeeName />                            {/* <p className="font-medium text-gray-800">Md. Musfiqur Rahman</p> */}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default DashboardHeader;