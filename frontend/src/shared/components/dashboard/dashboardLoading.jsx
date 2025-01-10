import React from "react";
import { ClockLoader } from "react-spinners";

export default function DashboardLoading({ title }) {
  return (
    <div className="flex justify-center sticky inset-y-0 bg-white z-10 h-screen left-64 items-center">
      <ClockLoader className="text-primary-dark text-9xl" />
    </div>
  );
}
