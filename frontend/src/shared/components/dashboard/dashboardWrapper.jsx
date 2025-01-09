import React, { useContext } from "react";
import { UserContext } from "../../../context/userProvider";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import Footer from "../footer/Footer";
import ErrorPage from "../ui/errorPage";

export default function DashboardWrapper({ children }) {
  const { user } = useContext(UserContext);
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
            <div className="flex-1 lg:ml-64 overflow-auto">
              <div className="flex-1 p-8 bg-gray-50">
                <DashboardHeader />
                {children}
              </div>
            </div>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}
