import { Paper, Stack, Typography } from '@mui/material';
import { Invoice } from '../../types/deliveryTypes';

const InvoiceDisplay = ({ invoice }: { invoice: Invoice }) => {
  return (
    <Paper>
      <Stack sx={{ p: 4, gap: 4 }}>
        <Typography variant="h4" component={'h2'}>
          Faktura: {invoice.invoiceNumber}
        </Typography>
        <Typography variant="body1">
          Data wystawienia: {invoice.issueDate.toLocaleDateString()}
        </Typography>
        <Typography variant="body1">
          Data płatności: {invoice.paymentDate.toLocaleDateString()}
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
