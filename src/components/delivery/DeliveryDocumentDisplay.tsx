'use client';
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import { Delivery, DeliveryDocument } from '../../types/deliveryTypes';
import DeliveryItemTable from './DeliveryItemTable';
import { Delete } from '@mui/icons-material';
import DateDisplay from '../DateDisplay';
import MaterialModal from '../modals/MaterialModal';
import DeleteModal from '../modals/DeleteModal';
import URLS from '../../util/urls';
import { useQueryClient } from '@tanstack/react-query';

const DeliveryDocumentDisplay = ({
  deliveryDocument,
  deliveryId,
  invalidDeliveryItems,
}: {
  deliveryDocument: DeliveryDocument;
  deliveryId: number;
  invalidDeliveryItems: number[] | null;
}) => {
  const queryClient = useQueryClient();
  const handleDelete = () => {
    queryClient.setQueryData(
      [URLS.Delivery, deliveryId],
      (oldData: Delivery) => {
        if (!oldData) return {};

        return {
          ...oldData,
          deliveryDocuments: oldData.deliveryDocuments
            ? oldData.deliveryDocuments.filter(
                (doc) => doc.id !== deliveryDocument.id,
              )
            : [],
        };
      },
    );
  };

  return (
    <Card>
      <Stack sx={{ p: 2, gap: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
          }}
        >
          <Typography>Dokument - {deliveryDocument.name}</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <DateDisplay date={deliveryDocument.date} />
            <MaterialModal
              label="Usuń dokument"
              button={
                <IconButton color="error">
                  <Delete />
                </IconButton>
              }
            >
              <DeleteModal
                id={deliveryDocument.id}
                refetchQueryKey=""
                url={URLS.DeliveryDocuments}
                onSuccess={handleDelete}
              />
            </MaterialModal>
          </Box>
        </Box>
        <DeliveryItemTable
          deliveryDocument={deliveryDocument}
          invalidDeliveryItems={invalidDeliveryItems}
        />
      </Stack>
    </Card>
  );
};

export default DeliveryDocumentDisplay;
