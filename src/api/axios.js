import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosAdmin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
