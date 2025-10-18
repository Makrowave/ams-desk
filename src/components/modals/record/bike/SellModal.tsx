import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ErrorDisplay from '../../../error/ErrorDisplay';
import { REGEX } from '../../../../util/regex';
import URLS from '../../../../util/urls';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import ValidatedTextField from '../../../input/ValidatedTextField';
import { BikeModalProps } from '../../types/modalTypes';
import { BikeRecord, ModelRecord } from '../../../../app/types/bikeTypes';

type SellModalProps = {
  basePrice: number;
  placeId: number;
} & BikeModalProps;

const SellModal = ({
  bikeId,
  basePrice,
  placeId,
  closeModal,
}: SellModalProps) => {
  //Change it based on selected location
  const [price, setPrice] = useState<number | undefined>(basePrice);
  const [internetSale, setInternetSale] = useState(false);
  const [error, setError] = useState('');
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      console.log(
        `${URLS.Bikes2}sell/${bikeId}?price=${price}&internet=${internetSale}`,
      );
      console.log(price);
      const response = await axiosPrivate.put(
        `${URLS.Bikes2}sell/${bikeId}?price=${price}&internet=${internetSale}`,
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueriesData<ModelRecord[]>(
        { queryKey: [URLS.Models], exact: false },
        (oldData) => {
          if (!oldData) {
            console.log('sell - oldData undefined');
            return [];
          }
          return oldData.map((model) => {
            return model.modelId === data.modelId
              ? {
                  ...model,
                  bikeCount: model.bikeCount - 1,
                  placeBikeCount: model.placeBikeCount.map((place) =>
                    place.placeId === data.placeId
                      ? {
                          ...place,
                          count: place.count - 1,
                          isAvailable:
                            place.isAvailable && place.count - 1 === 0,
                        }
                      : place,
                  ),
                }
              : model;
          });
        },
      );
      console.log([URLS.Bikes, data.modelId, placeId]);
      queryClient.setQueryData<BikeRecord[]>(
        [URLS.Bikes, data.modelId, placeId],
        (oldData) => {
          if (!oldData) {
            console.log('sell - oldData undefined');
            return [];
          }
          return oldData.filter((bike) => bike.id !== bikeId);
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
      <ValidatedTextField
        label="Cena"
        value={price}
        type="number"
        onChange={(v) => setPrice(v)}
        regex={REGEX.PRICE}
      />
      <FormControlLabel
        control={<Checkbox />}
        onChange={() => setInternetSale(!internetSale)}
        checked={internetSale}
        label="Sprzedaż przez internet"
      />
      <Button
        variant="contained"
        className="mb-2"
        onClick={() => mutation.mutate()}
        disabled={!REGEX.PRICE.test(price?.toString() || '')}
      >
        Sprzedaj
      </Button>
    </>
  );
};

export default SellModal;
