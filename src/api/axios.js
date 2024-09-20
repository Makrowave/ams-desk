import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7077/api"
})

export const axiosPrivate = axios.create({
  baseURL: "https://localhost:7077/api"
})