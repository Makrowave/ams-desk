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

  const [loginFocus, setLoginFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  return (
    <div className="justify-center flex content-center h-full items-center">
      <Paper
        component={'form'}
        onSubmit={(e) => handleSubmit(e)}
        sx={{
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 4,
          bgcolor: 'primary.main',
          borderRadius: 2,
          boxShadow: 3,
          width: 300,
        }}
      >
        <Typography variant="h5">Logowanie</Typography>
        <ErrorDisplay message={loginError} isVisible={loginError !== ''} />
        <Typography>Nazwa użytkownika</Typography>
        <TextField
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setLoginFocus(true)}
          onBlur={() => setLoginFocus(false)}
          placeholder="Login"
        />
        <Typography>Hasło</Typography>
        <Password
          value={password}
          setValue={setPassword}
          onKeyDown={handleKeyDown}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
        />
        <Button type="submit">Zaloguj</Button>
      </Paper>
    </div>
  );
};

export default LoginForm;
