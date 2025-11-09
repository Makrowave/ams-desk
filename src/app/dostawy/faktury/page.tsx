'use client';
import { Paper, Stack, Typography } from '@mui/material';
import InvoicesTable from '../../../components/invoices/InvoicesTable';

const Invoices = () => {
  return (
    <Paper>
      <Stack sx={{ p: 4, gap: 4 }}>
        <Typography variant="h4" component={'h2'}>
          Faktury
        </Typography>
        <InvoicesTable />
      </Stack>
    </Paper>
  );
};

export default Invoices;
