import useAuth from "@/hooks/use_auth";
import useModal from "@/hooks/use_modal";
import { useMutation } from "@tanstack/react-query";
import PasswordModal from "./password_modal";
import useAxiosAdmin from "@/hooks/use_axios_admin";
import { useState } from "react";

export default function AdminPasswordModal() {
  const axiosAdmin = useAxiosAdmin();
  const { username, logoutAdmin, logout } = useAuth();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  const _url = "/AdminAuth/ChangePassword";
  const mutation = useMutation({
    mutationFn: async () => {
      await axiosAdmin.post(
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
      logoutAdmin();
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
