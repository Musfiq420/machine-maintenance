import { Settings } from "@mui/icons-material";
import React from "react";

export default function LandingHero() {
  return (
    <>
      <div className="bg-primary-dark relative p-5 mb-[30%] gap-4 text-center flex-col justify-center  flex h-screen ">
        <div className="w-fit mx-auto rounded-full pr-2 bg-[#ffffff20] flex gap-4 text-sm md:text-md items-center ">
          <div className="w-8 flex items-center justify-center bg-primary-light rounded-full h-8 ">
            <Settings className="text-white" />
          </div>
          Tools that Drive changes
        </div>
        <div>
          <p className="gradientText leading-relaxed font-bold text-transparent  bg-clip-text bg-gradientText   md:text-5xl text-lg capitalize ">
            Accelerate Your Garment Production
            <br /> with Fast Tracker
          </p>
        </div>
        <div className="md:text-lg text-sm ">
          Essential tools that drive innovation and empower change- makers to
          <br />
          create lasting impact
        </div>
        <div className="w-2/3 absolute inset-x-0 mx-auto lg:bottom-[-60%] bottom-[-15%]">
          <img className="rounded-md" src="images/heroExample.png" />
        </div>
      </div>
    </>
  );
}
