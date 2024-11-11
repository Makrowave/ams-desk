"use client";
import axios from "@/api/axios";
import useAxiosPrivate from "@/hooks/use_axios_private";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { decodeToken } from "react-jwt";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminAccessToken, setAdminAccessToken] = useState("");
  const [decodedToken, setDecodedToken] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [loginError, setLoginError] = useState("");
  const [prevRoute, setPrevRoute] = useState("");
  const [username, setUsername] = useState("");
  const _loginUrl = "/Auth/Login";
  const _refreshUrl = "/Auth/Refresh";
  const _logoutUrl = "/Auth/Logout";
  const _adminLoginUrl = "/AdminAuth/Login";
  const _adminRefreshUrl = "/AdminAuth/Refresh";
  const _adminLogoutUrl = "/AdminAuth/Logout";
  const router = useRouter();
  /**
   * Sends API request for session cookie which is
   * used to authenticate for accessToken.
   * If login error occurs it is set in loginError state.
   * @param {string} username
   * @param {string} password
   */
  async function login(username, password) {
    setLoginError("");
    try {
      const response = await axios.post(_loginUrl, JSON.stringify({ username, password }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 200) {
        await refresh();
      }
    } catch (err) {
      if (!err?.response) {
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

  //Rethink if that should use accessToken or refreshToken (cookie)
  async function loginAdmin(username, password) {
    setLoginError("");
    try {
      const response = await axios.post(_adminLoginUrl, JSON.stringify({ username, password }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 200) {
        await refreshAdmin();
      }
    } catch (err) {
      if (!err?.response) {
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
    try {
      const response = await axios.post(
        _refreshUrl,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const data = response.data;
      if (!!data) {
        setAccessToken(data);
        let token = decodeToken(data);
        setDecodedToken(token);
        setUsername(token.name);
      } else {
        throw new Error();
      }
    } catch (err) {
      setAccessToken("");
      console.log(err);
    }
  }

  async function refreshAdmin() {
    try {
      const response = await axios.post(
        _adminRefreshUrl,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const data = response.data;
      if (!!data) {
        let token = decodeToken(data);
        //Just to be sure
        if (token.role === "Admin") {
          setAdminAccessToken(data);
          setUsername(token.name);
          setIsAdmin(true);
        }
      } else {
        setIsAdmin(false);
        throw new Error();
      }
    } catch (err) {
      console.log(err);
      setAdminAccessToken("");
    }
  }

  /**
   * Sends API request to delete session cookie and sets
   * accessToken to default value preventing access.
   */
  async function logout() {
    try {
      const response = await axios.post(
        _logoutUrl,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setAccessToken("");
      } else {
        throw new Error();
      }
    } catch (err) {
      //console.log(err);
    }
  }
  async function logoutAdmin() {
    setPrevRoute("");
    try {
      const response = await axios.post(
        _adminLogoutUrl,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setAdminAccessToken("");
        setUsername(decodedToken.name);
      } else {
        throw new Error();
      }
    } catch (err) {
      //console.log(err);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        login,
        refresh,
        logout,
        loginError,
        setPrevRoute,
        prevRoute,
        username,
        isAdmin,
        adminAccessToken,
        loginAdmin,
        refreshAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
