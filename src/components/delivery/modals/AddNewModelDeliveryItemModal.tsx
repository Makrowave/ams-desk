import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import useModal from '../../../hooks/useModal';

const AddNewModelDeliveryItemModal = () => {
  const { Modal, setOpen } = useModal({
    button: (
      <Button variant="contained" color="warning">
        <Add sx={{ mr: 2 }} />
        Dodaj nowy model
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
        Dodaj nowy model
      </Button>
    </Modal>
  );
};
export default AddNewModelDeliveryItemModal;
