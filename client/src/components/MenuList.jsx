import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const MenuList = ({ pathname }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const topVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: 45,
    },
  };

  const centerVariants = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };

  const bottomVariants = {
    closed: {
      rotate: 0,
    },
    opened: {
      rotate: -45,
    },
  };
  return (
    <>
      <button
        className="w-7 h-6 flex flex-col justify-between z-50 relative"
        onClick={() => setOpenMenu((prev) => !prev)}
      >
        <motion.div
          variants={topVariants}
          animate={openMenu ? "opened" : "closed"}
          className="w-7 h-1 bg-black rounded origin-left"
        ></motion.div>
        <motion.div
          variants={centerVariants}
          animate={openMenu ? "opened" : "closed"}
          className="w-7 h-1 bg-black rounded"
        ></motion.div>
        <motion.div
          variants={bottomVariants}
          animate={openMenu ? "opened" : "closed"}
          className="w-7 h-1 bg-black rounded origin-left"
        ></motion.div>
      </button>
      {openMenu && (
        <motion.div
          className="md:hidden absolute right-0 top-[70px] h-screen w-1/2 bg-black/70 z-40 flex justify-end p-2"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <ul className="text-white w-full text-center text-2xl font-semibold flex flex-col gap-5 py-5">
            {currentUser?.isAdmin && (
              <Link to="/admin">
                <li className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 hover:text-black">
                  Dashboard
                </li>
              </Link>
            )}
            {pathname !== "/" ? (
              <Link to="/">
                <li className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 hover:text-black">
                  Home
                </li>
              </Link>
            ) : (
              <li className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 hover:text-black">
                <a href="#" className="w-full">
                  Home
                </a>
              </li>
            )}
            {pathname !== "/" ? (
              <Link to="/">
                <li className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 hover:text-black">
                  About
                </li>
              </Link>
            ) : (
              <li className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 hover:text-black">
                <a href="#about" className="w-full">
                  About
                </a>
              </li>
            )}
            {pathname !== "/" ? (
              <Link to="/">
                <li className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 hover:text-black">
                  Menu
                </li>
              </Link>
            ) : (
              <li className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 hover:text-black">
                <a href="#menu" className="w-full">
                  Menu
                </a>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </>
  );
};

export default MenuList;
