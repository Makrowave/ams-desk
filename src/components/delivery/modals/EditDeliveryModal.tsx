'use client';
import { Button, Typography } from '@mui/material';
import useModal from '../../../hooks/useModal';
import { FaPencil } from 'react-icons/fa6';

const EditDeliveryModal = () => {
  const { Modal, setOpen } = useModal({
    button: (
      <Button variant="contained">
        <FaPencil />
        <Typography sx={{ ml: 1 }}>Edytuj</Typography>
      </Button>
    ),
    label: 'Edytuj dostawę',
  });

  const handleEdit = () => {
    //TODO
    setOpen(false);
  };

  return (
    <Modal>
      <Button variant="contained" onClick={handleEdit}>
        Zapisz
      </Button>
    </Modal>
  );
};

export default EditDeliveryModal;
