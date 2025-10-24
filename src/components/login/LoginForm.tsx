import { useState } from 'react';
import ErrorDisplay from '../error/ErrorDisplay';
import Password from '../input/Password';
import { Button, Paper, TextField, Typography } from '@mui/material';

type LoginFormProps = {
  login: (username: string, password: string) => void;
  loginError: string;
};

const LoginForm = ({ login, loginError }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login(username, password);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <Paper
      component={'form'}
      onSubmit={(e) => handleSubmit(e)}
      sx={{
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        gap: 4,
        width: 300,
      }}
    >
      <Typography variant="h5">Logowanie</Typography>
      <ErrorDisplay message={loginError} isVisible={loginError !== ''} />
      <TextField
        label="Nazwa użytkownika"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        sx={(theme) => ({
          '& input:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
            boxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
          },
        })}
        onKeyDown={handleKeyDown}
        placeholder="Login"
      />
      <Password
        // label="Hasło"
        value={password}
        setValue={setPassword}
        onKeyDown={handleKeyDown}
      />
      <Button variant="contained" type="submit">
        Zaloguj
      </Button>
    </Paper>
  );
};

export default LoginForm;
