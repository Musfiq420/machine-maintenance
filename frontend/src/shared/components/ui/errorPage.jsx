import React from "react";

export default function ErrorPage() {
  return (
    <div className="bg-primary-dark text-white flex px-[10%] gap-52 justify-center  h-screen w-screen ">
      <div className="h-fit my-auto">
        <img
          className="h-72 w-auto object-contain"
          src="/images/404-gear.png"
          alt=""
        />
      </div>
      <div className="w-1/2 h-fit my-auto flex-col flex gap-8">
        <div className="font-bold text-xl">404</div>
        <div className="font-semibold text-4xl">You're lost.</div>
        <div>The page you are looking for does not exist</div>
        <div></div>
      </div>
    </div>
  );
}
