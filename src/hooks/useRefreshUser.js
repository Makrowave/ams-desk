import axios from "@/api/axios";
import useAuth from "./useAuth";
import { decodeToken } from "react-jwt";
export default function useRefreshUser() {
  const { setUser } = useAuth();
  const _refreshUrl = "/Auth/Refresh";
  async function refreshUser() {
    try {
      const response = await axios.get(_refreshUrl, {
        withCredentials: true,
      });
      setUser({ username: decodeToken(response.data).name, token: response.data });
      return response.data;
    } catch (error) {
      if (error?.response?.status !== undefined) {
        console.log(error?.response?.status + ": Invalid user session");
      } else {
        console.log(error);
      }
      setUser({ username: "", token: "" });
      return "";
    }
  }
  return refreshUser;
}
