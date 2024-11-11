"use client";
import useAuth from "@/hooks/use_auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoginForm from "./login_form";
export default function Login() {
  const [attemtedLogin, setAttemptedLogin] = useState(false);
  const router = useRouter();
  const { accessToken, login, refresh, loginError, prevRoute } = useAuth();
  const ADMIN_ROUTE_REG = /admin/;
  /** Refresh session - if session token cookie is valid then
   * accessToken should be retrieved from the server with refresh() function
   * and if it happens - redirect to app for user's convenience */
  useEffect(() => {
    setAttemptedLogin(true);
    if (!attemtedLogin) {
      refresh();
    }
    if (accessToken) {
      if (prevRoute === "/login" || prevRoute === "" || ADMIN_ROUTE_REG.test(prevRoute)) {
        router.push("/rowery");
      } else {
        router.push(prevRoute);
      }
    }
  });
  if (!attemtedLogin) {
    return <></>;
  }
  return <LoginForm login={login} loginError={loginError} />;
}
