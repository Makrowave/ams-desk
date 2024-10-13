'use client'
import useAuth from "@/hooks/use_auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attemtedLogin, setAttemptedLogin] = useState(false);
  const _loginUrl = '/Auth/Login'
  const router = useRouter();
  const { accessToken, login, refresh, loginError } = useAuth();



  async function handleSubmit() {
    login(username, password);
  }

  function handleKeyDown(event) {
    if(event.key === 'Enter') {
      handleSubmit();
    }
  }

  /** Refresh session - if session token cookie is valid then
   * accessToken should be retrieved from the server with refresh() function
   * and if it happens - redirect to app for user's convenience */
  useEffect(() => {
    setAttemptedLogin(true);
    if(!attemtedLogin){
      refresh();
    }
    if (accessToken) {
      router.push('/rowery');
    }
  })

  return (
    <div className="justify-center flex content-center h-full items-center">
      <div className="flex flex-col m-auto item-center bg-primary py-6 px-6 border-2 border-border">
        <span className="self-center text-3xl">Logowanie</span>
        <div className={loginError === '' ? "" : "bg-red-300 p-2 mt-2 border-red-600 border text-center"}>
          <span className="text-red-800 text-xl">{loginError}</span>
        </div>
        <div className="my-6">
          <span>Login</span>
          <input className="block  text-center bg-primary border-2 border-tertiary rounded-l" 
          value={username} onChange={e => { setUsername(e.target.value) }} onKeyDown={handleKeyDown}></input>
        </div>
        <div className="my-6">
          <span>Hasło</span>
          <input type="password" className="block  text-center bg-primary border-2 border-tertiary rounded-l" 
          value={password} onChange={e => { setPassword(e.target.value) }} onKeyDown={handleKeyDown}></input>
        </div>
        <button className="block bg-primary rounded-lg px-2 border-border border-2" onClick={() => { handleSubmit() }}>Zaloguj</button>
      </div>
    </div>
  )
}