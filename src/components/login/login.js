"use client";
import useAuth from "@/hooks/use_auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorDisplay from "../error/error_display";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attemtedLogin, setAttemptedLogin] = useState(false);
  const _loginUrl = "/Auth/Login";
  const router = useRouter();
  const { accessToken, login, refresh, loginError, prevRoute } = useAuth();

  async function handleSubmit() {
    login(username, password);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  /** Refresh session - if session token cookie is valid then
   * accessToken should be retrieved from the server with refresh() function
   * and if it happens - redirect to app for user's convenience */
  useEffect(() => {
    setAttemptedLogin(true);
    if (!attemtedLogin) {
      refresh();
    }
    if (accessToken) {
      if (prevRoute === "/login" || prevRoute === "") {
        router.push("/rowery");
      } else {
        router.push(prevRoute);
      }
    }
  });

  return (
    <div className='justify-center flex content-center h-full items-center'>
      <div className='flex flex-col m-auto item-center bg-primary py-6 px-6 border-2 border-border w-80'>
        <span className='self-center text-3xl'>Logowanie</span>
        <ErrorDisplay message={loginError} isVisible={loginError !== ""} />
        <div className='my-6 flex flex-col'>
          <span>Login</span>
          <input
            className='block text-center bg-primary border-2 border-tertiary rounded-l'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
        <div className='my-6 flex flex-col'>
          <span>Hasło</span>
          <input
            type='password'
            className='block text-center bg-primary border-2 border-tertiary rounded-l'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
        <button
          className='block bg-primary rounded-lg px-2 border-border border-2'
          onClick={() => {
            handleSubmit();
          }}
        >
          Zaloguj
        </button>
      </div>
    </div>
  );
}
