import axios from '../api/axios';
import useAuth from './useAuth';
import { decodeToken } from 'react-jwt';

const useRefreshUser = () => {
  const { setUser } = useAuth();
  const _refreshUrl = '/Auth/Refresh';

  return async () => {
    try {
      const response = await axios.get<string>(_refreshUrl, {
        withCredentials: true,
      });
      setUser({
        username: decodeToken<{ name: string }>(response.data)?.name,
        token: response.data,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as { response?: { status: number } };
      if (axiosError?.response?.status !== undefined) {
        console.log(axiosError?.response?.status + ': Invalid user session');
      } else {
        console.log(axiosError);
      }
      setUser({ username: '', token: '' });
      return '';
    }
  };
};

export default useRefreshUser;
