import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Redirect = ({ to }: { to: string }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(to);
  }, [to, router]);
  return null;
};

export default Redirect;
