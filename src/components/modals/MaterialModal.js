import {cloneElement, useState} from "react";
import {Box, IconButton, Modal, Paper, Typography} from "@mui/material";
import {FaXmark} from "react-icons/fa6";

export default function MaterialModal({button, label, children}) {
  const [open, setOpen] = useState(false);

  const ChildComponent = () => {
    return cloneElement(children,
      {
        ...children.props,
        closeModal: () => setOpen(false),
      }
    )
  }

  const ButtonComponent = () => {
    return cloneElement(button,
      {
        ...button.props,
        onClick: () => setOpen(true),
      }
    )
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    boxShadow: 24,
  };
  return (
    <div>
      <ButtonComponent/>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper className={"p-2 min-w-[350px] w-fit"} sx={style}>
          <Box className={"p-2 flex justify-between items-center"}>
            <Typography variant="h6">{label}</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <FaXmark/>
            </IconButton>
          </Box>
          <Box className={"p-4 flex flex-col justify-between gap-2 flex-grow min-w-72"}>
            <ChildComponent/>
          </Box>
        </Paper>
      </Modal>
    </div>
  )
}