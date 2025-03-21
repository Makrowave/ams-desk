"use client";
import useAuth from "@/hooks/useAuth";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import LoginForm from "./LoginForm";
import axios from "@/api/axios";
import useRefreshUser from "@/hooks/useRefreshUser";
import Link from "next/link";

export default function Login() {
  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const {user} = useAuth();
  const router = useRouter();
  const refresh = useRefreshUser();
  const _loginUrl = "/Auth/Login";
  /** Refresh session - if session token cookie is valid then
   * accessToken should be retrieved from the server with refresh() function
   * and if it happens - redirect to app for user's convenience,
   * without implementing persistent login*/
  useEffect(() => {
    if (!attemptedLogin) {
      refresh().finally(() => setAttemptedLogin(true));
    }
  });

  async function login(username, password) {
    setError("");
    try {
      const response = await axios.post(_loginUrl, JSON.stringify({username, password}), {
        headers: {"Content-Type": "application/json"},
        withCredentials: true,
      });
      if (response.status === 200) {
        setSuccess(true);
        const token = await refresh();
        if (token.data !== "") {
          router.push("/");
        }
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

  if (!attemptedLogin) {
    return <></>;
  }
  if (user.token !== "" && !success) {
    return (
      <div className="bg-white shadow-lg rounded-lg flex flex-col p-4 w-fit m-auto h-40 justify-center">
        <h2 className="text-2xl">Jesteś już zalogowany</h2>
        <Link href={"/"} className="underline text-blue-600">Strona główna</Link>
      </div>
    )
  }
  return <LoginForm login={login} loginError={error}/>;
}
