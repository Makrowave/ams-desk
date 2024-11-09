import ErrorDisplay from "@/components/error/error_display";
import useAuth from "@/hooks/use_auth";
import useAxiosPrivate from "@/hooks/use_axios_private";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function PasswordModal() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(true);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { username, logout } = useAuth();
  const mutation = useMutation({
    mutationFn: () => {
      axiosPrivate.post(
        _url,
        JSON.stringify({
          username: username,
          password: password,
          newPassword: newPassword,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    },
    onSuccess: () => {
      logout();
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const _url = "/Auth/ChangePassword";
  useEffect(() => {
    if (newPassword == confirmPassword) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, [newPassword, confirmPassword]);
  function handleClick() {
    if (match) {
    } else {
      setError("Hasła nie są identyczne");
    }
  }

  return (
    <div className='flex flex-col justify-self-center w-full mx-16'>
      <ErrorDisplay isVisible={error !== ""} message={error} />
      <div className='flex flex-col'>
        <span>Stare hasło</span>
        <input
          className='block text-center bg-primary border-2 border-tertiary rounded-l'
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
          className='block text-center bg-primary border-2 border-tertiary rounded-l'
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
          className='block text-center bg-primary border-2 border-tertiary rounded-l'
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
