import { REPAIR_STATUS } from '../../../util/repairStatuses';
import { Button, Typography } from '@mui/material';

export default function CancelRepairModal({
  onClick,
  closeModal,
}: {
  onClick: (status: REPAIR_STATUS) => void;
  closeModal: () => void;
}) {
  const handleClick = () => {
    onClick(REPAIR_STATUS.Cancelled);
    closeModal();
  };

  return (
    <>
      <Typography className={'text-justify'}>
        Czy na pewno chcesz anulować zgłoszenie?
      </Typography>
      <Button variant={'contained'} color={'error'} onClick={handleClick}>
        Anuluj
      </Button>
    </>
  );
}
