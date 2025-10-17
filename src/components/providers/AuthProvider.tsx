'use client';
import axios from '../../api/axios';
import { useRouter } from 'next/navigation';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

export interface AuthContextType {
  user: { username?: string; token?: string };
  setUser: Dispatch<SetStateAction<{ username?: string; token?: string }>>;
  admin: { username?: string; token?: string };
  setAdmin: Dispatch<SetStateAction<{ username?: string; token?: string }>>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
  logout: () => Promise<void>;
  logoutAdmin: (redirect?: boolean) => Promise<void>;
  prevRoute: string;
  setPrevRoute: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [admin, setAdmin] = useState({});
  const [user, setUser] = useState<{ username?: string; token?: string }>({});
  const [prevRoute, setPrevRoute] = useState('');
  const _logoutUrl = '/Auth/Logout';
  const _adminLogoutUrl = '/AdminAuth/Logout';
  const router = useRouter();

  /**
   * Sends API request for session cookie which is
   * used to authenticate for accessToken.
   * If login error occurs it is set in loginError state.
   * @param {string} username
   * @param {string} password
   */

  /**
   * Sends API request to delete session cookie and sets
   * accessToken to default value preventing access.
   */
  async function logout() {
    setUser({ username: '', token: '' });
    try {
      const response = await axios.post(
        _logoutUrl,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        setUser({ username: '', token: '' });
        router.push('/login');
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function logoutAdmin(redirect = true) {
    setPrevRoute('');
    setIsAdmin(false);
    setAdmin({ username: '', token: '' });
    if (redirect) {
      router.push('/admin/login');
    }
    try {
      const response = await axios.post(
        _adminLogoutUrl,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        // setIsAdmin(false);
        // setAdmin({ username: "", token: "" });
        // if (redirect) {
        //   router.push("/admin/login");
        // }
      } else {
        throw new Error();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        admin,
        setAdmin,
        isAdmin,
        setIsAdmin,
        logout,
        logoutAdmin,
        prevRoute,
        setPrevRoute,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
