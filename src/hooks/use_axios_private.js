import { axiosPrivate } from "@/api/axios";
import { useContext, useEffect } from "react";
import useAuth from "./use_auth";


export default function useAxiosPrivate() {
  const { auth } = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if(auth) {
          config.headers.Authorization = `Bearer ${auth}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    }
  }, [auth])

  return axiosPrivate;
}