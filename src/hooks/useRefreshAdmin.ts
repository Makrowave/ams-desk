import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';
import { decodeToken } from 'react-jwt';

export default function useRefreshAdmin() {
  const { setAdmin } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const _adminRefreshUrl = '/AdminAuth/Refresh';

  async function refreshAdmin() {
    try {
      const response = await axiosPrivate.get(_adminRefreshUrl, {
        withCredentials: true,
      });
      setAdmin({
        username: decodeToken<{ name: string }>(response.data)?.name,
        token: response.data,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as { response?: { status: number } };
      if (axiosError?.response?.status !== undefined) {
        console.log(axiosError?.response?.status + ': Invalid admin session');
      } else {
        console.log(axiosError);
      }
      setAdmin({ username: '', token: '' });
      return '';
    }
  }

  return refreshAdmin;
}
