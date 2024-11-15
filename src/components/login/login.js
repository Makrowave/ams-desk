"use client";
import useAuth from "@/hooks/use_auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoginForm from "./login_form";
import axios from "@/api/axios";
import useRefreshUser from "@/hooks/use_refresh_user";
export default function Login() {
  const [attemtedLogin, setAttemptedLogin] = useState(false);
  const [error, setError] = useState("");
  const { user, prevRoute } = useAuth();
  const router = useRouter();
  const refresh = useRefreshUser();
  const ADMIN_ROUTE_REG = REGEX.ADMIN_ROUTE;
  const _loginUrl = "/Auth/Login";
  /** Refresh session - if session token cookie is valid then
   * accessToken should be retrieved from the server with refresh() function
   * and if it happens - redirect to app for user's convenience,
   * without implementing persistent login*/
  useEffect(() => {
    const attemptRefresh = async () => {
      await refresh();
      setAttemptedLogin(true);
    };
    if (!attemtedLogin) {
      attemptRefresh();
    }
    if (user.token) {
      if (prevRoute === "/login" || prevRoute === "" || ADMIN_ROUTE_REG.test(prevRoute)) {
        router.push("/rowery");
      } else {
        router.push(prevRoute);
      }
    }
  });
  async function login(username, password) {
    setError("");
    try {
      const response = await axios.post(_loginUrl, JSON.stringify({ username, password }), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.status === 200) {
        await refresh();
      }
    } catch (err) {
      //Solution unless I make a special interceptor for axios for this usecase only
      if (!err?.response) {
        setError("Brak odpowiedzi serwera");
      } else if (err.response.status === 400) {
        setError("Niepoprawny login lub hasło");
      } else {
        setError("Kod błędu: " + err.response.status);
      }
    }
  }

  if (!attemtedLogin) {
    return <></>;
  }
  return <LoginForm login={login} loginError={error} />;
}
