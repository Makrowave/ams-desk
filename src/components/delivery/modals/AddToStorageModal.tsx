import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import useModal from '../../../hooks/useModal';

const AddToStorageModal = () => {
  const { Modal, setOpen } = useModal({
    button: (
      <Button variant="contained" color="warning">
        <Add sx={{ mr: 2 }} />
        Wprowadź na magazyn
      </Button>
    ),
    label: 'Wprowadź na magazyn',
  });

  const handleAdd = () => {
    //TODO
    setOpen(false);
  };

  return (
    <Modal>
      <Button variant="contained" onClick={handleAdd}>
        Wprowadź na magazyn
      </Button>
    </Modal>
  );
};
export default AddToStorageModal;
