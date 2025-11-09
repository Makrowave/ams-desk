import { Add } from '@mui/icons-material';
import { Tooltip, IconButton, Button, TextField } from '@mui/material';
import useModal from '../../../hooks/useModal';
import { useState } from 'react';
import { Invoice } from '../../../types/deliveryTypes';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const NewInvoiceModal = () => {
  const [invoice, setInvoice] = useState<Partial<Invoice>>({
    invoiceNumber: '',
    issuerName: '',
    issuerAddress: '',
  });

  const handleChange = (key: keyof Invoice, value: Invoice[keyof Invoice]) => {
    setInvoice((prev) => ({ ...prev, [key]: value }));
  };

  const { Modal, setOpen } = useModal({
    button: (
      <Tooltip title="Nowa faktura">
        <IconButton color="primary">
          <Add />
        </IconButton>
      </Tooltip>
    ),
    label: 'Nowa dostawa',
  });

  const router = useRouter();

  const handleAdd = () => {
    //TODO
    router.push(`/dostawy/faktury/1`);
  };

  return (
    <Modal>
      <TextField
        label="Numer faktury"
        value={invoice.invoiceNumber}
        onChange={(e) => handleChange('invoiceNumber', e.target.value)}
        error={!invoice.invoiceNumber}
      />
      <DatePicker
        label="Data wystawienia"
        value={dayjs(invoice.issueDate)}
        onChange={(newValue) => handleChange('issueDate', newValue?.toDate())}
      />
      <DatePicker
        label="Data płatności"
        value={dayjs(invoice.issueDate)}
        onChange={(newValue) => handleChange('paymentDate', newValue?.toDate())}
      />
      <TextField
        label="Wystawca"
        value={invoice.issuerName}
        onChange={(e) => handleChange('issuerName', e.target.value)}
        error={!invoice.issuerName}
      />
      <TextField
        label="Adres wystawcy"
        value={invoice.issuerAddress}
        onChange={(e) => handleChange('issuerAddress', e.target.value)}
        error={!invoice.issuerAddress}
      />
      <TextField
        label="Kwota netto"
        type="number"
        value={invoice.nettoAmount}
        onChange={(e) => handleChange('nettoAmount', Number(e.target.value))}
        error={invoice.nettoAmount === undefined || invoice.nettoAmount < 0}
      />
      <TextField
        label="Kwota brutto"
        type="number"
        value={invoice.bruttoAmount}
        onChange={(e) => handleChange('bruttoAmount', Number(e.target.value))}
        error={
          invoice.bruttoAmount === undefined ||
          invoice.bruttoAmount < 0 ||
          (invoice.nettoAmount !== undefined &&
            invoice.bruttoAmount < invoice.nettoAmount)
        }
      />
      <Button variant="contained" onClick={handleAdd}>
        Dodaj
      </Button>
    </Modal>
  );
};

export default NewInvoiceModal;
