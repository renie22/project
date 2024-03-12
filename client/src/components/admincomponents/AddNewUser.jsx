import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newRequest } from "../../utils/newRequest";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import CircularProgress from "@mui/material/CircularProgress";
import { upload } from "../../utils/upload";

const AddNewUser = ({ setOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    img: null,
    isAdmin: false,
  });

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleAdmin = (e) => {
    setUser((prev) => {
      return { ...prev, isAdmin: e.target.checked };
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
      return newRequest.post(`/users`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { username, password, confirmPassword } = user;
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    const userRegExp = /^[a-zA-Z0-9]{6,}$/;

    if (!userRegExp.test(username)) {
      setLoading(false);
      return toast.error(
        "Your username must be at least 6 characters long.",
        toastOptions
      );
    }

    if (!regExp.test(password)) {
      setLoading(false);
      return toast.error(
        "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number.",
        toastOptions
      );
    }

    if (password !== confirmPassword) {
      setLoading(false);
      return toast.error(
        "Password and confirm password do not match",
        toastOptions
      );
    }

    try {
      const url = await upload(avatar);
      const res = await mutation.mutateAsync({
        ...user,
        img: url,
      });
      e.target.reset();
      setUser({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        img: null,
        isAdmin: false,
      });
      setOpen(false);
      setLoading(false);
      toast(res.data, toastOptions);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data, toastOptions);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-black/70 flex justify-center items-center">
      <div className="flex flex-col gap-5 bg-orange-300 rounded-lg p-5 fixed mb-[50px]">
        <span
          className="absolute right-0 top-0 px-2 text-xl cursor-pointer"
          onClick={() => setOpen(false)}
        >
          X
        </span>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <h1 className="text-xl font-semibold text-center mb-5">
            Create User
          </h1>
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
                className="cursor-pointer text-black"
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
                className="cursor-pointer text-black"
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
              {avatar ? (
                <img
                  className="h-10 w-10 object-cover rounded-full active:scale-90 duration-100 transition-all cursor-pointer"
                  src={URL.createObjectURL(avatar)}
                  alt=""
                />
              ) : (
                <img
                  className="h-10 w-10 object-cover rounded-full active:scale-90 duration-100 transition-all cursor-pointer"
                  src="/img/login-animation.gif"
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
                name="isAdmin"
                onChange={handleAdmin}
              />
              <span className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer bg-[#ccc] rounded-3xl slider"></span>
            </label>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-lg font-medium text-white rounded-md p-1 active:scale-90 duration-100 transition-all flex items-center justify-center"
            type="submit"
          >
            {loading ? (
              <CircularProgress color="inherit" size="28px" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewUser;
