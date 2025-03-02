import { useEffect, useState } from "react";
import PartRecord from "./PartRecord";
import { generateRepairCostsDoc, generateRepairNewDoc, printRepairDoc } from "@/util/print";
import { formatPhone } from "@/util/formatting";
import { useRouter } from "next/navigation";
import { REPAIR_STATUS } from "@/util/repairStatuses";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaCheck,
  FaComment,
  FaFlagCheckered,
  FaFloppyDisk,
  FaHourglass,
  FaPhone,
  FaPlus,
  FaShield,
  FaWrench,
} from "react-icons/fa6";
import ServiceRecord from "./ServiceRecord";
import ServiceInputSelect from "../filtering/ServiceInputSelect";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "@/api/axios";
import PartInputSelect from "../filtering/PartInputSelect";
import ExpandButton from "../buttons/ExpandButton";
import useModal from "@/hooks/useModal";
import RepairModal from "../modals/repair/RepairModal";
import Modal from "../modals/Modal";
import { QUERY_KEYS } from "@/util/query_keys";
import useSavedData from "@/hooks/useSavedData";
import SavedDataWarning from "../navigation/SavedDataWarning";
import AddPartModal from "../modals/repair/AddPartModal";

export default function Repair({ repair }) {
  const { isSaved, setIsSaved, updateIsUsed } = useSavedData();
  const [localRepair, setLocalRepair] = useState(repair);
  const { setIsOpen, setModalChildren, setTitle } = useModal();

  const queryClient = useQueryClient();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.Employees],
    queryFn: async () => {
      const response = await axiosPrivate.get("Employees");
      return response.data;
    },
  });
  const statusMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosPrivate.put(`repairs/status/${localRepair.repairId}?statusId=${id}`);
    },
    onSuccess: (result) => {
      setLocalRepair(result.data);
    },
  });

  const employeeMutation = useMutation({
    mutationFn: async ([id, collection]) => {
      return await axiosPrivate.put(
        `repairs/employee/${localRepair.repairId}?employeeId=${id}&collection=${collection}`
      );
    },
    onSuccess: (result) => {
      setLocalRepair(result.data);
    },
  });

  const repairMutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        `repairs/${localRepair.repairId}`,
        JSON.stringify({
          ...localRepair,
          services: localRepair.services.map((service) => ({
            serviceDoneId: service.serviceDoneId > 0 ? service.serviceDoneId : 0,
            serviceId: service.service.serviceId,
            repairId: localRepair.repairId,
          })),
          parts: localRepair.parts.map((part) => ({
            partUsedId: part.partUsedId > 0 ? part.partUsedId : 0,
            partId: part.part.partId,
            repairId: localRepair.repairId,
            amount: part.amount,
          })),
          status: null,
        })
      );
    },
    onSuccess: (result) => {
      setLocalRepair(result.data);
      setIsSaved(true);
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.Repairs],
        exact: false,
      });
    },
  });

  const save = () => {
    repairMutation.mutate();
  };

  const [newPartId, setNewPartId] = useState(-1);
  const updateParts = (value) => {
    setIsSaved(false);
    const newParts = localRepair.parts;
    const id = newPartId;
    setNewPartId(id - 1);
    const partUsed = { partUsedId: isNaN(id) ? -1 : id, part: value, amount: 1 };
    newParts.push(partUsed);
    setLocalRepair({ ...localRepair, parts: newParts });
  };

  const changePartPrice = (id, value) => {
    setIsSaved(false);
    const newParts = localRepair.parts.map((part) => (part.partUsedId === id ? { ...part, amount: value } : part));

    setLocalRepair({ ...localRepair, parts: newParts });
  };

  const deletePart = (id) => {
    setIsSaved(false);
    const newParts = localRepair.parts.filter((part) => part.partUsedId !== id);
    setLocalRepair({ ...localRepair, parts: newParts });
  };
  const [newServiceId, setNewServiceId] = useState(-1);
  const updateServices = (value) => {
    setIsSaved(false);
    const newServices = localRepair.services;
    const id = newServiceId;
    setNewServiceId(id - 1);
    const serviceDone = { serviceDoneId: isNaN(id) ? -1 : id, service: value };
    newServices.push(serviceDone);
    setLocalRepair({ ...localRepair, services: newServices });
  };

  const deleteService = (id) => {
    setIsSaved(false);
    const newServices = localRepair.services.filter((service) => service.serviceDoneId !== id);
    setLocalRepair({ ...localRepair, services: newServices });
  };

  const changeStatus = (id) => {
    statusMutation.mutate(id);
    save();
  };

  const handleColEmployeeChange = (id) => {
    employeeMutation.mutate([id, true]);
    save();
  };

  const handleRepEmployeeChange = (id) => {
    employeeMutation.mutate([id, false]);
    save();
  };

  const changeDiscount = (value) => {
    setIsSaved(false);
    setLocalRepair({ ...localRepair, discount: value.replace(/[^0-9]/g, "") });
  };
  const changeCosts = (value) => {
    setIsSaved(false);
    setLocalRepair({ ...localRepair, additionalCosts: value.replace(/[^0-9]/g, "") });
  };

  const router = useRouter();

  const servicesTotal = () => {
    return localRepair.services.reduce((acc, s) => acc + s.service.price, 0);
  };
  const partsTotal = () => {
    return localRepair.parts.reduce((acc, p) => acc + p.part.price * p.amount, 0);
  };

  //Handle browser navigation
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isSaved) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
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
    <div className='flex-col rounded-2xl'>
      <div className='flex bg-white rounded-t-xl border-x-2 p-4'>
        <button
          className='rounded-lg *:p-2 hover:bg-gray-300 transition-colors duration-200'
          onClick={() => router.back()}
        >
          <SavedDataWarning>
            <FaArrowLeft />
          </SavedDataWarning>
        </button>
        <div className='ml-auto flex gap-4'>
          <ExpandButton className='button-primary' text={"Zapisz"} onClick={save}>
            <FaFloppyDisk />
          </ExpandButton>
          <button className='button-primary' onClick={() => printRepairDoc(generateRepairNewDoc, localRepair)}>
            Drukuj zgłoszenie
          </button>
          <button className='button-primary' onClick={() => printRepairDoc(generateRepairCostsDoc, localRepair)}>
            Drukuj cennik
          </button>
        </div>
      </div>
      <section className='bg-primary mb-10 p-4 rounded-b-xl border-x-2 shadow-lg'>
        <div className='text-left text-2xl my-4 pb-2 flex items-center justify-between'>
          <div className='flex items-center'>
            <b>
              <h2>Zgłoszenie serwisowe #{localRepair.repairId}</h2>
            </b>
            <div
              className='flex ml-2 py-0.5 px-1 text-base rounded-md h-fit items-center'
              style={{ backgroundColor: localRepair.status.color }}
            >
              {localRepair.status.name}
            </div>
          </div>
          <div className='flex items-center gap-x-2 text-xl'>
            <ExpandButton
              disabled={localRepair.statusId !== REPAIR_STATUS.Pending}
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Rozpocznij'
              onClick={() => {
                if (localRepair.statusId !== REPAIR_STATUS.Pending) return;
                setTitle("Rozpocznij naprawę");
                setModalChildren(
                  <RepairModal
                    employeeId={localRepair.status.repairEmployeeId}
                    label='Kto naprawia'
                    onClick={(employee, status) => {
                      changeStatus(status);
                      handleRepEmployeeChange(employee);
                    }}
                    statusId={REPAIR_STATUS.InProgress}
                  />
                );
                setIsOpen(true);
              }}
            >
              <FaWrench />
            </ExpandButton>
            <ExpandButton
              disabled={
                localRepair.statusId === REPAIR_STATUS.Collected || localRepair.statusId === REPAIR_STATUS.Pending
              }
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Oczekuj części'
              onClick={() => {
                changeStatus(REPAIR_STATUS.AwaitingParts);
              }}
            >
              <FaHourglass />
            </ExpandButton>
            <ExpandButton
              disabled={
                localRepair.statusId === REPAIR_STATUS.Collected || localRepair.statusId === REPAIR_STATUS.Pending
              }
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Gwarancja'
              onClick={() => {
                changeStatus(REPAIR_STATUS.Warranty);
              }}
            >
              <FaShield />
            </ExpandButton>
            <ExpandButton
              disabled={
                localRepair.statusId === REPAIR_STATUS.Collected || localRepair.statusId === REPAIR_STATUS.Pending
              }
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Kontakt z klientem'
              onClick={() => {
                changeStatus(REPAIR_STATUS.ContactNeeded);
              }}
            >
              <FaComment />
            </ExpandButton>
            <ExpandButton
              disabled={
                localRepair.statusId === REPAIR_STATUS.Collected || localRepair.statusId === REPAIR_STATUS.Pending
              }
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Wznów'
              onClick={() => {
                changeStatus(3);
              }}
            >
              <FaBoxOpen />
            </ExpandButton>
            <ExpandButton
              disabled={
                localRepair.statusId === REPAIR_STATUS.Collected || localRepair.statusId === REPAIR_STATUS.Pending
              }
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Zakończ'
              onClick={() => {
                changeStatus(REPAIR_STATUS.Finished);
              }}
            >
              <FaCheck />
            </ExpandButton>
            <ExpandButton
              disabled={
                localRepair.statusId === REPAIR_STATUS.Collected || localRepair.statusId === REPAIR_STATUS.Pending
              }
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Powiadom'
              onClick={() => {
                changeStatus(REPAIR_STATUS.Notified);
              }}
            >
              <FaPhone />
            </ExpandButton>
            <ExpandButton
              disabled={
                localRepair.statusId === REPAIR_STATUS.Collected || localRepair.statusId === REPAIR_STATUS.Pending
              }
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Wydaj'
              onClick={() => {
                setTitle("Wydaj rower");
                setModalChildren(
                  <RepairModal
                    employeeId={localRepair.status.repairEmployeeId}
                    label='Kto wydaje'
                    onClick={(employee, status) => {
                      handleColEmployeeChange(employee);
                      changeStatus(status);
                    }}
                    statusId={REPAIR_STATUS.Collected}
                  />
                );
                setIsOpen(true);
              }}
            >
              <FaFlagCheckered />
            </ExpandButton>
          </div>
        </div>

        <section className='flex place-content-between pb-4'>
          <div className='flex-col flex-1 *:mt-4'>
            <div className='flex'>
              <div className='border-gray-300 border-2 rounded-lg p-2 w-40'>
                <span className='block text-base'>
                  <b>Data przyjęcia</b>
                </span>
                <span>{new Date(localRepair.arrivalDate).toLocaleDateString("pl-PL")}</span>
              </div>
              {localRepair.collectionDate !== null && (
                <div className='border-gray-300 border-2 rounded-lg p-2 w-40 ml-4'>
                  <span className='block text-base'>
                    <b>Data wydania</b>
                  </span>
                  <span>{new Date(localRepair.collectionDate).toLocaleDateString("pl-PL")}</span>
                </div>
              )}
            </div>
            <div className='flex max-w-xl'>
              <div className='flex flex-col flex-1 justify-between'>
                <div className='border-gray-300 border-2 rounded-lg p-2 w-40'>
                  <span className='block text-base'>
                    <b>Telefon</b>
                  </span>
                  <span>{formatPhone(localRepair.phoneNumber)}</span>
                </div>
                <div className='border-gray-300 border-2 rounded-lg p-2 w-40'>
                  <span className='block text-base'>
                    <b>Rower</b>
                  </span>
                  <span>{localRepair.bikeName}</span>
                </div>
              </div>
              <div className='border-gray-300 border-2 rounded-lg w-full ml-4 flex flex-col p-2'>
                <span className='text-base border-gray-200 border-b w-fit'>
                  <b>Całkowite koszty</b>
                </span>
                <table className='text-lg'>
                  <tbody>
                    <tr>
                      <td>Usługi</td>
                      <td className='text-end'>{servicesTotal()}</td>
                    </tr>
                    <tr>
                      <td>Części</td>
                      <td className='text-end'>{partsTotal()}</td>
                    </tr>
                    <tr>
                      <td>Dodatkowe koszty</td>
                      <td className='text-end'>
                        <input
                          className='w-10 border-gray-300 rounded-lg border text-end'
                          value={localRepair.additionalCosts}
                          onChange={(e) => changeCosts(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr className='border-b border-gray-300'>
                      <td>Zniżka</td>
                      <td className='text-end'>
                        <span>-</span>
                        <input
                          className='w-10 border-gray-300 rounded-lg border text-end'
                          value={localRepair.discount}
                          onChange={(e) => changeDiscount(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Suma</td>
                      <td className='text-end'>
                        {servicesTotal() +
                          partsTotal() +
                          Number(localRepair.additionalCosts) -
                          Number(localRepair.discount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='border-gray-300 border-2 rounded-lg p-2 max-w-xl'>
              <span className='block text-base'>
                <b>Treść</b>
              </span>
              <span>{localRepair.issue}</span>
            </div>
          </div>
          <div className='flex-col flex-1 justify-end '>
            <div className='flex justify-end mb-4'>
              {localRepair.repairEmployeeId !== null && (
                <div className='p-1 border-gray-300 border rounded-lg w-40 flex flex-col'>
                  <span className='text-base'>
                    <b>
                      {localRepair.statusId === 7 || localRepair.statusId === 6 || localRepair.statusId === 5
                        ? "Kto naprawiał"
                        : "Kto naprawia"}
                    </b>
                  </span>
                  {localRepair.statusId === 7 || localRepair.statusId === 6 || localRepair.statusId === 5 ? (
                    <span>{localRepair.repairEmployeeName}</span>
                  ) : (
                    <select
                      value={localRepair.repairEmployeeId}
                      onChange={(e) => handleRepEmployeeChange(e.target.value)}
                    >
                      {!isError &&
                        !isLoading &&
                        data.map((employee) => (
                          <option key={employee.employeeId} value={employee.employeeId}>
                            {employee.employeeName}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
              )}
              {localRepair.collectionEmployeeId !== null && (
                <div className='p-1 border-gray-300 border rounded-lg w-40 flex flex-col ml-4'>
                  <span className='text-base'>
                    <b>Kto wydał</b>
                  </span>
                  <span>{localRepair.collectionEmployeeName}</span>
                </div>
              )}
            </div>
            <div
              className={
                noteFocus
                  ? "border-gray-300 ml-auto w-fit border p-2 rounded-lg outline-blue-600 outline-double outline-2"
                  : "border-gray-300 ml-auto w-fit border p-2 rounded-lg"
              }
            >
              <b className='block text-base'>Notatka</b>
              <textarea
                className='focus:outline-none'
                cols={50}
                rows={10}
                placeholder='Notatka'
                value={localRepair.note ?? ""}
                onChange={(e) => {
                  setLocalRepair({ ...localRepair, note: e.target.value });
                  setIsSaved(false);
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
      <section className='flex place-content-between gap-10'>
        <div className='bg-primary w-5/12 p-8 rounded-xl  shadow-lg'>
          <div className='w-full'>
            <div className='flex items-center justify-between p-2 border-gray-300 border-b rounded-t-lg bg-secondary'>
              <b className='p-2'>Usługi</b>
              <ServiceInputSelect mutation={updateServices} />
            </div>

            <table className='shadow-lg w-full'>
              <thead className='bg-secondary'>
                <tr className='*:p-4'>
                  <th>Lp.</th>
                  <th>Nazwa</th>
                  <th>Cena</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='even:bg-secondary'>
                {localRepair.services.map((service, index) => (
                  <ServiceRecord index={index} service={service} key={service.id} deleteFn={deleteService} />
                ))}
                <tr className='text-center *:p-2'>
                  <td></td>
                  <td className='text-end'>
                    <b>Suma:</b>
                  </td>
                  <td>{servicesTotal()}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='bg-primary w-7/12 p-8 rounded-xl  shadow-lg'>
          <div className='w-full'>
            <div className='flex items-center justify-between p-2 border-gray-300 border-b rounded-t-lg bg-secondary'>
              <b className='p-2'>Części</b>
              <div className='flex flex-row items-center'>
                <PartInputSelect mutation={updateParts} />
                <button
                  className='p-2 mx-2 bg-gray-300 hover:bg-gray-400 transition-colors duration-200 rounded-lg'
                  onClick={() => {
                    setModalChildren(<AddPartModal />);
                    setTitle("Dodaj część");
                    setIsOpen(true);
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <table className='shadow-lg w-full'>
              <thead className='bg-secondary'>
                <tr className='*:p-4'>
                  <th>Lp.</th>
                  <th>Nazwa</th>
                  <th>Cena</th>
                  <th>Ilość</th>
                  <th>Suma</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='even:bg-secondary'>
                {localRepair.parts.map((part, index) => (
                  <PartRecord
                    index={index}
                    part={part}
                    changePrice={changePartPrice}
                    deleteFn={deletePart}
                    key={part.id}
                  />
                ))}
                <tr className='text-center *:p-2'>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className='text-end'>
                    <b>Suma:</b>
                  </td>
                  <td>{partsTotal()}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Modal />
    </div>
  );
}
