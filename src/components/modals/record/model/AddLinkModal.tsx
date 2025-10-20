import ErrorDisplay from '../../../error/ErrorDisplay';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import URLS from '../../../../util/urls';
import ValidatedTextField from '../../../input/ValidatedTextField';
import { REGEX } from '../../../../util/regex';
import { Button } from '@mui/material';
import { ModelModalProps } from '../../types/modalTypes';
import { ModelRecord } from '../../../../app/types/bikeTypes';

const AddLinkModal = ({ model, closeModal }: ModelModalProps) => {
  const [link, setLink] = useState<string>();
  const [error, setError] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.put(
        URLS.Models + model.id,
        JSON.stringify({
          ...model,
          link,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueriesData<ModelRecord[]>(
        {
          queryKey: [URLS.Models],
          exact: false,
        },
        (oldData) => {
          return oldData
            ? oldData.map((m) =>
                m.id === data.modelId
                  ? {
                      ...data,
                      bikeCount: m.bikeCount,
                      placeBikeCount: m.placeBikeCount,
                    }
                  : m,
              )
            : oldData;
        },
      );
      if (closeModal) closeModal();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <>
      <ErrorDisplay message={error} isVisible={!!error} />
      <ValidatedTextField
        label="Link"
        value={link}
        onChange={(v) => setLink(v)}
        regex={REGEX.LINK}
      />
      <Button
        onClick={() => mutation.mutate()}
        variant="contained"
        color="primary"
        disabled={!REGEX.LINK.test(link ?? '')}
      >
        Zmień link
      </Button>
    </>
  );
};

export default AddLinkModal;
