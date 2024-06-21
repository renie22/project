import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/themeSlice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { setOpenCart } from "../redux/cartSlice";
import { motion } from "framer-motion";
import UserMenu from "./UserMenu";
import Links from "./Links";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { darkMode } = useSelector((state) => state.theme);
  const { totalQuantity } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const toggleTheme = () => {
    dispatch(setTheme());
  };

  const onCartToggle = () => {
    dispatch(setOpenCart({ cartState: true }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/results?search=${q}`);
  };

  const textVariants = {
    initial: {
      x: -100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

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

  const listVariants = {
    closed: { x: "50vw" },
    opened: {
      x: "0",
      transition: { when: "beforeChildren", staggerChildren: 0.2 },
    },
  };

  const listItemVariants = {
    closed: { x: -10, opacity: 0 },
    opened: { x: 0, opacity: 1 },
  };

  return (
    <div
      className={
        active || pathname !== "/"
          ? "h-[70px] text-white sticky top-0 z-30 opacity-100 bg-green-600 dark:bg-black/90"
          : "h-[70px] sticky top-0 z-30 opacity-100 bg-white/50 dark:bg-black/80 dark:text-white"
      }
    >
      <Cart />
      <div className="layout h-full flex justify-between items-center relative">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hidden lg:flex text-lg font-semibold dark:text-white"
        >
          Bubble Tea
        </motion.h1>
        <motion.form
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.1 } }}
          className="border dark:border-gray-600 xl:w-[500px] lg:w-[350px] md:w-[250px] p-1 flex items-center justify-between rounded-2xl"
          onSubmit={handleSearch}
        >
          <input
            className={
              active
                ? "w-full bg-transparent outline-none placeholder:text-gray-300 dark:text-white pl-2"
                : "w-full bg-transparent outline-none placeholder:text-gray-300 dark:text-white pl-2"
            }
            type="text"
            placeholder="Search"
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit">
            <SearchOutlinedIcon />
          </button>
        </motion.form>
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="flex items-center gap-8"
        >
          <button className="z-[60]" onClick={toggleTheme}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
          {/* LINKS */}
          <Links pathname={pathname} />
          {/* Hamburger Icon */}
          <button
            className="md:hidden w-7 h-6 flex flex-col justify-between z-50 relative"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            <motion.div
              variants={topVariants}
              animate={openMenu ? "opened" : "closed"}
              className={
                active || pathname !== "/"
                  ? "w-7 h-1 bg-white dark:bg-white rounded origin-left"
                  : "w-7 h-1 bg-black dark:bg-white rounded origin-left"
              }
            ></motion.div>
            <motion.div
              variants={centerVariants}
              animate={openMenu ? "opened" : "closed"}
              className={
                active || pathname !== "/"
                  ? "w-7 h-1 bg-white dark:bg-white rounded origin-left"
                  : "w-7 h-1 bg-black dark:bg-white rounded origin-left"
              }
            ></motion.div>
            <motion.div
              variants={bottomVariants}
              animate={openMenu ? "opened" : "closed"}
              className={
                active || pathname !== "/"
                  ? "w-7 h-1 bg-white dark:bg-white rounded origin-left"
                  : "w-7 h-1 bg-black dark:bg-white rounded origin-left"
              }
            ></motion.div>
          </button>
          {openMenu && (
            <motion.div
              variants={listVariants}
              initial="closed"
              animate="opened"
              className="md:hidden fixed right-0 top-[70px] h-screen w-1/2 bg-black/70 z-40 flex justify-end p-2"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <ul className="text-white w-full text-center text-2xl font-semibold flex flex-col gap-5 py-5">
                {currentUser?.isAdmin && (
                  <Link to="/admin">
                    <motion.li
                      variants={listItemVariants}
                      className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 dark:hover:bg-blue-300 hover:text-black"
                    >
                      Dashboard
                    </motion.li>
                  </Link>
                )}
                {pathname !== "/" ? (
                  <Link to="/">
                    <motion.li
                      variants={listItemVariants}
                      className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 dark:hover:bg-blue-300 hover:text-black"
                    >
                      Home
                    </motion.li>
                  </Link>
                ) : (
                  <motion.li
                    variants={listItemVariants}
                    className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 dark:hover:bg-blue-300 hover:text-black"
                  >
                    <a href="#" className="w-full">
                      Home
                    </a>
                  </motion.li>
                )}
                {pathname !== "/" ? (
                  <Link to="/">
                    <motion.li
                      variants={listItemVariants}
                      className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 dark:hover:bg-blue-300 hover:text-black"
                    >
                      About
                    </motion.li>
                  </Link>
                ) : (
                  <motion.li
                    variants={listItemVariants}
                    className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 dark:hover:bg-blue-300 hover:text-black"
                  >
                    <a href="#about" className="w-full">
                      About
                    </a>
                  </motion.li>
                )}
                {pathname !== "/" ? (
                  <Link to="/">
                    <motion.li
                      variants={listItemVariants}
                      className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 dark:hover:bg-blue-300 hover:text-black"
                    >
                      Menu
                    </motion.li>
                  </Link>
                ) : (
                  <motion.li
                    variants={listItemVariants}
                    className="border w-full h-14 flex justify-center items-center rounded-md hover:bg-green-300 dark:hover:bg-blue-300 hover:text-black"
                  >
                    <a href="#menu" className="w-full">
                      Menu
                    </a>
                  </motion.li>
                )}
              </ul>
            </motion.div>
          )}
          <div className="flex items-center gap-2">
            <div
              className=" relative text-lg active:scale-90 duration-100 transition-all cursor-pointer"
              onClick={onCartToggle}
            >
              <ShoppingCartIcon />
              <span
                className={
                  active || pathname !== "/"
                    ? "absolute -top-1 -right-1 text-white  bg-blue-500 h-4 w-4 rounded-full text-sm flex items-center justify-center"
                    : "absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full text-sm flex items-center justify-center"
                }
              >
                {totalQuantity}
              </span>
            </div>
            {/* USER MENU */}
            <UserMenu />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
