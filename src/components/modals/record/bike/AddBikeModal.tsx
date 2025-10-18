import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import ErrorDisplay from '../../../error/ErrorDisplay';
import URLS, { URLKEYS } from '../../../../util/urls';
import FetchSelect from '../../../filtering/FetchSelect';
import { Button } from '@mui/material';
import { ModalProps } from '../../types/modalTypes';

type AddBikeModalProps = {
  modelId: number;
} & ModalProps;

const AddBikeModal = ({ modelId, closeModal }: AddBikeModalProps) => {
  //Change it based on selected location
  const [place, setPlace] = useState(0);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.post(
        URLS.Bikes2,
        JSON.stringify({
          modelId: modelId,
          placeId: place,
          statusId: status,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [URLS.Models],
        exact: false,
      });
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

  function validate() {
    let result = place !== 0 && status !== 0;
    if (!result) setError('Nie wybrano wszystkich pól');
    return result;
  }

  return (
    <>
      <ErrorDisplay message={error} isVisible={error !== ''} />
      <FetchSelect
        value={place}
        onChange={setPlace}
        urlKey={URLKEYS.Places}
        label="Miejsce"
        defaultValue={0}
        validated
      />
      <FetchSelect
        value={status}
        onChange={setStatus}
        params={{ exclude: [3] }}
        urlKey={URLKEYS.ExcludedStatuses}
        label="Status"
        defaultValue={0}
        validated
      />
      <Button
        color={'primary'}
        variant={'contained'}
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Dodaj
      </Button>
    </>
  );
};

export default AddBikeModal;
