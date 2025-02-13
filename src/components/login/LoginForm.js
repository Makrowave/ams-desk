import { useState } from "react";
import ErrorDisplay from "../error/ErrorDisplay";
import Password from "../input/Password";

export default function LoginForm({ login, loginError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    login(username, password);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }
  return (
    <div className='justify-center flex content-center h-full items-center'>
      <div className='flex flex-col m-auto item-center bg-primary py-6 px-6 border-2 border-border w-80'>
        <span className='self-center text-3xl'>Logowanie</span>
        <ErrorDisplay message={loginError} isVisible={loginError !== ""} />
        <div className='my-6 flex flex-col'>
          <span>Login</span>
          <input
            className='block text-center bg-primary border-2 border-tertiary rounded-lg'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          ></input>
        </div>
        <div className='my-6 flex flex-col'>
          <span>Hasło</span>
          <Password value={password} setValue={setPassword} onKeyDown={handleKeyDown} />
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
