import { useEffect, useState } from "react";
import PartRecord from "./PartRecord";
import { generateRepairCostsDoc, generateRepairNewDoc, printRepairDoc } from "@/util/print";
import { formatPhone } from "@/util/formatting";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaBoxOpen,
  FaCheck,
  FaFlagCheckered,
  FaFloppyDisk,
  FaHourglass,
  FaPhone,
  FaShield,
  FaWrench,
} from "react-icons/fa6";
import ServiceRecord from "./ServiceRecord";
import ServiceInputSelect from "../filtering/ServiceInputSelect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "@/api/axios";
import PartInputSelect from "../filtering/PartInputSelect";
import ExpandButton from "../buttons/ExpandButton";
import useModal from "@/hooks/useModal";
import RepairModal from "../modals/repair/RepairModal";
import Modal from "../modals/Modal";

export default function Repair({ repair }) {
  const [isSaved, setIsSaved] = useState("true");
  const [localRepair, setLocalRepair] = useState(repair);
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        `repairs/${localRepair.repairId}`,
        JSON.stringify({
          ...localRepair,
          services: localRepair.services.map((service) => ({
            serviceDoneId: service.serviceDoneId,
            serviceId: service.service.serviceId,
            repairId: localRepair.repairId,
          })),
          parts: localRepair.parts.map((part) => ({
            partUsedId: part.partUsedId,
            partId: part.part.partId,
            repairId: localRepair.repairId,
            amount: part.amount,
          })),
          status: null,
        })
      );
    },
    onSuccess: () => {
      setIsSaved(true);
      queryClient.refetchQueries({
        queryKey: ["repairs"],
        exact: false,
      });
    },
  });

  const save = () => {
    mutation.mutate();
  };
  const updateParts = (value) => {
    setIsSaved(false);
    const newParts = localRepair.parts;
    const id = newParts[newParts.length - 1]?.partUsedId + 1;
    const partUsed = { partUsedId: isNaN(id) ? 0 : id, part: value, amount: 1 };
    newParts.push(partUsed);

    setLocalRepair({ ...localRepair, parts: newParts });
  };

  const changePartPrice = (id, value) => {
    setIsSaved(false);
    console.log(id, value);
    const newParts = localRepair.parts.map((part) => (part.partUsedId === id ? { ...part, amount: value } : part));
    console.log(newParts);

    setLocalRepair({ ...localRepair, parts: newParts });
  };

  const deletePart = (id) => {
    setIsSaved(false);
    const newParts = localRepair.parts.filter((part) => part.partUsedId !== id);
    setLocalRepair({ ...localRepair, parts: newParts });
  };

  const updateServices = (value) => {
    setIsSaved(false);
    const newServices = localRepair.services;
    const id = newServices[newServices.length - 1]?.serviceDoneId + 1;
    const serviceDone = { serviceDoneId: isNaN(id) ? 0 : id, service: value };
    newServices.push(serviceDone);
    setLocalRepair({ ...localRepair, services: newServices });
  };

  const deleteService = (id) => {
    setIsSaved(false);
    const newServices = localRepair.services.filter((service) => service.serviceDoneId !== id);
    setLocalRepair({ ...localRepair, services: newServices });
  };

  const changeStatus = (id) => {
    setLocalRepair({ ...localRepair, statusId: id });
    save();
  };

  const handleColEmployeeChange = (employeeId, statusId) => {
    setLocalRepair({ ...localRepair, collectionEmployeeId: employeeId, statusId: statusId });
    save();
  };

  const handleRepEmployeeChange = (employeeId, statusId) => {
    setLocalRepair({ ...localRepair, repairEmployeeId: employeeId, statusId: statusId });
    save();
  };

  const router = useRouter();

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

  const [noteFocus, setNoteFocus] = useState(false);

  return (
    <div className='flex-col rounded-2xl h-full'>
      <div className='flex bg-white rounded-t-xl border-x-2 p-4'>
        <button
          className='rounded-lg p-2 hover:bg-gray-300 transition-colors duration-200'
          onClick={() => router.back()}
        >
          <FaArrowLeft />
        </button>
        <div className='ml-auto flex gap-4'>
          <ExpandButton className='button-primary' text={"Zapisz"} onClick={save}>
            <FaFloppyDisk />
          </ExpandButton>
          <button className='button-primary' onClick={() => printRepairDoc(generateRepairNewDoc, repair)}>
            Drukuj zgłoszenie
          </button>
          <button className='button-primary' onClick={() => printRepairDoc(generateRepairCostsDoc, repair)}>
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
              style={{ backgroundColor: repair.status.color }}
            >
              {repair.status.name}
            </div>
          </div>
          <div className='flex items-center gap-x-2 text-xl'>
            <ExpandButton
              disabled={localRepair.statusId !== 1}
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Rozpocznij'
              onClick={() => {
                if (localRepair.statusId !== 1) return;
                setTitle("Rozpocznij naprawę");
                setModalChildren(
                  <RepairModal
                    employeeId={localRepair.status.repairEmployeeId}
                    label='Kto naprawia'
                    employeeFn={handleRepEmployeeChange}
                    statusId={3}
                  />
                );
                setIsOpen(true);
              }}
            >
              <FaWrench />
            </ExpandButton>
            <ExpandButton
              disabled={localRepair.statusId === 7 || localRepair.statusId === 1}
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Oczekuj części'
              onClick={() => {
                changeStatus(4);
              }}
            >
              <FaHourglass />
            </ExpandButton>
            <ExpandButton
              disabled={localRepair.statusId === 7 || localRepair.statusId === 1}
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Gwarancja'
              onClick={() => {
                changeStatus(2);
              }}
            >
              <FaShield />
            </ExpandButton>
            <ExpandButton
              disabled={localRepair.statusId === 7 || localRepair.statusId === 1}
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
              disabled={localRepair.statusId === 7 || localRepair.statusId === 1}
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Zakończ'
              onClick={() => {
                changeStatus(5);
              }}
            >
              <FaCheck />
            </ExpandButton>
            <ExpandButton
              disabled={localRepair.statusId === 7 || localRepair.statusId === 1}
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Powiadom'
              onClick={() => {
                changeStatus(6);
              }}
            >
              <FaPhone />
            </ExpandButton>
            <ExpandButton
              disabled={localRepair.statusId === 7 || localRepair.statusId === 1}
              className='button-primary'
              disabledClass='hover:bg-gray-300 bg-gray-300'
              text='Wydaj'
              onClick={() => {
                setTitle("Wydaj rower");
                setModalChildren(
                  <RepairModal
                    employeeId={localRepair.status.repairEmployeeId}
                    label='Kto wydaje'
                    employeeFn={handleColEmployeeChange}
                    statusId={7}
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
                <span>{new Date(repair.arrivalDate).toLocaleDateString("pl-PL")}</span>
              </div>
              {localRepair.collectionDate !== null && (
                <div className='border-gray-300 border-2 rounded-lg p-2 w-40 ml-4'>
                  <span className='block text-base'>
                    <b>Data wydania</b>
                  </span>
                  <span>{new Date(repair.collectionDate).toLocaleDateString("pl-PL")}</span>
                </div>
              )}
            </div>
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
                  <span>{localRepair.repairEmployeeName}</span>
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
              <b className='block'>Notatka</b>
              <textarea
                className='focus:outline-none'
                cols={50}
                rows={10}
                placeholder='Notatka'
                value={localRepair.note ?? ""}
                onChange={(e) => {
                  setLocalRepair({ ...localRepair, note: e.target.value });
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
                  <td>{localRepair.services.reduce((acc, s) => acc + s.service.price, 0)}</td>
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
              <PartInputSelect mutation={updateParts} />
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
                  <td>{localRepair.parts.reduce((acc, p) => acc + p.part.price * p.amount, 0)}</td>
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
