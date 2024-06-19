import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { newRequest } from "../utils/newRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";
import CircularProgress from "@mui/material/CircularProgress";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await newRequest.post("/auth/login", { username, password });
      dispatch(loginSuccess(res.data));
      if (res.data?.isAdmin) {
        navigate("/admin");
        toast(`Welcome Admin ${res.data.username}!`, toastOptions);
      } else {
        navigate("/");
        toast(`Welcome ${res.data.username}!`, toastOptions);
      }
    } catch (error) {
      dispatch(loginFailure());
      toast.error(error.response.data, toastOptions);
    }
  };

  const signinWithGoogle = () => {
    dispatch(loginStart());
    setGoogleLoading(true);
    signInWithPopup(auth, provider).then(async (result) => {
      await newRequest
        .post("/auth/google", {
          username: result.user.displayName,
          email: result.user.email,
          img: result.user.photoURL,
        })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          setGoogleLoading(false);
          toast(`Welcome ${res.data.username}!`, toastOptions);
          navigate("/");
        })
        .catch((error) => {
          dispatch(loginFailure());
          setGoogleLoading(false);
          toast.error(error.response.data, toastOptions);
        });
    });
  };

  return (
    <div className="h-[calc(100vh-245px)] w-full flex items-center justify-center dark:bg-black/80 dark:text-white">
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
        className="bg-orange-300 rounded-lg p-5 flex flex-col"
      >
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <h1 className="text-xl font-semibold text-center mb-5">Login</h1>
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
              onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="cursor-pointer dark:text-black"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>
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
        <h1 className="text-xl font-semibold text-center my-1">Or</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-lg font-medium text-white rounded-md p-1 active:scale-90 duration-100 transition-all flex items-center justify-center"
          onClick={signinWithGoogle}
          style={{ cursor: googleLoading ? "not-allowed" : "pointer" }}
        >
          {googleLoading ? (
            <CircularProgress color="inherit" size="28px" />
          ) : (
            "Signin With Google"
          )}
        </button>
        <Link to="/register" className="text-sm text-red-500 underline mt-2">
          Go to Register
        </Link>
      </motion.div>
    </div>
  );
};

export default Login;
