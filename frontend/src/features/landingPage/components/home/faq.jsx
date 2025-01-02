import React from "react";
import { motion } from "motion/react";
import FaqComp from "../../../../shared/components/ui/faqComp";

export default function Faq() {
  const faqs = [
    {
      ques: "Is your software suitable for small and medium-sized garment manufacturers?",
      ans: "Yes, our software is designed to cater to businesses of all sizes, offering scalable solutions to meet the unique needs of small, medium, and large garment manufacturers.",
    },
    {
      ques: "Does the software offer real-time production tracking?",
      ans: "Yes, it provides real-time production tracking, enabling you to monitor progress, identify bottlenecks, and make data-driven decisions.",
    },
    {
      ques: "Is there training available for using the software?",
      ans: "We provide comprehensive training and user guides to help your team quickly adapt to the software.",
    },
    {
      ques: "How secure is your software?",
      ans: "We prioritize data security by implementing advanced encryption, regular updates, and compliance with industry standards to protect your information.",
    },
    {
      ques: "What is the cost of your software?",
      ans: "The cost depends on the features, number of users, and deployment type. Contact our sales team for a detailed quote tailored to your needs.",
    },
  ];

  return (
    <div className="lg:flex items-center justify-between px-[10%] ">
      <div className="mb-10">
        <div className="md:text-6xl text-lg leading-normal mb-10 font-semibold text-black">
          Frequently Asked Question
        </div>
        <div className="text-black md:text-lg font-semibold">
          Answers to Most Asked Garments Manufacturing Questions!{" "}
        </div>
      </div>
      <div className="flex lg:w-1/2 flex-col gap-4">
        {faqs.map((item, index) => (
          <FaqComp ans={item.ans} key={index} ques={item.ques} />
        ))}
      </div>
    </div>
  );
}
