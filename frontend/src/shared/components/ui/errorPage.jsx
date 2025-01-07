import React from "react";

export default function ErrorPage() {
  return (
    <div className="bg-primary-dark text-white flex justify-between h-screen w-screen ">
      <div>
        <img src="/images/404-gear.png" alt="" />
      </div>
      <div className="w-1/2 flex-col flex gap-8">
        <div className="font-bold text-xl">404</div>
        <div className="font-semibold text-4xl">You're lost.</div>
        <div>The page you are looking for does not exist</div>
        <div></div>
      </div>
    </div>
  );
}
