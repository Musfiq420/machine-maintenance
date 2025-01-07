import React, { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { useContext } from "react";
import { UserContext } from "../../../context/userProvider";

export default function LandingNav() {
  const navLinks = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Dashboard",
      link: "/dashboard",
    },
    {
      title: "Contact",
      link: "/contact",
    },
  ];
  const { logout, user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  console.log(user);
  return (
    <>
      <div className="flex absolute z-20 inset-x-0 top-5  w-4/5 mx-auto justify-between items-center">
        <div className="">
          <Link to={"/"}>
            <img src="fast_tracker.png" />
          </Link>
        </div>

        <div className=" hidden  font-semibold bg-white text-black  h-fit p-2 lg:flex gap-5 rounded-full">
          {navLinks.map((link, i) => (
            <Link
              className="px-4 rounded-full py-2 text-black hover:bg-primary-accent transition-colors duration-100"
              to={link.link}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="lg:block hidden">
          {user ? (
            <div>
              <button
                onClick={logout}
                className="px-8 py-3 hover:bg-primary-light transition-colors font-semibold hover:text-black duration-150 rounded-sm bg-transparent text-white border-white border-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to={"/login"}>
              <button className="px-8 py-3 hover:bg-primary-light transition-colors font-semibold hover:text-black duration-150 rounded-sm bg-transparent text-white border-white border-2">
                Login
              </button>
            </Link>
          )}
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="flex lg:hidden z-20 cursor-pointer flex-col gap-2 items-end"
        >
          <motion.hr
            initial={{ rotate: 0 }}
            animate={{
              rotate: open ? 45 : 0,
              backgroundColor: open ? "black" : "white",
            }}
            transition={{
              duration: 0.5,
            }}
            className="h-[3px] border-0 z-20 rotate-45 origin-top-left bg-white w-8"
          />
          <motion.hr
            animate={{ width: open ? 0 : 12 }}
            className="h-[3px] bg-white w-3"
          />
          <motion.hr
            initial={{ rotate: 0 }}
            animate={{
              rotate: open ? -45 : 0,
              backgroundColor: open ? "black" : "white",
            }}
            transition={{
              duration: 0.5,
            }}
            className="h-[3px] border-0 rotate-[-45deg]  origin-top-left bg-white w-8"
          />
        </div>
      </div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: open ? 1 : 0 }}
        className="absolute lg:hidden flex flex-col items-center justify-center gap-4 font-semibold text-lg text-black  z-10 bg-primary-light inset-5 rounded-sm"
      >
        {navLinks.map((link, i) => (
          <Link to={link.link}>{link.title}</Link>
        ))}

        {user ? (
          <div>
            <button
              onClick={logout}
              className="px-8 py-3 rounded-sm bg-transparent mt-5 text-black bg-white border-white border-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="px-8 py-3 rounded-sm bg-transparent mt-5 text-black bg-white border-white border-2">
              Login
            </button>
          </Link>
        )}
      </motion.div>
    </>
  );
}
