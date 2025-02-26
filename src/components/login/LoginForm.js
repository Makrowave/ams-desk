import { useState } from "react";
import ErrorDisplay from "../error/ErrorDisplay";
import Password from "../input/Password";

export default function LoginForm({ login, loginError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    login(username, password);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  const [loginFocus, setLoginFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  return (
    <div className='justify-center flex content-center h-full items-center'>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='flex flex-col m-auto item-center bg-primary p-6 border-2 shadow-2xl rounded-lg w-80'
      >
        <span className='self-center text-3xl'>Logowanie</span>
        <ErrorDisplay message={loginError} isVisible={loginError !== ""} />
        <div
          className={
            loginFocus
              ? "my-6 flex flex-col rounded-lg p-1 border-2 border-border outline outline-blue-600"
              : "my-6 flex flex-col rounded-lg p-1 border-2 border-border"
          }
        >
          <span className='text-base  border-border w-fit'>Login</span>
          <input
            className='block rounded-lg w-full focus:outline-none'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setLoginFocus(true)}
            onBlur={() => setLoginFocus(false)}
            placeholder='Login'
          />
        </div>
        <div
          className={
            passwordFocus
              ? "my-6 flex flex-col rounded-lg p-1 border-2 border-border outline outline-blue-600"
              : "my-6 flex flex-col rounded-lg p-1 border-2 border-border"
          }
        >
          <span>Hasło</span>
          <Password
            value={password}
            setValue={setPassword}
            onKeyDown={handleKeyDown}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            className='block rounded-lg w-full focus:outline-none'
          />
        </div>
        <button className='button-primary' type='submit'>
          Zaloguj
        </button>
      </form>
    </div>
  );
}
