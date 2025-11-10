'use client';

import { Box, Paper, Skeleton, Stack, Typography } from '@mui/material';
import InvoiceDisplay from '../../../../components/invoices/InvoiceDisplay';
import { useInvoiceQuery } from '../../../../hooks/queryHooks';
import { Invoice as InvoiceType } from '../../../../types/deliveryTypes';

const Invoice = ({ params }: { params: { id: string } }) => {
  const { data, isLoading, error } = useInvoiceQuery<InvoiceType>({
    id: parseInt(params.id, 10),
  });

  if (isLoading) {
    return (
      <Paper component={Stack} sx={{ flex: 1, p: 2 }}>
        <Box>
          <Skeleton variant="text" height={40} width={200} />
        </Box>
      </Paper>
    );
  }

  if (error || !data) {
    return (
      <Paper>
        <Stack>
          <Typography>Wystąpił błąd</Typography>
        </Stack>
      </Paper>
    );
  }

  return <InvoiceDisplay invoice={data} />;
};

export default Invoice;
