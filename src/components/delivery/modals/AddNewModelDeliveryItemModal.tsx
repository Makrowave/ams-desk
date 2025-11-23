import { Add } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import useModal from '../../../hooks/useModal';
import { useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import URLS from '../../../util/urls';
import {
  Delivery,
  DeliveryDocument,
  DeliveryItem,
} from '../../../types/deliveryTypes';
import ErrorDisplay from '../../error/ErrorDisplay';
import { AxiosError } from 'axios';

const AddNewModelDeliveryItemModal = ({
  deliveryDocument,
}: {
  deliveryDocument: DeliveryDocument;
}) => {
  const [ean, setEan] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { Modal, setOpen } = useModal({
    button: (
      <Button startIcon={<Add />} variant="contained" color="warning">
        Dodaj nowy model
      </Button>
    ),
    label: 'Dodaj nowy model',
  });

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.post<DeliveryItem>(
        URLS.DeliveryItems,
        {
          ean,
          deliveryDocumentId: deliveryDocument.id,
        },
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Delivery>(
        [URLS.Delivery, deliveryDocument.deliveryId],
        (oldData) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            deliveryDocuments: oldData.deliveryDocuments.map((doc) =>
              doc.id === deliveryDocument.id
                ? {
                    ...doc,
                    deliveryItems: doc.deliveryItems
                      ? [...doc.deliveryItems, data]
                      : [data],
                  }
                : doc,
            ),
          } satisfies Delivery;
        },
      );
      setOpen(false);
      setEan('');
      setError('');
    },
    onError: (err: AxiosError) => {
      switch (err.response?.status) {
        case 409:
          setError(
            'Model o podanym EAN już istnieje w dostawie. Dodaj go z listy modeli.',
          );
          break;
        case 401:
          setError('');
          break;
        default:
          if ((err.response?.status ?? 0) >= 400) {
            setError('Wystąpił błąd podczas dodawania modelu.');
          } else {
            setError('Brak połączenia z serwerem.');
          }
      }
    },
  });

  return (
    <Modal>
      <ErrorDisplay message={error} isVisible={!!error} />
      <TextField
        value={ean}
        onChange={(e) => setEan(e.target.value)}
        label="EAN"
        error={ean.length !== 13 || isNaN(Number(ean))}
        helperText={
          ean.length !== 13 || isNaN(Number(ean))
            ? 'EAN musi składać się z 13 cyfr'
            : ''
        }
      />

      <Button
        variant="contained"
        onClick={() => mutation.mutate()}
        disabled={ean.length !== 13 || isNaN(Number(ean))}
      >
        Dodaj nowy model
      </Button>
    </Modal>
  );
};
export default AddNewModelDeliveryItemModal;
