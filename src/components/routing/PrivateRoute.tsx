'use client';
import useAuth from '../../hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useRefreshUser from '../../hooks/useRefreshUser';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, setPrevRoute } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const refreshUser = useRefreshUser();
  const [failedLogin, setFailedLogin] = useState(false);

  useEffect(() => {
    if (failedLogin) {
      setPrevRoute(pathname);
      router.push('/login');
      return;
    }
    if (user.token === '') {
      refreshUser()
        .then((response) => {
          if (!response) {
            setFailedLogin(true);
          }
        })
        .catch(() => {
          setFailedLogin(true);
        });
    }
  }, [user]);

  if (!user.token) {
    return null;
  }
  return <>{children}</>;
};

export default PrivateRoute;
