import { axiosAdmin } from '../api/axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import useRefreshAdmin from './useRefreshAdmin';

//Axios private duplicate - try to read into docs and refactor it later
export default function useAxiosAdmin() {
  //refactor access token
  const { admin, logoutAdmin } = useAuth();
  const refresh = useRefreshAdmin();
  useEffect(() => {
    const requestIntercept = axiosAdmin.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${admin.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
    const responseIntercept = axiosAdmin.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        let authorized = false;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return axiosAdmin(prevRequest);
        } else if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          //Logout if can't refresh
          await logoutAdmin();
        } else if (error.response === undefined) {
          //Check for CORS errors or network errors
          error.message = 'Nie udało połączyć się z serwerem';
          authorized = true;
        } else if (
          !(typeof error.response.data === 'string') ||
          error?.response?.status >= 500
        ) {
          //If data is not in string format then backend messed up (or rather me coding it)
          console.log(error);
          error.message = 'Nastąpił nieoczekiwany błąd';
          authorized = true;
        } else if (typeof error.response.data === 'string') {
          //Not default but under if just to be safe (hopefully no edgecases)
          error.message = error.response.data;
          authorized = true;
        }
        if (authorized) {
          return Promise.reject(error);
        }
      },
    );
    return () => {
      axiosAdmin.interceptors.response.eject(responseIntercept);
      axiosAdmin.interceptors.request.eject(requestIntercept);
    };
  }, [admin, refresh]);
  return axiosAdmin;
}
