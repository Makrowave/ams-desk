import ColorInput from '../../../input/ColorInput';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import URLS, { URLKEYS } from '../../../../util/urls';
import FetchSelect from '../../../filtering/FetchSelect';
import { Button } from '@mui/material';
import ErrorDisplay from '../../../error/ErrorDisplay';
import { ModelModalProps } from '../../types/modalTypes';
import { ModelRecord } from '../../../../app/types/bikeTypes';

const ColorModal = ({ model, closeModal }: ModelModalProps) => {
  const [primaryColor, setPrimaryColor] = useState(
    !!model.primaryColor ? model.primaryColor : '#FF00FF',
  );
  const [secondaryColor, setSecondaryColor] = useState(
    !!model.secondaryColor ? model.secondaryColor : '#000000',
  );
  const [color, setColor] = useState(model.colorId);
  const [error, setError] = useState('');
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.put(
        URLS.Models + model.modelId,
        JSON.stringify({
          ...model,
          colorId: color,
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
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
                m.modelId === data.modelId
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
      <ErrorDisplay message={error} isVisible={error !== ''} />
      <ColorInput
        title="Kolor główny"
        value={primaryColor}
        setValue={setPrimaryColor}
      />
      <ColorInput
        title="Kolor dodatkowy"
        value={secondaryColor}
        setValue={setSecondaryColor}
      />
      <FetchSelect
        value={color ?? 0}
        onChange={setColor}
        urlKey={URLKEYS.Colors}
        defaultValue={0}
        label="Kolor"
        validated
      />
      <Button
        variant="contained"
        color="primary"
        disabled={color === 0}
        onClick={() => {
          if (color !== 0) mutation.mutate();
        }}
      >
        Zmień kolor
      </Button>
    </>
  );
};

export default ColorModal;
