'use client';
import { Button, IconButton, Tooltip } from '@mui/material';
import Add from '@mui/icons-material/add';
import { useRouter } from 'next/navigation';
import useModal from '../../../hooks/useModal';
import FetchSelect from '../../filtering/FetchSelect';
import { useState } from 'react';
import URLS, { URLKEYS } from '../../../util/urls';
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { SelectOption } from '../../../types/selectTypes';

const NewDeliveryModal = () => {
  const [place, setPlace] = useState<number>(0);
  const [invoice, setInvoice] = useState<number>(0);
  const [deliveryDate, setDeliveryDate] = useState<Dayjs>(dayjs());
  const axiosPrivate = useAxiosPrivate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.post(URLS.NewDelivery, {
        placeId: place,
        invoiceId: invoice,
        expectedDeliveryDate: deliveryDate.toISOString(),
      });
      return result.data.id;
    },
    onSuccess: (deliveryId: number) => {
      queryClient.setQueryData<SelectOption[]>(
        [URLS.NotAssignedInvoice],
        (oldData) => {
          if (!oldData) return [];
          return oldData.filter((inv) => inv.id !== invoice);
        },
      );
      router.push(`/dostawy/${deliveryId}`);
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
        Dodaj
      </Button>
    </Modal>
  );
};

export default NewDeliveryModal;
