import { axiosPrivate } from "@/api/axios";
import { useEffect } from "react";
import useAuth from "./use_auth";

//Code for including Authorization header in request
//And resending requests when Access Token expires
export default function useAxiosPrivate() {
  const { accessToken, refresh, logout } = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if(accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );


    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if(error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          refresh();
        } else if(error?.response?.status === 401) {
          logout();
        }
      }
    );


    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [accessToken])

  return axiosPrivate;
}