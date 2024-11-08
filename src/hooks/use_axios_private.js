import { axiosPrivate } from "@/api/axios";
import { useEffect } from "react";
import useAuth from "./use_auth";

//Code for including Authorization header in request
//And resending requests when Access Token expires
export default function useAxiosPrivate() {
  const { accessToken, refresh, logout } = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error.response === undefined) {
          //Check for CORS errors or network errors
          error.message = "Nie udało połączyć się z serwerem";
        } else if ((error?.response?.status === 401 || error?.response?.status === 403) && !prevRequest?.sent) {
          //Refresh before logout
          prevRequest.sent = true;
          refresh();
        } else if (error?.response?.status === 401 || error?.response?.status === 403) {
          //Logout if can't refresh
          logout();
        } else if (!(typeof error.response.data === "string")) {
          //If data is not in string format then backend messed up (or rather me coding it)
          error.message = "Nastąpił nieoczekiwany błąd";
        } else if (typeof error.response.data === "string") {
          //Not default but under if just to be safe (hopefully no edgecases)
          error.message = error.message.data;
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken]);

  return axiosPrivate;
}
