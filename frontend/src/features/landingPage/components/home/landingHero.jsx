import { Settings } from "@mui/icons-material";
import React from "react";

export default function LandingHero() {
  return (
    <>
      <div className="bg-primary-dark relative p-5 mb-[40%] gap-4 text-center flex-col justify-center  flex h-screen ">
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
        <div className="md:text-lg text-sm ">
          <a
            href="https://github.com/AhsanulAlamNaiem/ppcMaintanance/raw/refs/heads/master/apk/app-release.apk"
            download="Panamach.apk"
            class="relative my-4 text-md inline-flex items-center px-12 py-3 overflow-hidden  font-medium text-white border-2 border-white rounded-md hover:text-white group hover:bg-primary"
          >
            <span class="absolute left-0 block w-full h-0 transition-all bg-primary opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span class="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span class="relative">Download APK</span>
          </a>
        </div>
        <div className="w-2/3 absolute inset-x-0 mx-auto lg:bottom-[-60%] bottom-[-15%]">
          <img className="rounded-md" src="images/heroExample.png" />
        </div>
      </div>
    </>
  );
}
