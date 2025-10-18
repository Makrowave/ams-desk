import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import ErrorDisplay from '../../../error/ErrorDisplay';
import URLS, { URLKEYS } from '../../../../util/urls';
import FetchSelect from '../../../filtering/FetchSelect';
import { Button } from '@mui/material';
import { BikeModalProps } from '../../types/modalTypes';

const StatusModal = ({ bikeId, closeModal }: BikeModalProps) => {
  const [status, setStatus] = useState(0);
  const [error, setError] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        URLS.Bikes2 + bikeId,
        JSON.stringify({
          statusId: status.toString(),
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
        value={status}
        onChange={setStatus}
        urlKey={URLKEYS.ExcludedStatuses}
        params={{ exclude: [3] }}
        defaultValue={0}
        label="Status"
        validated
      />

      <Button
        variant="contained"
        className="mb-2"
        onClick={() => mutation.mutate()}
        disabled={status === 0}
      >
        Zmień status
      </Button>
    </>
  );
};

export default StatusModal;
