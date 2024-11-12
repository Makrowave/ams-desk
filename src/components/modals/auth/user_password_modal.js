import useAuth from "@/hooks/use_auth";
import useAxiosPrivate from "@/hooks/use_axios_private";
import useModal from "@/hooks/use_modal";
import { useMutation } from "@tanstack/react-query";
import PasswordModal from "./password_modal";
import { useState } from "react";

export default function UserPasswordModal() {
  const axiosPrivate = useAxiosPrivate();
  const { username, logout } = useAuth();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  const _url = "/Auth/ChangePassword";
  const mutation = useMutation({
    mutationFn: async () => {
      await axiosPrivate.post(
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
      setIsOpen(false);
      setModalChildren(<></>);
      setTitle("");
      logout();
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  return (
  <PasswordModal password={password} 
  setPassword={setPassword} 
  newPassword={newPassword} 
  setNewPassword={setNewPassword} 
  error={error} 
  setError={setError}
  mutation={mutation}/>)
}
