import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/toastOptions";
import { newRequest } from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AdminUpdatePass = ({ userId }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPass((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
      return newRequest.put(`/users/password/${userId}`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { password, confirmPassword } = pass;
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

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
      await mutation.mutateAsync({ password: pass.password });
      navigate("/admin/users");
      setLoading(false);
      toast("Password updated successfully", toastOptions);
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-500 rounded-lg p-5 flex flex-col">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <h1 className="text-xl font-semibold mb-2 text-center">
          Update Password
        </h1>
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
              {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-lg font-medium text-white rounded-md p-1 active:scale-90 duration-100 transition-all flex items-center justify-center w-full"
          type="submit"
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? (
            <CircularProgress color="inherit" size="28px" />
          ) : (
            "Change Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminUpdatePass;
