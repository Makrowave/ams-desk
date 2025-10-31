import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import ErrorDisplay from '../../../error/ErrorDisplay';
import URLS, { URLKEYS } from '../../../../util/urls';
import FetchSelect from '../../../filtering/FetchSelect';
import { Button } from '@mui/material';
import { BikeModalProps } from '../../types/modalTypes';

const MoveModal = ({ bikeId, closeModal }: BikeModalProps) => {
  const [place, setPlace] = useState(0);
  const [error, setError] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        URLS.Bikes2 + bikeId,
        JSON.stringify({
          placeId: place,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [URLS.Bikes],
        exact: false,
      });
      if (closeModal) closeModal();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <>
      <ErrorDisplay message={error} isVisible={error !== ''} />
      <FetchSelect
        value={place}
        onChange={setPlace}
        urlKey={URLKEYS.Places}
        defaultValue={0}
        label="Dokąd"
        validated
      />
      <Button
        variant={'contained'}
        color={'primary'}
        onClick={() => mutation.mutate()}
        disabled={place === 0}
      >
        Przenieś
      </Button>
    </>
  );
};

export default MoveModal;
