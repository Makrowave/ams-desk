'use client'
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState('');
  const [loginError, setLoginError] = useState('');
  const _loginUrl = '/Auth/Login';
  const _refreshUrl = '/Auth/Refresh';
  const _logoutUrl = '/Auth/Logout';
  const router = useRouter();

  /**
   * Sends API request for session cookie which is
   * used to authenticate for accessToken.
   * If login error occurs it is set in loginError state.
   * @param {string} username 
   * @param {string} password 
   */
  async function login(username, password) {
    setLoginError('');
    try {
      const response = await axios.post(_loginUrl,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        await refresh();
        router.push('/rowery');
      }
    }
    catch(err) {
      if(!err?.response) {
        setLoginError("Brak odpowiedzi serwera");
      } else if (err.response.status === 400) {
        setLoginError("Niewłaściwy format danych");
      } else if (err.response.status === 401) {
        setLoginError("Niepoprawny login lub hasło");
      } else {
        setLoginError("Kod błędu: " + err.response.status);
      }
    }
  }

  /**
   * Sends API request to get accessToken
   * resetting it to default beforehand.
   * The reset makes sure that user won't stay logged in
   * with invalid accessToken when session cookie is invalid too.
   */
  async function refresh() {
    setAccessToken('');
    try {
      const response = await axios.post(_refreshUrl, {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const data = response.data
      if (!!data) {
        setAccessToken(data);
      } else {
        throw new Error();
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  /**
   * Sends API request to delete session cookie and sets
   * accessToken to default value preventing access.
   */
  async function logout() {
    try {
      const response = await axios.post(_logoutUrl, {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setAccessToken('');
        router.push('/login');
      } else {
        throw new Error();
      }
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <AuthContext.Provider value={{ accessToken, login, refresh, logout, loginError}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;