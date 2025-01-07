import React from "react";
import { ClockLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="sticky inset-0 w-screen flex justify-center items-center  h-screen z-50 bg-white">
      <ClockLoader className="text-5xl text-primary-dark" />
    </div>
  );
}
