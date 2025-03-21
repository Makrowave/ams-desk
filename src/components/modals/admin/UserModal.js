import ErrorDisplay from "@/components/error/ErrorDisplay";
import FetchSelect from "@/components/filtering/FetchSelect";
import ModalTextInput from "@/components/input/ModalTextInput";
import useAxiosAdmin from "@/hooks/useAxiosAdmin";
import useModal from "@/hooks/useModal";
import {QUERY_KEYS} from "@/util/query_keys";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";

export default function UserModal({user, action}) {
  const [username, setUsername] = useState(user === undefined ? "" : user.username);
  const [password, setPassword] = useState("");
  const [employeeId, setEmployeeId] = useState(user === undefined ? "" : user.employeeId);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const {setIsModalOpen} = useModal();
  const _url = "/Users/";
  const mutation = useMutation({
    mutationFn: async () => {
      if (action === "put") {
        return await axiosAdmin.put(
          _url + user.userId,
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
          _url,
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
        queryKey: [QUERY_KEYS.Users],
        exact: false,
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  function handleClick() {
    mutation.mutate();
  }

  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={!!error}/>
      <ModalTextInput title='Login' value={username} setValue={setUsername}/>
      <ModalTextInput title='Hasło' value={password} setValue={setPassword}/>
      <FetchSelect
        value={employeeId}
        onChange={setEmployeeId}
        src='/Employees'
        queryKey={QUERY_KEYS.Employees}
        title='Pracownik'
        default_option={""}
        default_title='Brak'
      />
      <button className='button-primary mb-4' onClick={() => handleClick()}>
        {action === "put" ? "Edytuj" : ""}
        {action === "post" ? "Dodaj" : ""}
      </button>
    </div>
  );
}
