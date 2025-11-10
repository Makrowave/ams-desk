import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Invoice } from '../../types/deliveryTypes';
import DeleteModal from '../modals/DeleteModal';
import URLS, { URLKEYS } from '../../util/urls';
import MaterialModal from '../modals/MaterialModal';
import { Delete } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const InvoiceDisplay = ({ invoice }: { invoice: Invoice }) => {
  const router = useRouter();

  return (
    <Paper>
      <Stack sx={{ p: 4, gap: 4 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4" component={'h2'}>
            Faktura: {invoice.invoiceNumber}
          </Typography>
          <MaterialModal
            button={
              <IconButton color="error">
                <Delete />
              </IconButton>
            }
            label="Usuń fakturę"
          >
            <DeleteModal
              id={invoice.id}
              url={URLS.Invoice}
              refetchQueryKey={URLKEYS.Invoice}
              onSuccess={() => router.back()}
            />
          </MaterialModal>
        </Box>
        <Typography variant="body1">
          Data wystawienia: {invoice.issueDate}
        </Typography>
        <Typography variant="body1">
          Data płatności: {invoice.paymentDate}
        </Typography>
        <Typography variant="body1">Nabywca: {invoice.issuerName}</Typography>
        <Typography variant="body1">
          Adres nabywcy: {invoice.issuerAddress}
        </Typography>
        <Typography variant="body1">
          Kwota netto: {invoice.nettoAmount} PLN
        </Typography>
        <Typography variant="body1">
          Kwota brutto: {invoice.bruttoAmount} PLN
        </Typography>
      </Stack>
    </Paper>
  );
};

export default InvoiceDisplay;
