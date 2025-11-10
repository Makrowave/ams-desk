'use client';
import { Button, Typography } from '@mui/material';
import useModal from '../../../hooks/useModal';
import { FaPencil } from 'react-icons/fa6';
import FetchSelect from '../../filtering/FetchSelect';
import { useState } from 'react';
import URLS, { URLKEYS } from '../../../util/urls';
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Delivery } from '../../../types/deliveryTypes';

type EditDeliveryModalProps = {
  delivery: Delivery;
};

const EditDeliveryModal = ({ delivery }: EditDeliveryModalProps) => {
  const [place, setPlace] = useState<number>(delivery.placeId);
  const [invoice, setInvoice] = useState<number>(delivery.invoiceId);
  const [deliveryDate, setDeliveryDate] = useState<Dayjs>(
    dayjs(delivery.plannedArrivalDate),
  );
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.put(URLS.Delivery + delivery.id, {
        placeId: place,
        invoiceId: invoice,
        plannedArrivalDate: deliveryDate.toISOString(),
      });
      return result.data;
    },
    onSuccess: (updatedDelivery: Delivery) => {
      queryClient.setQueryData<Delivery>(
        [URLS.Delivery, delivery.id],
        updatedDelivery,
      );
      queryClient.invalidateQueries({ queryKey: [URLKEYS.Deliveries] });
      setOpen(false);
    },
  });

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

  const { Modal, setOpen } = useModal({
    button: (
      <Button variant="contained">
        <FaPencil />
        <Typography sx={{ ml: 1 }}>Edytuj</Typography>
      </Button>
    ),
    label: 'Edytuj dostawę',
  });

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
        params={{ invoiceId: delivery.invoiceId }}
        value={invoice}
        urlKey={URLKEYS.NotAssignedInvoice}
        onChange={setInvoice}
        validated
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
      <Button
        variant="contained"
        onClick={() => mutation.mutate()}
        loading={mutation.isPending}
        disabled={
          place === 0 || invoice === 0 || deliveryDate.isBefore(dayjs())
        }
      >
        Zapisz
      </Button>
    </Modal>
  );
};

export default EditDeliveryModal;
