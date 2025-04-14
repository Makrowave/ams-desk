import {REPAIR_STATUS} from "@/util/repairStatuses";
import RepairModal from "@/components/modals/repair/RepairModal";
import {
  FaBoxOpen,
  FaCheck,
  FaComment,
  FaFlagCheckered,
  FaHourglass,
  FaPhone,
  FaRegCircleXmark,
  FaShield,
  FaWrench
} from "react-icons/fa6";
import CancelRepairModal from "@/components/modals/repair/CancelRepairModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosPrivate} from "@/api/axios";
import {QUERY_KEYS} from "@/util/query_keys";
import useModal from "@/hooks/useModal";


export default function StatusButtons({localRepair, setIsSaved, setLocalRepair}) {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  const queryClient = useQueryClient();

  const handleStartOrCollect = async (data) => {
    setIsSaved(true);
    console.log(data);
    queryClient.setQueryData([QUERY_KEYS.Repairs, localRepair.repairId], (oldData) => {
      const result = {
        ...oldData,
        repairEmployeeName: data.repairEmployeeName,
        repairEmployeeId: data.repairEmployeeId,
        collectionEmployeeName: data.collectionEmployeeName,
        collectionEmployeeId: data.collectionEmployeeId,
        statusId: data.statusId,
        status: data.status,
        collectionDate: data.collectionDate,
      };
      setLocalRepair(result);
      return result;
    })
  }

  const startMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosPrivate.put(
        `repairs/Start/${localRepair.repairId}?employeeId=${id}`
      );
      return response.data;
    },
    onSuccess: handleStartOrCollect
  })

  const collectMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosPrivate.put(
        `repairs/Collect/${localRepair.repairId}?employeeId=${id}`
      );
      return response.data;
    },
    onSuccess: handleStartOrCollect
  })

  const statusMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosPrivate.put(`repairs/status/${localRepair.repairId}?statusId=${id}`);
      return response.data;
    },
    onSuccess: async (data) => {
      queryClient.setQueryData([QUERY_KEYS.Repairs, localRepair.repairId], (oldData) => {
        const result = {
          ...oldData,
          statusId: data.statusId,
          status: data.status,
        };
        setLocalRepair(result);
        return result;
      })
    },
  });

  const changeStatus = async (id) => {
    await statusMutation.mutate(id);
  };

  const renderButtons = () => {
    switch (localRepair.statusId) {
      case REPAIR_STATUS.Pending:
        return (
          <button
            className='button-primary flex items-center justify-center gap-2'
            onClick={() => {
              if (localRepair.statusId !== REPAIR_STATUS.Pending) return;
              setModalTitle("Rozpocznij naprawę");
              setModalContent(
                <RepairModal
                  employeeId={localRepair.repairEmployeeId}
                  label='Kto naprawia'
                  onClick={(employee) => {
                    startMutation.mutate(employee);
                  }}
                />
              );
              setIsModalOpen(true);
            }}
          >
            <FaWrench/>
            <span>Rozpocznij</span>
          </button>
        )
      case REPAIR_STATUS.InProgress:
        return (
          <>
            <button
              className='button-primary flex items-center justify-center gap-2'
              onClick={() => {
                changeStatus(REPAIR_STATUS.AwaitingParts);
              }}
            >
              <FaHourglass/>
              <span>Oczekuj części</span>
            </button>
            <button
              className='button-primary flex items-center justify-center gap-2'
              onClick={() => {
                changeStatus(REPAIR_STATUS.Warranty);
              }}
            >
              <FaShield/>
              <span>Gwarancja</span>
            </button>
            <button
              className='button-primary flex items-center justify-center gap-2'
              onClick={() => {
                changeStatus(REPAIR_STATUS.ContactNeeded);
              }}
            >
              <FaComment/>
              <span>Zapytaj klienta</span>
            </button>

            <button
              className='button-primary flex items-center justify-center gap-2'
              onClick={() => {
                changeStatus(REPAIR_STATUS.Finished);
              }}
            >
              <FaCheck/>
              <span>Zakończ</span>
            </button>
          </>
        )
      case REPAIR_STATUS.AwaitingParts:
      case REPAIR_STATUS.Warranty:
      case REPAIR_STATUS.ContactNeeded:
        return (
          <button
            className='button-primary flex items-center justify-center gap-2'
            onClick={() => {
              changeStatus(REPAIR_STATUS.InProgress);
            }}
          >
            <FaBoxOpen/>
            <span>Wznów</span>
          </button>
        )
      case REPAIR_STATUS.Finished:
        return (
          <>
            <button
              className='button-primary flex items-center justify-center gap-2'
              onClick={() => {
                changeStatus(REPAIR_STATUS.InProgress);
              }}
            >
              <FaBoxOpen/>
              <span>Wznów</span>
            </button>
            <button
              className='button-primary flex items-center justify-center gap-2'
              onClick={() => {
                changeStatus(REPAIR_STATUS.Notified);
              }}
            >
              <FaPhone/>
              <span>Powiadom</span>
            </button>
          </>
        )
      case REPAIR_STATUS.Notified:
        return (
          <>
            <button
              className='button-primary flex items-center justify-center gap-2'
              onClick={() => {
                changeStatus(REPAIR_STATUS.InProgress);
              }}
            >
              <FaBoxOpen/>
              <span>Wznów</span>
            </button>
            <button
              className='button-primary flex items-center justify-center gap-2'
              onClick={() => {
                setModalTitle("Wydaj rower");
                setModalContent(
                  <RepairModal
                    employeeId={localRepair.repairEmployeeId}
                    label='Kto wydaje'
                    onClick={(employee) => {
                      collectMutation.mutate(employee);
                    }}
                  />
                );
                setIsModalOpen(true);
              }}
            >
              <FaFlagCheckered/>
              <span>Wydaj</span>
            </button>
          </>
        )
      default:
        return <></>
    }
  }

  return (
    <div className='flex items-center gap-x-2 text-xl'>
      {
        renderButtons()
      }
      {
        !(localRepair.statusId === REPAIR_STATUS.Cancelled || localRepair.statusId === REPAIR_STATUS.Collected) &&
        <button
          className='button-primary flex items-center justify-center gap-2'
          onClick={() => {
            setModalTitle("Anuluj");
            setModalContent(
              <CancelRepairModal onClick={changeStatus}/>
            );
            setIsModalOpen(true);
          }}
        >
          <FaRegCircleXmark className={"text-red-600"}/>
          <span>Anuluj</span>
        </button>
      }

    </div>
  )
}