import useModal from "@/hooks/useModal";
import {REPAIR_STATUS} from "@/util/repairStatuses";

export default function CancelRepairModal({onClick}) {
  const {setIsModalOpen} = useModal();
  const handleClick = () => {
    onClick(REPAIR_STATUS.Cancelled);
    setIsModalOpen(false);
  };

  return (
    <div className='flex flex-col w-full justify-between items-center'>
      <div className='w-60'>
        Czy na pewno chcesz anulować zgłoszenie?
      </div>
      <button className='block bg-red-600 hover:bg-red-700 text-white rounded-lg mb-4 w-40' onClick={handleClick}>
        Anuluj
      </button>
    </div>
  );
}
