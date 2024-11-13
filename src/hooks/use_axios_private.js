import { axiosPrivate } from "@/api/axios";
import { useEffect } from "react";
import useAuth from "./use_auth";
import useRefreshUser from "./use_refresh_user";

//Code for including Authorization header in request
//And resending requests when Access Token expires
export default function useAxiosPrivate() {
  const { user, logout, logoutAdmin } = useAuth();
  const refresh = useRefreshUser();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosPrivate(prevRequest);
        } else if (error?.response?.status === 401) {
          //Logout if can't refresh
          await logoutAdmin();
          await logout();
        } else if (error.response === undefined) {
          //Check for CORS errors or network errors
          error.message = "Nie udało połączyć się z serwerem";
        } else if (!(typeof error.response.data === "string")) {
          //If data is not in string format then backend messed up (or rather me coding it)
          error.message = "Nastąpił nieoczekiwany błąd";
        } else if (typeof error.response.data === "string") {
          //Not default but under if just to be safe (hopefully no edgecases)
          error.message = error.response.data;
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [user, refresh]);

  return axiosPrivate;
}
