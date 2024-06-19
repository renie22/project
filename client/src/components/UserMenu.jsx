import React, { useState } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { newRequest } from "../utils/newRequest";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";

const UserMenu = () => {
  const [open, setOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <>
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
              <h3 className="text-center">please login or register first!</h3>
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
    </>
  );
};

export default UserMenu;
