import ErrorDisplay from "@/components/error/ErrorDisplay";

import {useEffect, useState} from "react";

export default function PasswordModal({
                                        password,
                                        setPassword,
                                        newPassword,
                                        setNewPassword,
                                        error,
                                        setError,
                                        mutation,
                                      }) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(true);
  useEffect(() => {
    if (newPassword == confirmPassword) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, [newPassword, confirmPassword]);

  function handleClick() {
    if (!match) {
      setError("Hasła nie są identyczne");
    } else if (password == "") {
      setError("Hasło jest puste");
    } else {
      mutation.mutate();
    }
  }

  return (
    <div className='flex flex-col justify-self-center w-full mx-16'>
      <ErrorDisplay isVisible={error !== ""} message={error}/>
      <div className='flex flex-col'>
        <span>Stare hasło</span>
        <input
          className='block text-center bg-primary border-2 border-tertiary rounded-lg'
          type='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className='flex flex-col'>
        <span>Nowe hasło</span>
        <input
          className='block text-center bg-primary border-2 border-tertiary rounded-lg'
          type='password'
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
      </div>
      <div className='flex flex-col'>
        <span>Potwierdź nowe hasło</span>
        <input
          className='block text-center bg-primary border-2 border-tertiary rounded-lg'
          type='password'
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
      <button className='button-primary mb-4 mt-10' onClick={() => handleClick()}>
        Zmień hasło
      </button>
    </div>
  );
}
