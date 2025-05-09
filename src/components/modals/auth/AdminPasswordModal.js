import useAuth from "@/hooks/useAuth";
import {useMutation} from "@tanstack/react-query";
import PasswordModal from "./PasswordModal";
import useAxiosAdmin from "@/hooks/useAxiosAdmin";
import {useState} from "react";

export default function AdminPasswordModal() {
  const axiosAdmin = useAxiosAdmin();
  const {user, admin, logoutAdmin, logout} = useAuth();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const _url = "/AdminAuth/ChangePassword";
  const mutation = useMutation({
    mutationFn: async () => {
      await axiosAdmin.post(
        _url,
        JSON.stringify({
          username: admin.username,
          password: password,
          newPassword: newPassword,
        }),
        {headers: {"Content-Type": "application/json"}}
      );
    },
    onSuccess: () => {
      closeModal();
      logoutAdmin();
      if (admin.username === user.username) logout();
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  return (
    <PasswordModal
      password={password}
      setPassword={setPassword}
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      error={error}
      setError={setError}
      mutation={mutation}
    />
  );
}
