import React, { useContext } from "react";
import { UserContext } from "../../../context/userProvider";
import DashboardSidebar from "./DashboardSidebar";
import Footer from "../footer/Footer";
import ErrorPage from "../ui/errorPage";
import DashboardLoading from "./dashboardLoading";
import DashboardHeader from "./DashboardHeader";

export default function DashboardWrapper({ children }) {
  const { user, userLoading } = useContext(UserContext);
  return (
    <>
      {user ? (
        <div className="flex flex-col h-screen">
          <div className="md:flex flex-1">
            {/* Make the sidebar fixed */}
            <div className="lg:fixed top-0 left-0 lg:h-full z-10">
              <DashboardSidebar />
            </div>

            {/* Main Content with margin-left to make space for the sidebar */}
            <div className="flex-1 lg:ml-64 min-h-screen bg-white overflow-auto">
              <DashboardHeader />
              <div className="flex-1 p-8 bg-gray-50">{children}</div>
            </div>
          </div>
        </div>
      ) : userLoading ? (
        <DashboardLoading />
      ) : (
        <ErrorPage />
      )}
    </>
  );
}
