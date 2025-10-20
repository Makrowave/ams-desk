'use client';
import useAuth from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import axios from '../../api/axios';
import useRefreshUser from '../../hooks/useRefreshUser';
import Link from 'next/link';
import { AxiosError } from 'axios';
import Redirect from '../routing/Navigate';

const Login = () => {
  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const router = useRouter();
  const refresh = useRefreshUser();
  const _loginUrl = '/Auth/Login';
  /** Refresh session - if session token cookie is valid then
   * accessToken should be retrieved from the server with refresh() function
   * and if it happens - redirect to app for user's convenience,
   * without implementing persistent login*/
  useEffect(() => {
    if (!attemptedLogin) {
      refresh().finally(() => setAttemptedLogin(true));
    }
  });

  const login = async (username: string, password: string) => {
    setError('');
    try {
      const response = await axios.post(
        _loginUrl,
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        setSuccess(true);
        const token = await refresh();
        if (token !== '') {
          router.push('/');
        }
      }
    } catch (err) {
      const error = err as AxiosError;
      if (!error?.response) {
        setError('Brak odpowiedzi serwera');
      } else if (error.response.status === 400) {
        setError('Niepoprawny login lub hasło');
      } else {
        setError('Kod błędu: ' + error.response.status);
      }
    }
  };

  if (!attemptedLogin) {
    return <></>;
  }
  if (user.token !== '' && !success) {
    return <Redirect to={'/'} />;
  }
  return <LoginForm login={login} loginError={error} />;
};

export default Login;
