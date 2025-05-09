import ErrorDisplay from "@/components/error/ErrorDisplay";
import FetchSelect from "@/components/filtering/FetchSelect";
import useAxiosAdmin from "@/hooks/useAxiosAdmin";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import URLS from "@/util/urls";
import {Button, TextField} from "@mui/material";

export default function UserModal({user, action, closeModal}) {
  const [username, setUsername] = useState(user === undefined ? "" : user.username);
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState(user === undefined ? "" : user.employeeId);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const mutation = useMutation({
    mutationFn: async () => {
      if (action === "put") {
        return await axiosAdmin.put(
          URLS.Users + user.userId,
          JSON.stringify({
            username: username,
            newPassword: password,
            employeeId: employeeId,
          }),
          {
            headers: {"Content-Type": "application/json"},
          }
        );
      } else if (action === "post") {
        return await axiosAdmin.post(
          URLS.Users,
          JSON.stringify({
            username: username,
            password: password,
            employeeId: employeeId ? employeeId : null,
          }),
          {
            headers: {"Content-Type": "application/json"},
          }
        );
      }
    },
    onSuccess: (response) => {
      queryClient.refetchQueries({
        queryKey: [URLS.Users],
        exact: false,
      });
      closeModal();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  function handleClick() {
    mutation.mutate();
  }

  return (
    <>
      <ErrorDisplay message={error} isVisible={!!error}/>
      <TextField label='Login' value={username} onChange={setUsername}/>
      <TextField label='Hasło' value={password} onChange={setPassword}/>
      <FetchSelect
        value={employeeId}
        onChange={setEmployeeId}
        urlKey={'Employees'}
        label='Pracownik'
        defaultValue={""}
      />
      <Button onClick={handleClick} variant={"contained"} color={"primary"}>
        {action === "put" ? "Edytuj" : ""}
        {action === "post" ? "Dodaj" : ""}
      </Button>
    </>
  );
}
