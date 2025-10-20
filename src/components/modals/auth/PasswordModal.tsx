import { Button, Stack, TextField, Typography } from '@mui/material';
import ErrorDisplay from '../../error/ErrorDisplay';

import { useEffect, useState } from 'react';
import Password from '../../input/Password';

type PasswordModalProps = {
  password: string;
  setPassword: (password: string) => void;
  newPassword: string;
  setNewPassword: (newPassword: string) => void;
  error: string;
  setError: (error: string) => void;
  mutation: {
    mutate: () => void;
  };
};

export default function PasswordModal({
  password,
  setPassword,
  newPassword,
  setNewPassword,
  error,
  setError,
  mutation,
}: PasswordModalProps) {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [match, setMatch] = useState(true);
  useEffect(() => {
    if (newPassword === confirmPassword) {
      setMatch(true);
    } else {
      setMatch(false);
    }
  }, [newPassword, confirmPassword]);

  function handleClick() {
    if (!match) {
      setError('Hasła nie są identyczne');
    } else if (password === '') {
      setError('Hasło jest puste');
    } else {
      mutation.mutate();
    }
  }

  return (
    <>
      <ErrorDisplay isVisible={error !== ''} message={error} />
      <Stack>
        <Password label="Stare hasło" value={password} setValue={setPassword} />
      </Stack>
      <Stack>
        <Password
          label="Nowe hasło"
          value={newPassword}
          setValue={setNewPassword}
        />
      </Stack>
      <Stack>
        <Password
          label="Potwierdź nowe hasło"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
      </Stack>
      <Button onClick={() => handleClick()}>Zmień hasło</Button>
    </>
  );
}
