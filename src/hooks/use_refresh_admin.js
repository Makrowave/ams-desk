import useAuth from "./use_auth";
import useAxiosPrivate from "./use_axios_private";
import { decodeToken } from "react-jwt";
export default function useRefreshAdmin() {
  const { setAdmin } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const _adminRefreshUrl = "/AdminAuth/Refresh";
  async function refreshAdmin() {
    try {
      const response = await axiosPrivate.get(_adminRefreshUrl, {
        withCredentials: true,
      });
      console.log("Response: " + response.data);
      setAdmin({ username: decodeToken(response.data).name, token: response.data });
      return response.data;
    } catch (error) {
      if (error?.response?.status !== undefined) {
        console.log(error?.response?.status + ": Invalid admin session");
      } else {
        console.log(error);
      }
      setAdmin({ username: "", token: "" });
      return "";
    }
  }
  return refreshAdmin;
}
