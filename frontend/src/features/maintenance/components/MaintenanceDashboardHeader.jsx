import { MailRounded } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../../../context/userProvider";

const MaintenanceDashboardHeader = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <header className="flex justify-between items-center py-4 px-6 bg-white shadow">
        {/* Left Section: Title and LIVE badge */}
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-gray-900">
            Machine Monitoring
          </h1>
          <span className="px-2 py-1 text-sm font-bold text-white bg-red-500 rounded">
            LIVE
          </span>
        </div>

        {/* Right Section: Admin Panel and Profile */}
        <div className="flex items-center space-x-6">
          <button className="text-gray-600 font-medium">Admin Panel</button>
          <div className="flex items-center space-x-2">
            {/* Email Icon */}
            <MailRounded className="text-primary-dark text-lg" />
            {/* Profile Information */}
            <div className="flex text-xs text-black flex-col gap-1">
              <div className="font-bold">{user.name}</div>
              <div className="">
                {user.designation} | {user.department}
              </div>
              <div className="">{user.company}</div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MaintenanceDashboardHeader;
