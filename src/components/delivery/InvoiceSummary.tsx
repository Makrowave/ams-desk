'use client';
import { Card, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Invoice } from '../../types/deliveryTypes';

const InvoiceSummary = ({ invoice }: { invoice: Invoice }) => {
  return (
    <Card
      sx={{
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
      }}
    >
      <Typography variant="h6">Faktura</Typography>
      <List sx={{ width: '100%' }}>
        <ListItem>
          <ListItemText
            primary="Numer faktury"
            secondary={invoice.invoiceNumber}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Data wystawienia"
            secondary={invoice.issueDate?.toLocaleDateString()}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Termin płatności"
            secondary={invoice.paymentDate?.toLocaleDateString()}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Wystawca" secondary={invoice.issuerName} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Adres wystawcy"
            secondary={invoice.issuerAddress}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Kwota netto"
            secondary={invoice.nettoAmount.toFixed(2)}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Kwota brutto"
            secondary={invoice.bruttoAmount.toFixed(2)}
          />
        </ListItem>
      </List>
    </Card>
  );
};

export default InvoiceSummary;
