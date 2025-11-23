import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import useModal from '../../../hooks/useModal';
import Filters, { defaultFilters } from '../../table/modelTable/Filters';
import { useState } from 'react';
import DeliveryModelTable from '../DeliveryModelTable';
import {
  Delivery,
  DeliveryDocument,
  DeliveryItem,
} from '../../../types/deliveryTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import URLS from '../../../util/urls';

const AddModelDeliveryItemModal = ({
  deliveryDocument,
}: {
  deliveryDocument: DeliveryDocument;
}) => {
  const [query, setQuery] = useState({ ...defaultFilters });

  const { Modal, setOpen } = useModal({
    button: (
      <Button variant="contained">
        <Add sx={{ mr: 2 }} />
        Dodaj model
      </Button>
    ),
    label: 'Dodaj nowy model',
  });

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (modelId: number) => {
      const response = await axiosPrivate.post<DeliveryItem>(
        URLS.DeliveryItems,
        {
          modelId,
          deliveryDocumentId: deliveryDocument.id,
        },
      );

      console.log(response.data);

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
    },
  });

  const handleAdd = (id: number) => {
    mutation.mutate(id);
  };

  return (
    <Modal>
      <Box sx={{ display: 'flex', maxHeight: '80vh', gap: 2 }}>
        <Filters setQuery={setQuery} place={0} setPlace={() => {}} />
        <DeliveryModelTable filters={query} handleAddToDelivery={handleAdd} />
      </Box>
    </Modal>
  );
};
export default AddModelDeliveryItemModal;
