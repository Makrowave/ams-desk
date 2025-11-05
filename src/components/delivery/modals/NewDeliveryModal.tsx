'use client';
import { Button, IconButton, Tooltip } from '@mui/material';
import Add from '@mui/icons-material/add';
import { useRouter } from 'next/navigation';
import useModal from '../../../hooks/useModal';

const NewDeliveryModal = () => {
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
      <Button variant="contained" onClick={handleAdd}>
        Dodaj
      </Button>
    </Modal>
  );
};

export default NewDeliveryModal;
