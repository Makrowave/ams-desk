import { axiosAdmin } from "@/api/axios";
import { useEffect } from "react";
import useAuth from "./use_auth";

//Axios private duplicate - try to read into docs and refactor it later
export default function useAxiosAdmin() {
  //refactor access token
  const { adminAccessToken, refreshAdmin, logoutAdmin } = useAuth();
  useEffect(() => {
    const requestIntercept = axiosAdmin.interceptors.request.use(
      (config) => {
        if (adminAccessToken) {
          config.headers.Authorization = `Bearer ${adminAccessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const errorMessageIntercept = axiosAdmin.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        let authorized = false;
        if ((error?.response?.status === 401) && !prevRequest?.sent) {
          //Refresh before logout
          prevRequest.sent = true;
          await refreshAdmin();
          console.log(error);
        } else if (error?.response?.status === 401 || error?.response?.status === 403) {
          //Logout if can't refresh
          await logoutAdmin();
          console.log(error);
        } else if (error.response === undefined) {
          //Check for CORS errors or network errors
          error.message = "Nie udało połączyć się z serwerem";
          authorized = true;
          return Promise.reject(error);
        } else if (!(typeof error.response.data === "string")) {
          //If data is not in string format then backend messed up (or rather me coding it)
          error.message = "Nastąpił nieoczekiwany błąd";
          authorized = true;
          return Promise.reject(error);
        } else if (typeof error.response.data === "string") {
          //Not default but under if just to be safe (hopefully no edgecases)
          error.message = error.response.data;
          authorized = true;
          return Promise.reject(error);
        }
        // if (authorized) {
        //   return Promise.reject(error);
        // }
      }
    );
    return () => {
      axiosAdmin.interceptors.request.eject(requestIntercept);
      axiosAdmin.interceptors.response.eject(errorMessageIntercept);
    };
  }, [adminAccessToken]);
  return axiosAdmin;
}
