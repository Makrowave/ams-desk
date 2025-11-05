'use client';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { Delivery, DeliveryStatus } from '../../types/deliveryTypes';
import DeliverySummary from './DeliverySummary';
import InvoiceSummary from './InvoiceSummary';
import DeliveryDocumentDisplay from './DeliveryDocumentDisplay';
import {
  getDeliveryStatusColor,
  getDeliveryStatusText,
} from '../../util/deliveryHelpers';

const DeliveryDisplay = ({ delivery }: { delivery: Delivery }) => {
  const handleStart = () => {
    // TODO
  };

  const handleCancel = () => {
    // TODO
  };

  const handleFinish = () => {
    // TODO
  };

  const handleDocumentAdd = () => {
    // TODO
  };

  return (
    <Paper>
      <Stack sx={{ p: 4, gap: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Typography variant="h4" component={'h2'}>
              Dostawa #{delivery.id}
            </Typography>
            <Box
              sx={{
                py: 1,
                px: 2,
                bgcolor: getDeliveryStatusColor(delivery.status),
                borderRadius: 1,
              }}
            >
              <Typography variant="body1" sx={{ color: 'white' }}>
                {getDeliveryStatusText(delivery.status)}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {delivery.status !== DeliveryStatus.Cancelled && (
              <>
                {delivery.status === DeliveryStatus.Pending && (
                  <Button
                    onClick={handleStart}
                    variant="contained"
                    color="success"
                  >
                    Rozpocznij
                  </Button>
                )}
                {delivery.status === DeliveryStatus.InProgress && (
                  <Button
                    onClick={handleFinish}
                    variant="contained"
                    color="warning"
                  >
                    Zakończ
                  </Button>
                )}
                <Button
                  onClick={handleCancel}
                  variant="contained"
                  color="error"
                >
                  Anuluj
                </Button>
              </>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <DeliverySummary delivery={delivery} />
          {delivery.invoice && <InvoiceSummary invoice={delivery.invoice} />}
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" component={'h3'} sx={{ mb: 2 }}>
            Dokumenty dostawy
          </Typography>
          <Button variant="contained" onClick={handleDocumentAdd}>
            Dodaj
          </Button>
        </Box>
        {delivery.deliveryDocuments &&
          delivery.deliveryDocuments.map((document) => (
            <DeliveryDocumentDisplay
              key={document.id}
              deliveryDocument={document}
            />
          ))}
      </Stack>
    </Paper>
  );
};

export default DeliveryDisplay;
