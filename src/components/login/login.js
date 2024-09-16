'use client'
import { useState } from "react";


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className="justify-center flex content-center h-full items-center">
      <form className="h-fit">
        <div className="flex flex-col m-auto item-center *:my-6 bg-primary py-6 px-6 border-2 border-border">
          <span className="self-center">Logowanie</span>
          <div>
          <span>Login</span>
          <input className="block text-black text-center bg-primary border-2 border-tertiary rounded-l" value={username} onChange={e => { setUsername(e.target.value) }}></input>
          </div>
          <div>
          <span>Hasło</span>
          <input className="block text-black text-center bg-primary border-2 border-tertiary rounded-l" value={password} onChange={e => { setPassword(e.target.value) }}></input>
          </div>
          <button className="block bg-primary rounded-lg px-2 border-border border-2">Zaloguj</button>
        </div>
      </form>
    </div>
  )
}