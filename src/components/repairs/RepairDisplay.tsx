import { useEffect, useRef, useState } from 'react';
import PartRecord from './PartRecord';
import {
  generateRepairCostDoc,
  generateRepairNewDoc,
  printRepairCostDoc,
  printRepairDoc,
} from '../../util/print';
import { formatPhone } from '../../util/formatting';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaFloppyDisk, FaPencil, FaPlus } from 'react-icons/fa6';
import ServiceRecord from './ServiceRecord';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosPrivate } from '../../api/axios';
import useSavedData from '../../hooks/useSavedData';
import SavedDataWarning from '../navigation/SavedDataWarning';
import ServiceSelectModal from '../modals/repair/ServiceSelectModal';
import PartSelectModal from '../modals/repair/PartSelectModal';
import StatusButtons from './StatusButtons';
import SaveIndicator from './SaveIndicator';
import URLS from '../../util/urls';
import MaterialModal from '../modals/MaterialModal';
import { IconButton, Tooltip } from '@mui/material';
import { FaInfoCircle } from 'react-icons/fa';
import { REPAIR_STATUS } from '../../util/repairStatuses';
import EditRepairModal from '../modals/repair/EditRepairModal';
import { Part, Repair, Service } from '../../types/repairTypes';
import { Employee } from '../../types/employeeTypes';

const RepairDisplay = ({ repair }: { repair: Repair }) => {
  const { isSaved, setIsSaved, updateIsUsed } = useSavedData();
  const [localRepair, setLocalRepair] = useState(repair);
  const noteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  let disabledEditing =
    localRepair.statusId === REPAIR_STATUS.Finished ||
    localRepair.statusId === REPAIR_STATUS.Notified ||
    localRepair.statusId === REPAIR_STATUS.Cancelled ||
    localRepair.statusId === REPAIR_STATUS.Pending ||
    localRepair.statusId === REPAIR_STATUS.Collected;
  const setChangeTimeoutRef = (repair: Repair) => {
    setSaveStatus('');
    if (noteTimeoutRef.current) clearTimeout(noteTimeoutRef.current);
    noteTimeoutRef.current = setTimeout(() => {
      repairMutation.mutate(repair);
    }, 2000);
  };

  const queryClient = useQueryClient();
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | ''>(
    'success',
  );
  const { data, isError, isLoading, error } = useQuery({
    queryKey: [URLS.Employees],
    queryFn: async () => {
      const response = await axiosPrivate.get('Employees');
      return response.data;
    },
  });

  const employeeMutation = useMutation({
    mutationFn: async ([id, collection]: [number, boolean]) => {
      setSaveStatus('');
      const response = await axiosPrivate.put(
        `repairs/employee/${localRepair.id}?employeeId=${id}&collection=${collection}`,
      );
      return response.data;
    },
    onSuccess: async (data) => {
      setIsSaved(true);
      queryClient.setQueryData<Repair>([URLS.Repairs, repair.id], (oldData) => {
        const base = oldData ?? repair;
        const result = {
          ...base,
          repairEmployeeName: data.repairEmployeeName,
          repairEmployeeId: data.repairEmployeeId,
        };
        setLocalRepair(result);
        setSaveStatus('success');
        return result;
      });
    },
    onError: async (error) => {
      setSaveStatus('error');
    },
  });

  const repairMutation = useMutation({
    mutationFn: async (repair: Repair) => {
      setSaveStatus('');
      const response = await axiosPrivate.put(
        `repairs/${repair.id}`,
        JSON.stringify({
          ...repair,
          services: repair.services.map((service) => ({
            serviceDoneId: service.id > 0 ? service.id : 0,
            serviceId: service.service?.id,
            repairId: repair.id,
            price: service.price,
          })),
          parts: repair.parts.map((part) => ({
            partUsedId: part.id > 0 ? part.id : 0,
            partId: part.part?.id,
            repairId: repair.id,
            amount: Number(part.amount),
            price: part.price,
          })),
          status: null,
        }),
      );
      return response.data;
    },
    onSuccess: async (data) => {
      setLocalRepair(data);
      setIsSaved(true);
      queryClient.setQueryData([URLS.Repairs, repair.id], () => {
        return data;
      });
      setSaveStatus('success');
    },
    onError: () => {
      setSaveStatus('error');
    },
  });

  const save = async () => {
    await repairMutation.mutate(localRepair);
  };

  const [newPartId, setNewPartId] = useState(-1);
  const updateParts = (value: Part) => {
    setIsSaved(false);
    const newParts = localRepair.parts;
    const id = newPartId;
    setNewPartId(id - 1);
    const partUsed = {
      id: isNaN(id) ? -1 : id,
      part: value,
      //this might break
      partId: value.id,
      repairId: localRepair.id,
      amount: 1,
      price: value.price,
    };
    newParts.push(partUsed);
    const updatedRepair = { ...localRepair, parts: newParts };
    setLocalRepair(updatedRepair);
    repairMutation.mutate(updatedRepair);
  };

  const changePartAmount = (id: number, value: number) => {
    setIsSaved(false);
    const newParts = localRepair.parts.map((part) =>
      part.id === id ? { ...part, amount: value } : part,
    );
    const updatedRepair = { ...localRepair, parts: newParts };
    setLocalRepair(updatedRepair);
    repairMutation.mutate(updatedRepair);
  };

  const deletePart = (id: number) => {
    setIsSaved(false);
    const newParts = localRepair.parts.filter((part) => part.id !== id);
    const updatedRepair = { ...localRepair, parts: newParts };
    setLocalRepair(updatedRepair);
    repairMutation.mutate(updatedRepair);
  };
  const [newServiceId, setNewServiceId] = useState(-1);
  const updateServices = (value: Service) => {
    setIsSaved(false);
    const newServices = localRepair.services;
    const id = newServiceId;
    setNewServiceId(id - 1);
    const serviceDone = {
      id: isNaN(id) ? -1 : id,
      service: value,
      //this might break
      serviceId: value.id!,
      repairId: localRepair.id,
      price: value.price,
    };
    newServices.push(serviceDone);
    const updatedRepair = { ...localRepair, services: newServices };
    setLocalRepair(updatedRepair);
    repairMutation.mutate(updatedRepair);
  };

  const deleteService = (id: number) => {
    setIsSaved(false);
    const newServices = localRepair.services.filter(
      (service) => service.id !== id,
    );
    const updatedRepair = { ...localRepair, services: newServices };
    setLocalRepair(updatedRepair);
    repairMutation.mutate(updatedRepair);
  };

  const handleRepEmployeeChange = async (id: number) => {
    await employeeMutation.mutate([id, false]);
  };

  const changeDiscount = (value: string) => {
    setIsSaved(false);
    const repair = {
      ...localRepair,
      discount: Number(value.replace(/[^0-9]/g, '')),
    };
    setLocalRepair(repair);
    setChangeTimeoutRef(repair);
  };
  const changeCosts = (value: string) => {
    setIsSaved(false);
    const repair = {
      ...localRepair,
      additionalCosts: Number(value.replace(/[^0-9]/g, '')),
    };
    setLocalRepair(repair);
    setChangeTimeoutRef(repair);
  };

  const router = useRouter();

  const servicesTotal = () => {
    return localRepair.services.reduce((acc, s) => acc + s.price, 0);
  };
  const partsTotal = () => {
    return localRepair.parts.reduce((acc, p) => acc + p.price * p.amount, 0);
  };

  //Handle browser navigation
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isSaved) {
        event.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isSaved]);

  useEffect(() => {
    updateIsUsed(true);
    return () => {
      updateIsUsed(false);
    };
  }, []);
  const [noteFocus, setNoteFocus] = useState(false);

  return (
    <div className="flex-col rounded-2xl">
      <div className="flex bg-white rounded-t-xl border-x-2 p-4">
        <button
          className="rounded-lg *:p-2 hover:bg-gray-300 transition-colors duration-200"
          onClick={() => router.back()}
        >
          <SavedDataWarning>
            <FaArrowLeft />
          </SavedDataWarning>
        </button>
        <div className="ml-auto flex gap-4">
          <MaterialModal
            label={'Edytuj treść zgłoszenia'}
            button={
              <IconButton
                color={'primary'}
                disabled={
                  localRepair.statusId === REPAIR_STATUS.Collected ||
                  localRepair.statusId === REPAIR_STATUS.Cancelled
                }
              >
                <FaPencil />
              </IconButton>
            }
          >
            <EditRepairModal
              repair={localRepair}
              updateRepair={setLocalRepair}
            />
          </MaterialModal>
          <IconButton onClick={save} color={'primary'}>
            <FaFloppyDisk />
          </IconButton>
          <SaveIndicator status={saveStatus} />
          <button
            className="button-primary"
            onClick={() => printRepairDoc(generateRepairNewDoc, localRepair)}
          >
            Drukuj zgłoszenie
          </button>
          <button
            className="button-primary"
            onClick={() =>
              printRepairCostDoc(generateRepairCostDoc, localRepair)
            }
          >
            Drukuj cennik
          </button>
        </div>
      </div>
      <section className="bg-primary mb-10 p-4 rounded-b-xl border-x-2 shadow-lg">
        <div className="text-left text-2xl my-4 pb-2 flex items-center justify-between">
          <div className="flex items-center">
            <b>
              <h2>Zgłoszenie serwisowe #{localRepair.id}</h2>
            </b>
            <div
              className="flex ml-2 py-0.5 px-1 text-base rounded-md h-fit items-center"
              style={{ backgroundColor: localRepair.status?.color }}
            >
              {localRepair.status?.name}
            </div>
          </div>
          <StatusButtons
            localRepair={localRepair}
            setIsSaved={setIsSaved}
            setLocalRepair={setLocalRepair}
            setSaveStatus={setSaveStatus}
          />
        </div>

        <section className="flex place-content-between pb-4">
          <div className="flex-col flex-1 *:mt-4">
            <div className="flex">
              <div className="border-gray-300 border-2 rounded-lg p-2 w-40">
                <span className="block text-base">
                  <b>Data przyjęcia</b>
                </span>
                <span>
                  {new Date(localRepair.arrivalDate).toLocaleDateString(
                    'pl-PL',
                  )}
                </span>
              </div>
              {localRepair.collectionDate !== null && (
                <div className="border-gray-300 border-2 rounded-lg p-2 w-40 ml-4">
                  <span className="block text-base">
                    <b>Data wydania</b>
                  </span>
                  <span>
                    {new Date(
                      localRepair.collectionDate ?? '',
                    ).toLocaleDateString('pl-PL')}
                  </span>
                </div>
              )}
            </div>
            <div className="flex max-w-xl">
              <div className="flex flex-col flex-1 justify-between">
                <div className="border-gray-300 border-2 rounded-lg p-2 w-40">
                  <span className="block text-base">
                    <b>Telefon</b>
                  </span>
                  <span>{formatPhone(localRepair.phoneNumber)}</span>
                </div>
                <div className="border-gray-300 border-2 rounded-lg p-2 w-40">
                  <span className="block text-base">
                    <b>Rower</b>
                  </span>
                  <span>{localRepair.bikeName}</span>
                </div>
              </div>
              <div className="border-gray-300 border-2 rounded-lg w-full ml-4 flex flex-col p-2">
                <span className="text-base border-gray-200 border-b w-fit">
                  <b>Całkowite koszty</b>
                </span>
                <table className="text-lg">
                  <tbody>
                    <tr>
                      <td>Usługi</td>
                      <td className="text-end">{servicesTotal().toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Części</td>
                      <td className="text-end">{partsTotal().toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Dodatkowe koszty</td>
                      <td className="text-end">
                        <input
                          disabled={
                            localRepair.statusId === REPAIR_STATUS.Collected ||
                            localRepair.statusId === REPAIR_STATUS.Cancelled
                          }
                          className="w-10 border-gray-300 rounded-lg border text-end"
                          value={localRepair.additionalCosts}
                          onChange={(e) => changeCosts(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td>Zniżka</td>
                      <td className="text-end">
                        <span>-</span>
                        <input
                          disabled={
                            localRepair.statusId === REPAIR_STATUS.Collected ||
                            localRepair.statusId === REPAIR_STATUS.Cancelled
                          }
                          className="w-10 border-gray-300 rounded-lg border text-end"
                          value={localRepair.discount}
                          onChange={(e) => changeDiscount(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Suma</td>
                      <td className="text-end">
                        {(
                          servicesTotal() +
                          partsTotal() +
                          Number(localRepair.additionalCosts) -
                          Number(localRepair.discount)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="border-gray-300 border-2 rounded-lg p-2 max-w-xl">
              <span className="block text-base">
                <b>Treść</b>
              </span>
              <span className="whitespace-pre-wrap">{localRepair.issue}</span>
            </div>
          </div>
          <div className="flex-col flex-1 justify-end ">
            <div className="flex justify-end mb-4">
              <div className="p-1 border-gray-300 border rounded-lg w-40 flex flex-col">
                <span className="text-base">
                  <b>Kto przyjmował</b>
                </span>
                <span>{localRepair.takeInEmployeeName}</span>
              </div>
              {localRepair.repairEmployeeId !== null && (
                <div className="p-1 border-gray-300 border rounded-lg w-40 flex flex-col ml-4">
                  <span className="text-base">
                    <b>
                      {localRepair.statusId === 7 ||
                      localRepair.statusId === 6 ||
                      localRepair.statusId === 5
                        ? 'Kto naprawiał'
                        : 'Kto naprawia'}
                    </b>
                  </span>
                  {localRepair.statusId === 7 ||
                  localRepair.statusId === 6 ||
                  localRepair.statusId === 5 ? (
                    <span>{localRepair.repairEmployeeName}</span>
                  ) : (
                    <select
                      value={localRepair.repairEmployeeId}
                      onChange={(e) =>
                        handleRepEmployeeChange(Number(e.target.value))
                      }
                    >
                      {!isError &&
                        !isLoading &&
                        data.map((employee: Employee) => (
                          <option key={employee.id} value={employee.id}>
                            {employee.name}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
              )}
              {localRepair.collectionEmployeeId !== null && (
                <div className="p-1 border-gray-300 border rounded-lg w-40 flex flex-col ml-4">
                  <span className="text-base">
                    <b>Kto wydał</b>
                  </span>
                  <span>{localRepair.collectionEmployeeName}</span>
                </div>
              )}
            </div>
            <div
              className={
                noteFocus
                  ? 'border-gray-300 ml-auto w-fit border p-2 rounded-lg outline-blue-600 outline-double outline-2'
                  : 'border-gray-300 ml-auto w-fit border p-2 rounded-lg'
              }
            >
              <b className="block text-base">Notatka</b>
              <textarea
                className="focus:outline-none"
                cols={50}
                rows={10}
                placeholder="Notatka"
                value={localRepair.note ?? ''}
                onChange={(e) => {
                  setLocalRepair({ ...localRepair, note: e.target.value });
                  setIsSaved(false);
                  setChangeTimeoutRef({ ...localRepair, note: e.target.value });
                }}
                onFocus={() => {
                  setNoteFocus(true);
                }}
                onBlur={() => {
                  setNoteFocus(false);
                }}
              />
            </div>
          </div>
        </section>
      </section>
      <section className="flex place-content-between gap-10">
        <div className="bg-primary w-5/12 p-8 rounded-xl  shadow-lg">
          <div className="w-full">
            <div className="flex items-center justify-between p-2 border-gray-300 border-b rounded-t-lg bg-secondary">
              <b className="p-2">Usługi</b>

              <MaterialModal
                label={'Dodaj część'}
                button={
                  <IconButton
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: '20%',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                    disabled={disabledEditing}
                  >
                    <FaPlus />
                  </IconButton>
                }
              >
                <ServiceSelectModal mutation={updateServices} />
              </MaterialModal>
            </div>

            <table className="shadow-lg w-full text-lg">
              <thead className="bg-secondary">
                <tr className="*:p-2">
                  <th>Lp.</th>
                  <th>Nazwa</th>
                  <Tooltip
                    title={
                      'Cena z obecną ceną są różne, jeśli ktoś zmienił cennik usług. Usuń i dodaj usługę, jeśli chcesz mieć obecną cenę na zgłoszeniu.'
                    }
                  >
                    <th className={'flex items-center justify-center gap-2'}>
                      Cena (Obecna) <FaInfoCircle />
                    </th>
                  </Tooltip>
                  <th></th>
                </tr>
              </thead>
              <tbody className="even:bg-secondary">
                {localRepair.services.map((service, index) => (
                  <ServiceRecord
                    index={index}
                    service={service}
                    key={service.id}
                    deleteFn={deleteService}
                  />
                ))}
                <tr className="text-center *:p-2">
                  <td></td>
                  <td className="text-end">
                    <b>Suma:</b>
                  </td>
                  <td>{servicesTotal().toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-primary w-7/12 p-8 rounded-xl  shadow-lg">
          <div className="w-full">
            <div className="flex items-center justify-between p-2 border-gray-300 border-b rounded-t-lg bg-secondary">
              <b className="p-2">Części</b>
              <div className="flex flex-row items-center">
                <MaterialModal
                  label={'Dodaj część'}
                  button={
                    <IconButton
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: '20%',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                      }}
                      disabled={disabledEditing}
                    >
                      <FaPlus />
                    </IconButton>
                  }
                >
                  <PartSelectModal mutation={updateParts} />
                </MaterialModal>
              </div>
            </div>
            <table className="shadow-lg w-full text-lg">
              <thead className="bg-secondary">
                <tr className="*:p-2">
                  <th>Lp.</th>
                  <th>Nazwa</th>
                  <Tooltip
                    title={
                      'Cena z obecną ceną są różne, jeśli ktoś w międzyczasie edytował część. Usuń i dodaj część, jeśli chcesz mieć obecną cenę na zgłoszeniu.'
                    }
                  >
                    <th className={'flex items-center justify-center gap-2'}>
                      Cena (Obecna) <FaInfoCircle />
                    </th>
                  </Tooltip>
                  <th>Ilość</th>
                  <th>Suma</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="even:bg-secondary">
                {localRepair.parts.map((part, index) => (
                  <PartRecord
                    index={index}
                    part={part}
                    changeAmount={changePartAmount}
                    deleteFn={deletePart}
                    key={part.id}
                  />
                ))}
                <tr className="text-center *:p-2">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="text-end">
                    <b>Suma:</b>
                  </td>
                  <td>{partsTotal().toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RepairDisplay;
