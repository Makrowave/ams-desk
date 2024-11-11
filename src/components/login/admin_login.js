"use client";
import useAuth from "@/hooks/use_auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoginForm from "./login_form";
export default function AdminLogin() {
  const [attemtedLogin, setAttemptedLogin] = useState(false);
  const router = useRouter();
  const { adminAccessToken, loginAdmin, refreshAdmin, loginError } = useAuth();

  /** Refresh session - if session token cookie is valid then
   * accessToken should be retrieved from the server with refresh() function
   * and if it happens - redirect to app for user's convenience */
  useEffect(() => {
    setAttemptedLogin(true);
    if (!attemtedLogin) {
      refreshAdmin();
    }
    if (adminAccessToken) {
      router.push("/admin");
    }
  });
  if (!attemtedLogin) {
    return <></>;
  }
  return <LoginForm login={loginAdmin} loginError={loginError} />;
}
