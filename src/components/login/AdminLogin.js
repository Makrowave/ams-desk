"use client";
import useAuth from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import LoginForm from "./LoginForm";
import useRefreshAdmin from "@/hooks/useRefreshAdmin";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const {admin, setIsAdmin} = useAuth();
  const refresh = useRefreshAdmin();
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter();
  const _loginUrl = "/AdminAuth/Login";
  /** Refresh session - if session token cookie is valid then
   * accessToken should be retrieved from the server with refresh() function
   * and if it happens - redirect to app for user's convenience */
  useEffect(() => {
    if (admin.token) {
      router.push("/admin");
    }
  });

  async function login(username, password) {
    setError("");
    try {
      const response = await axiosPrivate.post(_loginUrl, JSON.stringify({username, password}), {
        headers: {"Content-Type": "application/json"},
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAdmin(true);
        await refresh();
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return <LoginForm login={login} loginError={error}/>;
}
