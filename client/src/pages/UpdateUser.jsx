import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { newRequest } from "../utils/newRequest";
import { toastOptions } from "../utils/toastOptions";
import { toast } from "react-toastify";
import { upload } from "../utils/upload";
import { updateStart, updateSuccess, updateFailure } from "../redux/userSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { motion } from "framer-motion";

const UpdateUser = () => {
  const { currentUser, loading } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    img: currentUser?.img || "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());

    const { username, password } = user;
    const userRegExp = /^[a-zA-Z0-9]{6,}$/;
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (!userRegExp.test(username)) {
      dispatch(updateFailure());
      return toast.error(
        "Your username must be at least 6 characters long.",
        toastOptions
      );
    }

    if (password && !regExp.test(password)) {
      dispatch(updateFailure());
      return toast.error(
        "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number.",
        toastOptions
      );
    }

    try {
      const url = avatar ? await upload(avatar) : user.img;
      const requestBody = {
        username: user.username,
        email: user.email,
        img: url,
      };

      if (user.password !== "") {
        requestBody.password = user.password;
      }

      const res = await newRequest.put(
        `/users/${currentUser._id}`,
        requestBody
      );
      dispatch(updateSuccess(res.data));
      toast("User has been updated", toastOptions);

      setUser((prevUser) => ({
        ...prevUser,
        password: "",
      }));
    } catch (error) {
      dispatch(updateFailure());
      toast.error(error.response.data, toastOptions);
    }
  };

  return (
    <>
      <div className="h-[calc(100vh-245px)] w-full flex items-center justify-center dark:bg-black/80 dark:text-white">
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
          className="bg-orange-300 rounded-lg p-5 flex flex-col"
        >
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <h1 className="text-xl font-semibold text-center mb-5">Update</h1>
            <div className="flex flex-col">
              <label className="text-lg font-medium" htmlFor="username">
                Username
              </label>
              <input
                className="pl-1 py-1 rounded-md dark:text-black"
                type="text"
                name="username"
                id="username"
                value={user.username}
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
                value={user.email}
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
                  value={user.password}
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
              <label className="text-lg font-medium" htmlFor="file">
                Profile Pic
                <img
                  className="h-10 w-10 object-cover rounded-full active:scale-90 duration-100 transition-all cursor-pointer"
                  src={
                    avatar
                      ? URL.createObjectURL(avatar)
                      : currentUser.img || "/img/noavatar.jpg"
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
        </motion.div>
      </div>
    </>
  );
};

export default UpdateUser;
