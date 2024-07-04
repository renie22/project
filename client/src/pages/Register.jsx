import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { newRequest } from "../utils/newRequest";
import { upload } from "../utils/upload";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";
import { motion } from "framer-motion";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    img: null,
  });

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    const { username, password, confirmPassword } = user;
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const userRegExp = /^[a-zA-Z0-9]{6,}$/;

    if (!userRegExp.test(username)) {
      dispatch(loginFailure());
      return toast.error(
        "Your username must be at least 6 characters long.",
        toastOptions
      );
    }

    if (!regExp.test(password)) {
      dispatch(loginFailure());
      return toast.error(
        "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number.",
        toastOptions
      );
    }

    if (password !== confirmPassword) {
      dispatch(loginFailure());
      return toast.error(
        "Password and confirm password do not match",
        toastOptions
      );
    }

    try {
      const url = avatar ? await upload(avatar) : null;
      const res = await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      dispatch(loginSuccess(res.data));
      toast(`Welcome ${res.data.username}!`, toastOptions);
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
      toast.error(error.response.data, toastOptions);
    }
  };

  return (
    <div className="h-[calc(100vh-245px)] flex items-center justify-center dark:bg-black/80 dark:text-white">
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
        className="bg-orange-300 rounded-lg p-5 flex flex-col"
      >
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <h1 className="text-xl font-semibold text-center mb-5">Register</h1>
          <div className="flex flex-col">
            <label className="text-lg font-medium" htmlFor="username">
              Username
            </label>
            <input
              className="pl-1 py-1 rounded-md dark:text-black"
              type="text"
              name="username"
              id="username"
              placeholder="username"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="pl-1 py-1 rounded-md dark:text-black"
              type="email"
              name="email"
              id="email"
              placeholder="email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium" htmlFor="password">
              Password
            </label>
            <div className="bg-white rounded-md pr-1 flex items-center justify-between">
              <input
                className="pl-1 py-1 rounded-md dark:text-black"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="********"
                required
                onChange={handleChange}
              />
              <span
                className="cursor-pointer dark:text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="bg-white rounded-md pr-1 flex items-center justify-between">
              <input
                className="pl-1 py-1 rounded-md dark:text-black"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="********"
                required
                onChange={handleChange}
              />
              <span
                className="cursor-pointer dark:text-black"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium" htmlFor="file">
              Profile Pic
              <img
                className="h-10 w-10 object-cover rounded-full active:scale-90 duration-100 transition-all cursor-pointer"
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : "/img/login-animation.gif"
                }
                alt=""
              />
            </label>
            <input
              className="hidden"
              type="file"
              id="file"
              accept="images/*"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-lg font-medium text-white rounded-md p-1 active:scale-90 duration-100 transition-all flex items-center justify-center"
            type="submit"
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? (
              <CircularProgress color="inherit" size="28px" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <Link to="/login" className="text-sm text-red-500 underline mt-2">
          Go to Login
        </Link>
      </motion.div>
    </div>
  );
};

export default Register;
