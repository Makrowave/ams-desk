import useModal from "@/hooks/useModal";
import {REPAIR_STATUS} from "@/util/repairStatuses";
import {Button, Typography} from "@mui/material";

export default function CancelRepairModal({onClick}) {
  const {setIsModalOpen} = useModal();
  const handleClick = () => {
    onClick(REPAIR_STATUS.Cancelled);
    setIsModalOpen(false);
  };

  return (
    <div className='modal-basic pb-4'>
      <Typography className={"text-justify"}>
        Czy na pewno chcesz anulować zgłoszenie?
      </Typography>
      <Button variant={"contained"} color={"error"} onClick={handleClick}>
        Anuluj
      </Button>
    </div>
  );
}
