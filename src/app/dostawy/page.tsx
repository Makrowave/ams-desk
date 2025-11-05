'use client';
import { Paper, Stack, Typography } from '@mui/material';
import DeliverySummaryTable from '../../components/delivery/DeliverySummaryTable';

const DeliveryPage = () => {
  return (
    <Paper>
      <Stack sx={{ p: 4, gap: 4 }}>
        <Typography variant="h4" component={'h2'}>
          Dostawy
        </Typography>
        <DeliverySummaryTable />
      </Stack>
    </Paper>
  );
};

export default DeliveryPage;
