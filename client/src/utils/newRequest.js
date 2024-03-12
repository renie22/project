import axios from "axios";

export const newRequest = axios.create({
  baseURL: "https://mern-server-fyvv.onrender.com/api",
  withCredentials: true,
});
