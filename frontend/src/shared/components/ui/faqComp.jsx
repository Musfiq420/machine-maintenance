import React, { useState } from "react";
import { motion } from "motion/react";

export default function FaqComp({ ques, ans }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      animate={{
        backgroundColor: !open ? "#dff6ff" : "#fff",
        height: open ? 190 : 100,
        borderWidth: open ? 2 : 0,
      }}
      onClick={() => setOpen(!open)}
      className="px-5 flex flex-col justify-center  rounded-md border-primary-light cursor-pointer text-black bg-primary-accent "
    >
      <motion.div className="md:text-lg text-sm mb-2 font-semibold  flex items-center justify-between ">
        {ques}
        <div className="text-3xl">{open ? "-" : "+"}</div>
      </motion.div>
      <motion.div
        animate={{
          scaleY: open ? 1 : 0,
          display: open ? "block" : "none",
          transition: {},
        }}
        className="md:text-md text-sm"
      >
        {ans}
      </motion.div>
    </motion.div>
  );
}
