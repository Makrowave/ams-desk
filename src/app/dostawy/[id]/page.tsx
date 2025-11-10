'use client';
import { Paper, Stack, Skeleton, Typography, Box } from '@mui/material';
import DeliveryDisplay from '../../../components/delivery/DeliveryDisplay';
import { Delivery } from '../../../types/deliveryTypes';
import { useDeliveryQuery } from '../../../hooks/queryHooks';

const DeliveryPage = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, error } = useDeliveryQuery<Delivery>({
    id: parseInt(params.id, 10),
  });

  if (isLoading) {
    return (
      <Paper component={Stack} sx={{ flex: 1, p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton variant="text" height={80} width={600} />
          <Box sx={{ display: 'flex', gap: 10, height: 600 }}>
            <Skeleton variant="rectangular" sx={{ height: '100%', flex: 1 }} />
            <Skeleton variant="rectangular" sx={{ height: '100%', flex: 1 }} />
          </Box>
        </Box>
      </Paper>
    );
  }

  if (error || !data) {
    return (
      <Paper component={Stack} sx={{ flex: 1, p: 2 }}>
        <Typography>Wystąpił błąd</Typography>
      </Paper>
    );
  }

  return <DeliveryDisplay delivery={data} />;
};

export default DeliveryPage;
