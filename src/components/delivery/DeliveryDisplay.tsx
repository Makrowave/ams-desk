'use client';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { Delivery, DeliveryStatus, Invoice } from '../../types/deliveryTypes';
import DeliverySummary from './DeliverySummary';
import InvoiceSummary from './InvoiceSummary';
import DeliveryDocumentDisplay from './DeliveryDocumentDisplay';
import {
  getDeliveryStatusColor,
  getDeliveryStatusText,
  validateTemporaryModels,
} from '../../util/deliveryHelpers';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import URLS, { URLKEYS } from '../../util/urls';
import AddDeliveryDocumentModal from './modals/AddDeliveryDocumentModal';
import { useState } from 'react';

const DeliveryDisplay = ({ delivery }: { delivery: Delivery }) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const [invalidDeliveryItems, setInvalidDeliveryItems] = useState<
    number[] | null
  >(null);

  const statusChangeMutation = useMutation({
    mutationFn: async ({
      id,
      action,
    }: {
      id: number;
      action: 'start' | 'cancel' | 'finish';
    }) => {
      let url = '';
      switch (action) {
        case 'start':
          url = URLS.StartDelivery;
          break;
        case 'cancel':
          url = URLS.CancelDelivery;
          break;
        case 'finish':
          url = URLS.FinishDelivery;
          break;
      }

      const response = await axiosPrivate.post(url + `${id}`);
      return response.data;
    },

    onSuccess: (data: Delivery) => {
      queryClient.setQueryData<Delivery>(
        [URLS.Delivery, data.id],
        (oldData) => {
          if (!oldData) return data;
          return { ...oldData, status: data.status };
        },
      );

      //For cancel
      if (data.status === DeliveryStatus.Cancelled)
        queryClient.invalidateQueries({ queryKey: [URLS.Invoices] });
    },
  });

  const handleStart = () => {
    statusChangeMutation.mutate({ id: delivery.id, action: 'start' });
  };

  const handleCancel = () => {
    statusChangeMutation.mutate({ id: delivery.id, action: 'cancel' });
  };

  const handleFinish = () => {
    const validationResult = validateTemporaryModels(delivery);
    setInvalidDeliveryItems(validationResult);

    console.log(validationResult);

    if (validationResult.length > 0) {
      return;
    }

    statusChangeMutation.mutate({ id: delivery.id, action: 'finish' });
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
          <AddDeliveryDocumentModal delivery={delivery} key={delivery.status} />
        </Box>
        {delivery.deliveryDocuments &&
          delivery.deliveryDocuments.map((document) => (
            <DeliveryDocumentDisplay
              key={document.id}
              deliveryId={delivery.id}
              deliveryDocument={document}
              invalidDeliveryItems={invalidDeliveryItems}
            />
          ))}
      </Stack>
    </Paper>
  );
};

export default DeliveryDisplay;
