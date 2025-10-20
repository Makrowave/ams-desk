import useAxiosAdmin from '../../../hooks/useAxiosAdmin';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import URLS from '../../../util/urls';
import { Button, Typography } from '@mui/material';

const LogoutModal = ({
  id,
  closeModal,
}: {
  id?: number;
  closeModal?: () => void;
}) => {
  const url = URLS.Users + 'Logout' + (id ? '/' + id : '');
  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosAdmin.post(
        url,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [URLS.Users],
        exact: false,
      });
      if (closeModal) closeModal();
    },
  });

  return (
    <>
      <Typography variant={'h6'}>Czy na pewno?</Typography>
      <Button
        variant={'contained'}
        color={'error'}
        onClick={() => mutation.mutate()}
      >
        Wyloguj
      </Button>
    </>
  );
};

export default LogoutModal;
