import React from "react";

export function LandingButton({ text }) {
  return (
    <a class="rounded-sm px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-primary-light  text-white">
      <span class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-primary-light top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
      <span class="relative text-primary-light transition duration-300 group-hover:text-white ease">
        {text}
      </span>
    </a>
  );
}
