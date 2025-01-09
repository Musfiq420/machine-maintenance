import React from "react";

export default function DashboardError({ title }) {
  return (
    <div className="text-center text-red-500">
      <p>No {title} Found. </p>
    </div>
  );
}
