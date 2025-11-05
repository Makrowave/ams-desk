'use client';
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import { DeliveryDocument } from '../../types/deliveryTypes';
import DeliveryItemTable from './DeliveryItemTable';
import { Delete } from '@mui/icons-material';

const DeliveryDocumentDisplay = ({
  deliveryDocument,
}: {
  deliveryDocument: DeliveryDocument;
}) => {
  const handleDelete = () => {
    //TODO
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
            <Typography>
              {deliveryDocument.date.toLocaleDateString()}
            </Typography>
            <IconButton color="error" onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
        <DeliveryItemTable data={deliveryDocument.items ?? []} />
      </Stack>
    </Card>
  );
};

export default DeliveryDocumentDisplay;
