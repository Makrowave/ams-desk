import ErrorDisplay from '../../error/ErrorDisplay';
import FetchSelect from '../../filtering/FetchSelect';
import useAxiosAdmin from '../../../hooks/useAxiosAdmin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import URLS from '../../../util/urls';
import { Button, TextField } from '@mui/material';
import { User } from '../../../app/types/employeeTypes';

type UserModalProps = {
  user?: User;
  action: 'post' | 'put';
  closeModal?: () => void;
};

const UserModal = ({ user, action, closeModal }: UserModalProps) => {
  const [username, setUsername] = useState(
    user === undefined ? '' : user.username,
  );
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState(
    user?.employeeId === undefined ? 0 : user?.employeeId,
  );
  const [error, setError] = useState('');
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const mutation = useMutation({
    mutationFn: async () => {
      if (action === 'put') {
        return await axiosAdmin.put(
          URLS.Users + user?.id,
          JSON.stringify({
            username: username,
            newPassword: password,
            employeeId: employeeId === 0 ? null : employeeId,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );
      } else if (action === 'post') {
        return await axiosAdmin.post(
          URLS.Users,
          JSON.stringify({
            username: username,
            password: password,
            employeeId: employeeId ? employeeId : null,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }
    },
    onSuccess: (response) => {
      queryClient.refetchQueries({
        queryKey: [URLS.Users],
        exact: false,
      });
      if (closeModal) closeModal();
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
      <ErrorDisplay message={error} isVisible={!!error} />
      <TextField
        label="Login"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FetchSelect
        value={employeeId}
        onChange={setEmployeeId}
        urlKey={'Employees'}
        label="Pracownik"
        defaultValue={0}
      />
      <Button onClick={handleClick} variant={'contained'} color={'primary'}>
        {action === 'put' ? 'Edytuj' : ''}
        {action === 'post' ? 'Dodaj' : ''}
      </Button>
    </>
  );
};

export default UserModal;
