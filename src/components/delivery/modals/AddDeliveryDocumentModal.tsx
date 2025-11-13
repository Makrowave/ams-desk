import { Add } from '@mui/icons-material';
import { Button, TextField, Tooltip } from '@mui/material';
import useModal from '../../../hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import URLS from '../../../util/urls';
import { useState } from 'react';
import {
  Delivery,
  DeliveryDocument,
  DeliveryItem,
  DeliveryStatus,
} from '../../../types/deliveryTypes';

const AddDeliveryDocumentModal = ({ delivery }: { delivery: Delivery }) => {
  const [name, setName] = useState<string>('');

  const { Modal, setOpen } = useModal({
    button: (
      <Tooltip title="Dodaj dokument dostawy">
        <Button
          variant="contained"
          startIcon={<Add />}
          disabled={delivery.status !== DeliveryStatus.InProgress}
        >
          Dodaj
        </Button>
      </Tooltip>
    ),
    label: 'Dodaj dokument dostawy',
  });

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation<DeliveryDocument>({
    mutationFn: async () => {
      const result = await axiosPrivate.post(URLS.DeliveryDocuments, {
        deliveryId: delivery.id,
        name: name,
      });
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        [URLS.Delivery, delivery.id],
        (oldData: Delivery) => {
          if (!oldData) return {};
          return {
            ...oldData,
            deliveryDocuments: oldData.deliveryDocuments
              ? [...oldData.deliveryDocuments, data]
              : [data],
          };
        },
      );
      setOpen(false);
      setName('');
    },
  });

  return (
    <Modal>
      <TextField
        label="Nazwa dokumentu"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={name === ''}
        helperText={name === '' ? 'Nazwa jest wymagana' : ''}
      />
      <Button
        variant="contained"
        onClick={() => mutation.mutate()}
        disabled={name === ''}
      >
        Dodaj
      </Button>
    </Modal>
  );
};

export default AddDeliveryDocumentModal;
