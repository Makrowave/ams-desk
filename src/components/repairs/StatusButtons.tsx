import { REPAIR_STATUS } from '../../util/repairStatuses';
import RepairModal from '../modals/repair/RepairModal';
import {
  FaBoxOpen,
  FaCheck,
  FaComment,
  FaFlagCheckered,
  FaHourglass,
  FaPhone,
  FaRegCircleXmark,
  FaShield,
  FaWrench,
} from 'react-icons/fa6';
import CancelRepairModal from '../modals/repair/CancelRepairModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import URLS from '../../util/urls';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import MaterialModal from '../modals/MaterialModal';
import { Repair } from '../../types/repairTypes';
import { Box, Button } from '@mui/material';

type StatusButtonsProps = {
  localRepair: Repair;
  setIsSaved: (value: boolean) => void;
  setLocalRepair: (repair: Repair) => void;
  setSaveStatus: (status: '' | 'success' | 'error') => void;
};

const StatusButtons = ({
  localRepair,
  setIsSaved,
  setLocalRepair,
  setSaveStatus,
}: StatusButtonsProps) => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const handleStartOrCollect = async (data: Repair) => {
    setSaveStatus('success');
    setIsSaved(true);
    queryClient.setQueryData<Repair | undefined>(
      [URLS.Repairs, localRepair.id],
      (oldData) => {
        const base = oldData ?? localRepair;
        const result: Repair = {
          ...base,
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
      },
    );
  };

  const startMutation = useMutation({
    mutationFn: async (id: number) => {
      setSaveStatus('');
      const response = await axiosPrivate.put(
        `repairs/Start/${localRepair.id}?employeeId=${id}`,
      );
      return response.data;
    },
    onSuccess: handleStartOrCollect,
    onError: async (error) => {
      setSaveStatus('error');
    },
  });

  const collectMutation = useMutation({
    mutationFn: async (id: number) => {
      setSaveStatus('');
      const response = await axiosPrivate.put(
        `repairs/Collect/${localRepair.id}?employeeId=${id}`,
      );
      return response.data;
    },
    onSuccess: handleStartOrCollect,
    onError: async (error) => {
      setSaveStatus('error');
    },
  });

  const statusMutation = useMutation({
    mutationFn: async (id: REPAIR_STATUS) => {
      setSaveStatus('');
      const response = await axiosPrivate.put(
        `repairs/status/${localRepair.id}?statusId=${id}`,
      );
      return response.data;
    },
    onSuccess: async (data) => {
      setSaveStatus('success');
      queryClient.setQueryData<Repair>(
        [URLS.Repairs, localRepair.id],
        (oldData) => {
          const base = oldData ?? localRepair;
          const result = {
            ...base,
            statusId: data.statusId,
            status: data.status,
          };
          setLocalRepair(result);
          return result;
        },
      );
    },
    onError: async (error) => {
      setSaveStatus('error');
    },
  });

  const changeStatus = async (id: REPAIR_STATUS) => {
    await statusMutation.mutate(id);
  };

  const renderButtons = () => {
    switch (localRepair.statusId) {
      case REPAIR_STATUS.Pending:
        return (
          <MaterialModal
            label={'Rozpocznij naprawę'}
            button={
              <Button
                color="warning"
                variant={'contained'}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <FaWrench />
                Rozpocznij
              </Button>
            }
          >
            <RepairModal
              employeeId={localRepair.repairEmployeeId}
              label="Kto naprawia"
              onClick={(employee) => {
                startMutation.mutate(employee);
              }}
            />
          </MaterialModal>
        );
      case REPAIR_STATUS.InProgress:
        return (
          <>
            <Button
              color="info"
              variant={'contained'}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => {
                changeStatus(REPAIR_STATUS.AwaitingParts);
              }}
            >
              <FaHourglass />
              <span>Oczekuj części</span>
            </Button>
            <Button
              color="info"
              variant={'contained'}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => {
                changeStatus(REPAIR_STATUS.Warranty);
              }}
            >
              <FaShield />
              <span>Gwarancja</span>
            </Button>
            <Button
              variant={'contained'}
              color="info"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => {
                changeStatus(REPAIR_STATUS.ContactNeeded);
              }}
            >
              <FaComment />
              <span>Zapytaj klienta</span>
            </Button>

            <Button
              variant={'contained'}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => {
                changeStatus(REPAIR_STATUS.Finished);
              }}
            >
              <FaCheck />
              <span>Zakończ</span>
            </Button>
          </>
        );
      case REPAIR_STATUS.AwaitingParts:
      case REPAIR_STATUS.Warranty:
      case REPAIR_STATUS.ContactNeeded:
        return (
          <Button
            color="warning"
            variant={'contained'}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            onClick={() => {
              changeStatus(REPAIR_STATUS.InProgress);
            }}
          >
            <FaBoxOpen />
            <span>Wznów</span>
          </Button>
        );
      case REPAIR_STATUS.Finished:
        return (
          <>
            <Button
              color="warning"
              variant={'contained'}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => {
                changeStatus(REPAIR_STATUS.InProgress);
              }}
            >
              <FaBoxOpen />
              <span>Wznów</span>
            </Button>
            <Button
              variant={'contained'}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => {
                changeStatus(REPAIR_STATUS.Notified);
              }}
            >
              <FaPhone />
              <span>Powiadom</span>
            </Button>
          </>
        );
      case REPAIR_STATUS.Notified:
        return (
          <>
            <Button
              color="warning"
              variant={'contained'}
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => {
                changeStatus(REPAIR_STATUS.InProgress);
              }}
            >
              <FaBoxOpen />
              <span>Wznów</span>
            </Button>
            <MaterialModal
              label={'Wydaj rower'}
              button={
                <Button
                  variant={'contained'}
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  className="button-primary flex items-center justify-center gap-2"
                >
                  <FaFlagCheckered />
                  <span>Wydaj</span>
                </Button>
              }
            >
              <RepairModal
                employeeId={localRepair.repairEmployeeId}
                label="Kto wydaje"
                onClick={(employeeId: number) => {
                  collectMutation.mutate(employeeId);
                }}
              />
            </MaterialModal>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      {renderButtons()}
      {!(
        localRepair.statusId === REPAIR_STATUS.Cancelled ||
        localRepair.statusId === REPAIR_STATUS.Collected
      ) && (
        <MaterialModal
          label={'Anuluj'}
          button={
            <Button
              variant={'contained'}
              color="error"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <FaRegCircleXmark />
              <span>Anuluj</span>
            </Button>
          }
        >
          <CancelRepairModal onClick={changeStatus} />
        </MaterialModal>
      )}
    </Box>
  );
};

export default StatusButtons;
