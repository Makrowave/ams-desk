import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import useModal from '../../../hooks/useModal';

const AddModelDeliveryItemModal = () => {
  const { Modal, setOpen } = useModal({
    button: (
      <Button variant="contained">
        <Add sx={{ mr: 2 }} />
        Dodaj model
      </Button>
    ),
    label: 'Dodaj nowy model',
  });

  const handleAdd = () => {
    //TODO
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
export default AddModelDeliveryItemModal;
