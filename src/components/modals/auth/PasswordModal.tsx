import { Button, Stack, TextField, Typography } from '@mui/material';
import ErrorDisplay from '../../error/ErrorDisplay';

import { useEffect, useState } from 'react';

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
        <Typography>Stare hasło</Typography>
        <TextField
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Stack>
      <Stack>
        <Typography>Nowe hasło</Typography>
        <TextField
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
      </Stack>
      <Stack>
        <Typography>Potwierdź nowe hasło</Typography>
        <TextField
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </Stack>
      <Button onClick={() => handleClick()}>Zmień hasło</Button>
    </>
  );
}
