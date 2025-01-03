import { VerifiedOutlined } from "@mui/icons-material";
import React from "react";

export default function LandingFeatures() {
  const features = [
    {
      feature_name: "Inventory Management",
      feature_image: "./images/feature-1.png",
      feature_description:
        "Track and manage raw materials, in-progress, and finished goods inventory.",
      feature_functions: [
        "Real-time inventory tracking",
        "Automatic restocking alerts",
        "Inventory cost analysis",
      ],
      feature_result: [
        {
          title: "Inventory Accuracy",
          value: "98%",
        },
        {
          title: "Reduced Stockouts",
          value: "50%",
        },
      ],
    },
    {
      feature_name: "Production Scheduling",
      feature_description:
        "Optimize production timelines to meet delivery deadlines efficiently.",
      feature_functions: [
        "Automated production planning",
        "Resource allocation",
        "Timeline visualization",
      ],
      feature_image: "./images/feature-2.png",
      feature_result: [
        {
          title: "Improvement in Production Efficiency",
          value: "30%",
        },
        {
          title: "On-Time Delivery",
          value: "95%",
        },
      ],
    },
    {
      feature_name: "Quality Control",
      feature_image: "./images/feature-3.png",
      feature_description:
        "Ensure high-quality standards are met at every production stage.",
      feature_functions: [
        "Automated defect detection",
        "Quality compliance tracking",
        "Inspection reporting",
      ],
      feature_result: [
        {
          title: "Defect Reduction",
          value: "40%",
        },
        {
          title: "Customer Satisfaction",
          value: "90%",
        },
      ],
    },
    {
      feature_name: "Order Management",
      feature_image: "./images/feature-1.png",
      feature_description:
        "Manage customer orders from placement to fulfillment.",
      feature_functions: [
        "Order tracking",
        "Automated invoicing",
        "Customer communication",
      ],
      feature_result: [
        {
          title: "Faster Order Fulfillment Time",
          value: "20%",
        },
        {
          title: "Revenue Growth",
          value: "15%",
        },
      ],
    },
    {
      feature_name: "Reporting and Analytics",
      feature_image: "./images/feature-1.png",
      feature_description:
        "Gain insights into business operations with detailed analytics.",
      feature_functions: [
        "Customizable dashboards",
        "Performance metrics tracking",
        "Forecasting",
      ],
      feature_result: [
        {
          title: "Data-Driven Decisions",
          value: "85%",
        },
        {
          title: "Operational Transparency",
          value: "100%",
        },
      ],
    },
  ];

  return (
    <div className="w-4/5 mx-auto my-42">
      <h1 className="lg:text-6xl  font-semibold text-center text-black">
        Included Powerful Features
      </h1>
      {features.map((fea, index) => (
        <div
          className={`lg:flex my-20 ${
            (index + 1) % 2 ? "flex-row-reverse" : ""
          } items-center justify-between text-black`}
        >
          <div className="w-2/5 p-5 flex-col flex gap-8">
            <div>
              <div className="font-semibold my-4 text-2xl">
                {fea.feature_name}
              </div>
              <div className="text-lg">{fea.feature_description}</div>
            </div>
            <div>
              {fea.feature_functions.map((f) => (
                <div className="flex my-4 gap-2 items-center" key={f}>
                  <VerifiedOutlined className="text-primary text-2xl" /> {f}
                </div>
              ))}
            </div>
            <div className="flex gap-8">
              {fea.feature_result.map((result) => (
                <div className="bg-white text-sm h-36 border-primary-light text-center justify-center flex flex-col gap-2 border-2 shadow-md w-48 p-5">
                  <div className="font-semibold text-lg ">{result.value}</div>
                  {result.title}
                </div>
              ))}
            </div>
          </div>
          <div className="w-2/5 p-5">
            <img
              src={fea.feature_image}
              className="object-cover w-full h-[325px] "
            />
          </div>
        </div>
      ))}
    </div>
  );
}
