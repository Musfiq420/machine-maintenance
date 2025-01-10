import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
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
        <div className=" flex flex-wrap gap-4">
          <Link
            to={"/"}
            className="p-4 text-black rounded-md font-semibold bg-white px-8"
          >
            Back To Home Page
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="p-4 text-black rounded-md font-semibold bg-white px-8"
          >
            Back To Prev Page /
          </button>
        </div>
      </div>
    </div>
  );
}
