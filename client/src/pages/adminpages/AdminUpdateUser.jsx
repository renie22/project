import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admincomponents/Sidebar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import { CircularProgress } from "@mui/material";
import { upload } from "../../utils/upload";
import AdminUpdatePass from "../../components/admincomponents/AdminUpdatePass";

const AdminUpdateUser = () => {
  const location = useLocation();
  //   const data = location.state.data;
  const { data } = location.state;

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: data.username,
    email: data.email,
    img: data.img,
    isAdmin: data.isAdmin,
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdmin = (e) => {
    setUser((prev) => {
      return { ...prev, isAdmin: e.target.checked };
    });
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
      return newRequest.put(`/users/${data._id}`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { username } = user;
    const userRegExp = /^[a-zA-Z0-9]{6,}$/;

    if (!userRegExp.test(username)) {
      setLoading(false);
      return toast.error(
        "Your username must be at least 6 characters long.",
        toastOptions
      );
    }

    try {
      const url = avatar ? await upload(avatar) : data.img;
      await mutation.mutateAsync({
        ...user,
        img: url,
      });
      navigate("/admin/users");
      setLoading(false);
      toast("User has been updated", toastOptions);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data, toastOptions);
    }
  };

  return (
    <div className="flex dark:bg-black/90 dark:text-white py-5">
      <Sidebar />
      <div className="m-auto flex items-center lg:flex-row flex-col xl:gap-[200px] lg:gap-[100px] gap-10">
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
            <div className="flex items-center toggle">
              <label className="text-lg font-medium" htmlFor="isAdmin">
                Admin
              </label>
              <label className="text-gray-400 text-lg relative inline-block w-[50px] h-6 switch">
                <input
                  className="opacity-0 w-0 h-0"
                  type="checkbox"
                  id="isAdmin"
                  checked={user.isAdmin}
                  onChange={handleAdmin}
                />
                <span className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer bg-[#ccc] rounded-3xl slider"></span>
              </label>
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
        </div>
        <AdminUpdatePass userId={data._id} />
      </div>
    </div>
  );
};

export default AdminUpdateUser;
