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
    /*  
      Some notes to myself or whoever will see this:
        1. You can use multiple intercepts.
        2. Since you can use multiple intercepts don't make a mistake of
          mixing returning error message and refetching - I accidentally
          made it so even though the app successfully refetches access token
          it still returns rejected promise which in turn generates error
          which in turn triggers intercept again and logs user out.
        3. You should use shorter token expiry time for debugging.
        4. 403 will most likely generate unexpected logouts when I will
          introduce admin panel.
        5. Maybe learn how intercepts work
    */
    const errorMessageIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        let authorized = false;
        if ((error?.response?.status === 401 || error?.response?.status === 403) && !prevRequest?.sent) {
          //Refresh before logout
          prevRequest.sent = true;
          await refresh();
        } else if (error?.response?.status === 401 || error?.response?.status === 403) {
          //Logout if can't refresh
          await logout();
        } else if (error.response === undefined) {
          //Check for CORS errors or network errors
          error.message = "Nie udało połączyć się z serwerem";
          authorized = true;
        } else if (!(typeof error.response.data === "string")) {
          //If data is not in string format then backend messed up (or rather me coding it)
          error.message = "Nastąpił nieoczekiwany błąd";
          authorized = true;
        } else if (typeof error.response.data === "string") {
          //Not default but under if just to be safe (hopefully no edgecases)
          error.message = error.response.data;
          authorized = true;
        }
        if (authorized) {
          return Promise.reject(error);
        }
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(errorMessageIntercept);
    };
  }, [accessToken]);

  return axiosPrivate;
}
