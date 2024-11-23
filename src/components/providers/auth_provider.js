"use client";
import axios, { axiosPrivate } from "@/api/axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [admin, setAdmin] = useState({ username: "", token: "" });
  const [user, setUser] = useState({ username: "", token: "" });
  const [prevRoute, setPrevRoute] = useState("");
  const _logoutUrl = "/Auth/Logout";
  const _adminLogoutUrl = "/AdminAuth/Logout";
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
        setUser({ username: "", token: "" });
        router.push("/login");
      } else {
        throw new Error();
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setIsAdmin(false);
        setAdmin({ username: "", token: "" });
        if (redirect) {
          router.push("/admin/login");
        }
      } else {
        console.error(err);
      }
    }
  }
  async function logoutAdmin(redirect = true) {
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
        setIsAdmin(false);
        setAdmin({ username: "", token: "" });
        if (redirect) {
          router.push("/admin/login");
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setIsAdmin(false);
        setAdmin({ username: "", token: "" });
        if (redirect) {
          router.push("/admin/login");
        }
      } else {
        console.error(err);
      }
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
