import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/themeSlice";
import { newRequest } from "../utils/newRequest";
import { logout } from "../redux/userSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { setOpenCart } from "../redux/cartSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
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

  const handleLogout = async () => {
    try {
      const res = await newRequest.post("/auth/logout");
      dispatch(logout());
      navigate("/");
      toast(res.data, toastOptions);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div
      className={
        active || pathname !== "/"
          ? "h-[70px] text-white flex justify-center sticky top-0 z-30 duration-1000 opacity-100 bg-green-600 dark:bg-black/90"
          : "h-[70px] flex justify-center sticky top-0 z-30 duration-1000 opacity-100 bg-white/50 dark:bg-black/80 dark:text-white"
      }
    >
      <Cart />
      <div className="w-[1400px] flex justify-between items-center md:p-5 p-2 relative">
        <h1 className="hidden lg:flex text-lg font-semibold dark:text-white">
          Bubble Tea
        </h1>
        <form
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
        </form>
        <div className="flex items-center gap-8">
          <button className="z-[60]" onClick={toggleTheme}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
          <ul className="hidden md:flex items-center gap-3 text-lg font-medium">
            {currentUser?.isAdmin && (
              <Link to="/admin">
                <li>Dashboard</li>
              </Link>
            )}
            {pathname !== "/" ? (
              <Link to="/">
                <li>Home</li>
              </Link>
            ) : (
              <li>
                <a
                  className="cursor-pointer hover:text-blue-700 hover:pb-1 hover:border-b-2 hover:border-blue-700 dark:hover:text-green-700 dark:hover:border-green-700"
                  href="#"
                >
                  Home
                </a>
              </li>
            )}
            {pathname !== "/" ? (
              <Link to="/">
                <li>About</li>
              </Link>
            ) : (
              <li>
                <a
                  className="cursor-pointer hover:text-blue-700 hover:pb-1 hover:border-b-2 hover:border-blue-700 dark:hover:text-green-700 dark:hover:border-green-700"
                  href="#about"
                >
                  About
                </a>
              </li>
            )}
            {pathname !== "/" ? (
              <Link to="/">
                <li>Menu</li>
              </Link>
            ) : (
              <li>
                <a
                  className="cursor-pointer hover:text-blue-700 hover:pb-1 hover:border-b-2 hover:border-blue-700 dark:hover:text-green-700 dark:hover:border-green-700"
                  href="#menu"
                >
                  Menu
                </a>
              </li>
            )}
            {currentUser && (
              <Link to="/order">
                <li>Order</li>
              </Link>
            )}
          </ul>
          {/* Hamburger Icon */}
          <div
            className="md:hidden cursor-pointer z-50"
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? <CloseIcon /> : <MenuIcon />}
          </div>
          {openMenu && (
            <div
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
            </div>
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
            <div
              className="cursor-pointer active:scale-90 duration-100 transition-all"
              onClick={() => setOpen(!open)}
            >
              {currentUser ? (
                <img
                  className="h-7 w-7 rounded-full object-cover"
                  src={currentUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
              ) : (
                <AccountCircleRoundedIcon />
              )}
            </div>
            {open && (
              <>
                {currentUser ? (
                  <div className="absolute border bg-slate-100 shadow-lg text-black rounded-md right-6 top-20 w-[250px]  p-2">
                    <h3 className="text-center">{currentUser.username}</h3>
                    <div className="flex justify-between gap-4 my-2">
                      <Link
                        to="/updateUser"
                        className="bg-green-600 text-white w-1/2 rounded-md text-center text-lg font-light active:scale-90 duration-100 transition-all"
                        onClick={() => setOpen(!open)}
                      >
                        Update
                      </Link>
                      <button
                        className="bg-green-600 text-white w-1/2 rounded-md text-center text-lg font-light active:scale-90 duration-100 transition-all"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute border bg-slate-100 shadow-lg text-black rounded-md right-6 top-20 w-[250px]  p-2">
                    <h3 className="text-center">
                      please login or register first!
                    </h3>
                    <div className="flex justify-between gap-4 my-2">
                      <Link
                        to="/register"
                        className="bg-green-600 text-white w-1/2 rounded-md text-center text-lg font-light active:scale-90 duration-100 transition-all"
                        onClick={() => setOpen(!open)}
                      >
                        Register
                      </Link>
                      <Link
                        to="/login"
                        className="bg-green-600 text-white w-1/2 rounded-md text-center text-lg font-light active:scale-90 duration-100 transition-all"
                        onClick={() => setOpen(!open)}
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
