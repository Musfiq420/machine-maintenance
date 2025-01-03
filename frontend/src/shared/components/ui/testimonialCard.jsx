import React from "react";
import { FaQuoteRight } from "react-icons/fa";

export default function TestimonialCard({
  testimonial,
  client_name,
  job_position,
  company_name,
}) {
  return (
    <div className="w-[80%]  h-72 justify-center p-5 flex flex-col gap-4 text-black shadow-md bg-white border-4 border-primary-light">
      <div>
        <div>{testimonial}</div>
        <div></div>
      </div>
      <div className="w-fit ml-auto">
        <FaQuoteRight className="text-xl text-primary-light" />
      </div>
      <div className="flex justify-between">
        <div className="font-semibold">
          <div className="">{client_name}</div>
          <div>{job_position}</div>
        </div>
        <div className="font-semibold text-gray-500 text-right">
          {company_name}
        </div>
      </div>
    </div>
  );
}
