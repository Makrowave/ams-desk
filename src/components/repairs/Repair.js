import {useEffect, useRef, useState} from "react";
import PartRecord from "./PartRecord";
import {generateRepairCostDoc, generateRepairNewDoc, printRepairCostDoc, printRepairDoc} from "@/util/print";
import {formatPhone} from "@/util/formatting";
import {useRouter} from "next/navigation";
import {FaArrowLeft, FaFloppyDisk, FaPlus} from "react-icons/fa6";
import ServiceRecord from "./ServiceRecord";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {axiosPrivate} from "@/api/axios";
import useModal from "@/hooks/useModal";
import Modal from "../modals/Modal";
import {QUERY_KEYS} from "@/util/query_keys";
import useSavedData from "@/hooks/useSavedData";
import SavedDataWarning from "../navigation/SavedDataWarning";
import ServiceSelect from "@/components/filtering/ServiceSelect";
import PartSelect from "@/components/filtering/PartSelect";
import AddPartModal from "@/components/modals/repair/AddPartModal";
import StatusButtons from "@/components/repairs/StatusButtons";
import SaveIndicator from "@/components/repairs/SaveIndicator";

export default function Repair({repair}) {
  const {isSaved, setIsSaved, updateIsUsed} = useSavedData();
  const [localRepair, setLocalRepair] = useState(repair);
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  const noteTimeoutRef = useRef(null);

  const setChangeTimeoutRef = () => {
    setSaveStatus("");
    clearTimeout(noteTimeoutRef.current);
    noteTimeoutRef.current = setTimeout(() => {
      repairMutation.mutate()
    }, 2000)

  }

  const queryClient = useQueryClient();
  const [saveStatus, setSaveStatus] = useState("success");
  const {data, isError, isLoading, error} = useQuery({
    queryKey: [QUERY_KEYS.Employees],
    queryFn: async () => {
      const response = await axiosPrivate.get("Employees");
      return response.data;
    },
  });


  const employeeMutation = useMutation({
    mutationFn: async ([id, collection]) => {
      setSaveStatus("");
      const response = await axiosPrivate.put(
        `repairs/employee/${localRepair.repairId}?employeeId=${id}&collection=${collection}`
      );
      return response.data;
    },
    onSuccess: async (data) => {
      setIsSaved(true);
      queryClient.setQueryData([QUERY_KEYS.Repairs, repair.repairId], (oldData) => {
        const result = {
          ...oldData,
          repairEmployeeName: data.repairEmployeeName,
          repairEmployeeId: data.repairEmployeeId,
        };
        setLocalRepair(result);
        setSaveStatus("success");
        return result;
      })
    },
    onError: async (error) => {
      setSaveStatus("error");
    }
  });


  const repairMutation = useMutation({
    mutationFn: async () => {
      setSaveStatus("");
      const response = await axiosPrivate.put(
        `repairs/${localRepair.repairId}`,
        JSON.stringify({
          ...localRepair,
          services: localRepair.services.map((service) => ({
            serviceDoneId: service.serviceDoneId > 0 ? service.serviceDoneId : 0,
            serviceId: service.service.serviceId,
            repairId: localRepair.repairId,
            price: service.price,
          })),
          parts: localRepair.parts.map((part) => ({
            partUsedId: part.partUsedId > 0 ? part.partUsedId : 0,
            partId: part.part.partId,
            repairId: localRepair.repairId,
            amount: part.amount,
            price: part.price,
          })),
          status: null,
        })
      );
      return response.data;
    },
    onSuccess: async (data) => {
      setLocalRepair(data);
      setIsSaved(true);
      queryClient.setQueryData([QUERY_KEYS.Repairs, repair.repairId], () => {
        return data;
      })
      setSaveStatus("success");
    },
    onError: () => {
      setSaveStatus("error");
    }
  });

  const save = async () => {
    await repairMutation.mutate();
  };

  const [newPartId, setNewPartId] = useState(-1);
  const updateParts = (value) => {
    setIsSaved(false);
    const newParts = localRepair.parts;
    const id = newPartId;
    setNewPartId(id - 1);
    const partUsed = {partUsedId: isNaN(id) ? -1 : id, part: value, amount: 1, price: value.price};
    newParts.push(partUsed);
    setLocalRepair({...localRepair, parts: newParts});
    repairMutation.mutate();
  };

  const changePartAmount = (id, value) => {
    setIsSaved(false);
    const newParts = localRepair.parts.map((part) => (part.partUsedId === id ? {...part, amount: value} : part));
    setLocalRepair({...localRepair, parts: newParts});
    repairMutation.mutate();
  };

  const deletePart = (id) => {
    setIsSaved(false);
    const newParts = localRepair.parts.filter((part) => part.partUsedId !== id);
    setLocalRepair({...localRepair, parts: newParts});
    repairMutation.mutate();
  };
  const [newServiceId, setNewServiceId] = useState(-1);
  const updateServices = (value) => {
    setIsSaved(false);
    const newServices = localRepair.services;
    const id = newServiceId;
    setNewServiceId(id - 1);
    const serviceDone = {serviceDoneId: isNaN(id) ? -1 : id, service: value, price: value.price};
    newServices.push(serviceDone);
    setLocalRepair({...localRepair, services: newServices});
    repairMutation.mutate();
  };

  const deleteService = (id) => {
    setIsSaved(false);
    const newServices = localRepair.services.filter((service) => service.serviceDoneId !== id);
    setLocalRepair({...localRepair, services: newServices});
    repairMutation.mutate();
  };

  const handleRepEmployeeChange = async (id) => {
    await employeeMutation.mutate([id, false]);
  };

  const changeDiscount = (value) => {
    setIsSaved(false);
    setLocalRepair({...localRepair, discount: value.replace(/[^0-9]/g, "")});
    setChangeTimeoutRef()
  };
  const changeCosts = (value) => {
    setIsSaved(false);
    setLocalRepair({...localRepair, additionalCosts: value.replace(/[^0-9]/g, "")});
    setChangeTimeoutRef()
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
            <FaArrowLeft/>
          </SavedDataWarning>
        </button>
        <div className='ml-auto flex gap-4'>
          <button onClick={save} className="button-primary">
            <FaFloppyDisk/>
          </button>
          <SaveIndicator status={saveStatus}/>
          <button className='button-primary'
                  onClick={() => printRepairDoc(generateRepairNewDoc, localRepair)}>
            Drukuj zgłoszenie
          </button>
          <button className='button-primary'
                  onClick={() => printRepairCostDoc(generateRepairCostDoc, localRepair)}>
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
              style={{backgroundColor: localRepair.status.color}}
            >
              {localRepair.status.name}
            </div>
          </div>
          <StatusButtons localRepair={localRepair} setIsSaved={setIsSaved} setLocalRepair={setLocalRepair}
                         setSaveStatus={setSaveStatus}/>
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
                    <td className='text-end'>{servicesTotal().toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Części</td>
                    <td className='text-end'>{partsTotal().toFixed(2)}</td>
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
                      {(servicesTotal() +
                        partsTotal() +
                        Number(localRepair.additionalCosts) -
                        Number(localRepair.discount)).toFixed(2)}
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
              <span className="whitespace-pre-wrap">{localRepair.issue}</span>
            </div>
          </div>
          <div className='flex-col flex-1 justify-end '>
            <div className='flex justify-end mb-4'>
              <div className='p-1 border-gray-300 border rounded-lg w-40 flex flex-col'>
                  <span className='text-base'>
                    <b>Kto przyjmował</b>
                  </span>
                <span>{localRepair.takeInEmployeeName}</span>
              </div>
              {localRepair.repairEmployeeId !== null && (
                <div className='p-1 border-gray-300 border rounded-lg w-40 flex flex-col ml-4'>
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
                  setLocalRepair({...localRepair, note: e.target.value});
                  setIsSaved(false);
                  setChangeTimeoutRef()
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
            <div
              className='flex items-center justify-between p-2 border-gray-300 border-b rounded-t-lg bg-secondary'>
              <b className='p-2'>Usługi</b>
              <ServiceSelect mutation={updateServices}/>
            </div>

            <table className='shadow-lg w-full text-lg'>
              <thead className='bg-secondary'>
              <tr className='*:p-2'>
                <th>Lp.</th>
                <th>Nazwa</th>
                <th>Cena</th>
                <th></th>
              </tr>
              </thead>
              <tbody className='even:bg-secondary'>
              {localRepair.services.map((service, index) => (
                <ServiceRecord index={index} service={service} key={service.serviceDoneId}
                               deleteFn={deleteService}/>
              ))}
              <tr className='text-center *:p-2'>
                <td></td>
                <td className='text-end'>
                  <b>Suma:</b>
                </td>
                <td>{servicesTotal().toFixed(2)}</td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='bg-primary w-7/12 p-8 rounded-xl  shadow-lg'>
          <div className='w-full'>
            <div
              className='flex items-center justify-between p-2 border-gray-300 border-b rounded-t-lg bg-secondary'>
              <b className='p-2'>Części</b>
              <div className='flex flex-row items-center'>
                <PartSelect mutation={updateParts}/>
                <button
                  className='absolute -top-3 right-1 p-2 mx-2 bg-gray-300 hover:bg-gray-400 transition-colors duration-200 rounded-lg'
                  onClick={() => {
                    setModalContent(<AddPartModal/>);
                    setModalTitle("Dodaj część");
                    setIsModalOpen(true);
                  }}
                >
                  <FaPlus/>
                </button>
              </div>
            </div>
            <table className='shadow-lg w-full text-lg'>
              <thead className='bg-secondary'>
              <tr className='*:p-2'>
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
                  changeAmount={changePartAmount}
                  deleteFn={deletePart}
                  key={part.partUsedId}
                />
              ))}
              <tr className='text-center *:p-2'>
                <td></td>
                <td></td>
                <td></td>
                <td className='text-end'>
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
      <Modal/>
    </div>
  );
}
