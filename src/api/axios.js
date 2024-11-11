import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const axiosAdmin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
