import { cloneElement, useState } from 'react';
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { FaXmark } from 'react-icons/fa6';

type MaterialModalProps = {
  button: React.ReactElement;
  label: string;
  children: React.ReactElement;
};

const MaterialModal = ({ button, label, children }: MaterialModalProps) => {
  const [open, setOpen] = useState(false);

  const ChildComponent = () => {
    return cloneElement(children, {
      ...children.props,
      closeModal: () => setOpen(false),
    });
  };

  const ButtonComponent = () => {
    return cloneElement(button, {
      ...button.props,
      onClick: (e: React.MouseEvent) => {
        if (button.props.onClick) button.props.onClick(e);
        setOpen(true);
      },
    });
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  return (
    <Box>
      <ButtonComponent />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper sx={style} elevation={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              px: 2,
              pt: 2,
              pb: 1,
            }}
          >
            <Typography variant="h6">{label}</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <FaXmark />
            </IconButton>
          </Box>
          <Stack
            sx={{
              px: 4,
              pb: 4,
              justifyContent: 'space-between',
              gap: 2,
              flexGrow: 1,
              minWidth: 288,
            }}
          >
            <ChildComponent />
          </Stack>
        </Paper>
      </Modal>
    </Box>
  );
};

export default MaterialModal;
