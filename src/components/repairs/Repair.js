//Service
/*
category - a maybe, category of service, ex. wheel - change spoke, change tyre, change tube
id - db
repairId - in db object, probably not here, used for relation in ORM
name - name of service
price - price of service
change - change of price - for example something costs 100pln base but can up to 200, so when it's tedious it's 170
  or some other price was negotiated.
*/
//Part - idk if they should be implemented as some constant catalogue, or flexible looking at how much work has to be done every time
//and that it is a small business. Well let's note if there were no catalogue:
/*
id - db, autogen
repairId - in db object, probably not here, used for relation in ORM
name - part's name
price - part's price
amount - amount of units
unit - there will be table for this. Basically pieces/meters/centimeters abbreviated. This will be either id or name, same as place.
  The pieces (pcs. or szt.) unit will be whole number, rest floats
*/

import { useEffect, useState } from "react";
import PartRecord from "./PartRecord";
import { generateRepairCostsDoc, generateRepairNewDoc, printRepairDoc } from "@/util/print";
import { formatPhone } from "@/util/formatting";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import ServiceRecord from "./ServiceRecord";
import ServiceInputSelect from "../filtering/ServiceInputSelect";
import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "@/api/axios";
import PartInputSelect from "../filtering/PartInputSelect";

//Well it would look the same way if it had catalogue, maybe come category
export default function Repair({ repair, updateRepair }) {
  // RepairEmployeeId = repair.RepairEmployeeId,
  // CollectionEmployeeId = repair.CollectionEmployeeId,
  // Discount = repair.Discount,
  // AdditionalCosts = repair.AdditionalCosts,
  // StatusId = repair.StatusId,
  // PlaceId = repair.PlaceId,

  const [isSaved, setIsSaved] = useState("true");
  const [localRepair, setLocalRepair] = useState(repair);

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
          })),
        })
      );
    },
  });

  const save = () => {
    mutation.mutate();
    if (mutation.isSuccess) setIsSaved(true);
  };
  const updateParts = (value) => {
    setIsSaved(false);
    const newParts = localRepair.parts;
    const id = newParts[newParts.length - 1]?.partUsedId + 1;
    const partUsed = { partUsedId: isNaN(id) ? 0 : id, part: value, amount: 1 };
    newParts.push(partUsed);

    setLocalRepair({ ...localRepair, parts: newParts });
  };

  const changePartPrice = (id, value) => {};

  const deletePart = (id) => {
    setIsSaved(false);
    console.log(id);
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
          <button className='button-primary' onClick={save}>
            Zapisz
          </button>
          <button className='button-primary' onClick={() => printRepairDoc(generateRepairNewDoc, repair)}>
            Drukuj zgłoszenie
          </button>
          <button className='button-primary' onClick={() => printRepairDoc(generateRepairCostsDoc, repair)}>
            Drukuj cennik
          </button>
        </div>
      </div>
      <section className='bg-primary mb-10 p-4 rounded-b-xl border-x-2 shadow-lg'>
        <div className='text-left text-2xl my-4 pb-2'>
          <b>
            <h2>Zgłoszenie serwisowe #{localRepair.repairId}</h2>
          </b>
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
            <div
              className={
                noteFocus
                  ? "border-border ml-auto w-fit border p-2 rounded-lg outline-blue-600 outline-double outline-2"
                  : "border-border ml-auto w-fit border p-2 rounded-lg"
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
              </tbody>
            </table>
            <button className='button-secondary'>Dodaj</button>
          </div>
        </div>
      </section>
    </div>
  );
}
