import axios from "axios";

export const newRequest = axios.create({
  baseURL: "http://localhost:4600/api",
  withCredentials: true,
});
