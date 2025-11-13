import useAxiosAdmin from '../../hooks/useAxiosAdmin';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ErrorDisplay from '../error/ErrorDisplay';
import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { AxiosError } from 'axios';

type DeleteModalProps = {
  refetchQueryKey: string;
  id: number | string;
  url: string;
  admin?: boolean;
  closeModal?: () => void;
  onSuccess?: (data?: any) => void;
};

const DeleteModal = ({
  refetchQueryKey,
  id,
  url,
  admin = false,
  closeModal,
  onSuccess,
}: DeleteModalProps) => {
  const axios = admin ? useAxiosAdmin() : useAxiosPrivate();
  const queryClient = useQueryClient();
  const [error, setError] = useState('');
  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.delete(`${url}${id}`);
    },
    //TODO stronger typing
    onSuccess: (data) => {
      queryClient.setQueriesData<Array<object>>(
        { queryKey: [refetchQueryKey], exact: false },
        (oldData) => oldData?.filter((item) => Object.values(item)[0] !== id),
      );
      onSuccess && onSuccess(data);
      if (closeModal) closeModal();
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (axiosError.status === 500) {
        setError('Dany przedmiot jest do czegoś przypisany');
      } else {
        setError(error.message);
      }
    },
  });

  return (
    <>
      <ErrorDisplay message={error} isVisible={error !== ''} />
      <Typography variant={'h6'}>Czy na pewno?</Typography>
      <Button
        variant="contained"
        color={'error'}
        onClick={() => {
          mutation.mutate();
        }}
      >
        Usuń
      </Button>
    </>
  );
};

export default DeleteModal;
