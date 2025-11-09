'use client';
import { Button, IconButton, Tooltip } from '@mui/material';
import Add from '@mui/icons-material/add';
import { useRouter } from 'next/navigation';
import useModal from '../../../hooks/useModal';
import FetchSelect from '../../filtering/FetchSelect';
import { useState } from 'react';
import { URLKEYS } from '../../../util/urls';
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

const NewDeliveryModal = () => {
  const [place, setPlace] = useState<number>(0);
  const [invoice, setInvoice] = useState<number>(0);
  const [deliveryDate, setDeliveryDate] = useState<Dayjs>(dayjs());

  const setTime = (dayjs: Dayjs | null) => {
    let date: Dayjs = deliveryDate.clone();
    date = date.set('hour', dayjs?.hour() || 0);
    date = date.set('minute', dayjs?.minute() || 0);
    setDeliveryDate(date);
  };

  const setDay = (dayjs: Dayjs | null) => {
    let date: Dayjs = deliveryDate.clone();
    date = date.set('date', dayjs?.date() || 0);
    date = date.set('year', dayjs?.year() || 0);
    setDeliveryDate(date);
  };

  const router = useRouter();
  const { Modal, setOpen } = useModal({
    button: (
      <Tooltip title="Nowa dostawa" color="success">
        <IconButton>
          <Add />
        </IconButton>
      </Tooltip>
    ),
    label: 'Nowa dostawa',
  });

  const handleAdd = () => {
    const result = 1;
    router.push(`/dostawy/${result}`);
    setOpen(false);
  };

  return (
    <Modal>
      <FetchSelect
        defaultValue={0}
        label="Miejsce dostawy"
        value={place}
        urlKey={URLKEYS.Places}
        onChange={setPlace}
        validated={true}
      />
      <FetchSelect
        defaultValue={0}
        label="Faktura"
        value={invoice}
        urlKey={URLKEYS.NotAssignedInvoice}
        onChange={setInvoice}
        validated={true}
      />
      <DatePicker
        label="Oczekiwana data dostawy"
        minDate={dayjs()}
        value={deliveryDate}
        onChange={setDay}
      />
      <MobileTimePicker
        label="Oczekiwana godzina dostawy"
        value={deliveryDate}
        minTime={deliveryDate.isAfter(dayjs()) ? undefined : dayjs()}
        onChange={setTime}
      />
      <Button variant="contained" onClick={handleAdd}>
        Dodaj
      </Button>
    </Modal>
  );
};

export default NewDeliveryModal;
