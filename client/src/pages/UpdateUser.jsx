import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { newRequest } from "../utils/newRequest";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { toastOptions } from "../utils/toastOptions";
import { toast } from "react-toastify";
import { upload } from "../utils/upload";
import UpdatePass from "../components/UpdatePass";

const UpdateUser = () => {
  const { currentUser, loading } = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState(null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    username: currentUser.username,
    email: currentUser.email,
    img: currentUser.img,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    const { username } = user;
    const userRegExp = /^[a-zA-Z0-9]{6,}$/;

    if (!userRegExp.test(username)) {
      dispatch(loginFailure());
      return toast.error(
        "Your username must be at least 6 characters long.",
        toastOptions
      );
    }

    try {
      const url = avatar ? await upload(avatar) : currentUser.img;
      const res = await newRequest.put(`/users/${currentUser._id}`, {
        ...user,
        img: url,
      });
      dispatch(loginSuccess(res.data));
      toast("User has been updated", toastOptions);
    } catch (error) {
      dispatch(loginFailure());
      toast.error(error.response.data, toastOptions);
    }
  };

  return (
    <>
      {open && <UpdatePass setOpen={setOpen} />}
      <div className="h-[calc(100vh-245px)] w-full flex items-center justify-center dark:bg-black/80 dark:text-white">
        <div className="bg-orange-300 rounded-lg p-5 flex flex-col">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <h1 className="text-xl font-semibold text-center mb-5">Update</h1>
            <div className="flex flex-col">
              <label className="text-lg font-medium" htmlFor="username">
                Username
              </label>
              <input
                className="pl-1 py-1 rounded-md text-gray-500"
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
                className="pl-1 py-1 rounded-md text-gray-500"
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-medium" htmlFor="file">
                Profile Pic
                {avatar ? (
                  <img
                    className="h-10 w-10 object-cover rounded-full active:scale-90 duration-100 transition-all cursor-pointer"
                    src={URL.createObjectURL(avatar)}
                    alt=""
                  />
                ) : (
                  <img
                    className="h-10 w-10 object-cover rounded-full active:scale-90 duration-100 transition-all cursor-pointer"
                    src={user.img || "/img/noavatar.jpg"}
                    alt=""
                  />
                )}
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
          <span
            className="mt-5 flex justify-start text-sm cursor-pointer text-red-500"
            onClick={() => setOpen(!open)}
          >
            Change Password
          </span>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
