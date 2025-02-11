//Repair most likely will be:
//Repair details established when taking in the bike
/*
id - auto generated id for db. INT
phone - client's phone number, STRING
bike - client's bike as noted by employee, STRING
issue - issue description, STRING
date - date of admission, DATE
place - place of admission, placeId or place name, INT | STRING
status - db entity
*/
//Details after jobs is done:
/* 
services - services billed by employee, Service[]
parts - parts used, Part[]
noteForClient - info read or shown to client about why something costed more
serviceNote - info for employee, if they want to note it digitally instead of paper, to note what has been done if they forget it tommorow,
  or they are absent and somebody else works on it, or bike is moved to another point
*/
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

import { useState } from "react";
import PartRecord from "./PartRecord";
import { generateRepairCostsDoc, generateRepairNewDoc, printRepairDoc } from "@/util/print";
import { formatPhone } from "@/util/formatting";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

//Well it would look the same way if it had catalogue, maybe come category
export default function Repair({ repair, updateRepair }) {
  const [isSaved, setIsSaved] = useState("true");
  const [localRepair, setlocalRepair] = useState(repair);
  const save = () => {
    setIsSaved(true);
  };
  const updatePart = (value) => {
    setIsSaved(false);
    setlocalRepair((prev) => {
      const newParts = prev.parts.map((part) => {
        return part.id === value.id ? value : part;
      });
      return { ...prev, parts: newParts };
    });
  };

  const deletePart = (id) => {
    setIsSaved(false);
    setlocalRepair((prev) => {
      const newParts = prev.parts.filter((part) => part.id !== id);
      return { ...prev, parts: newParts };
    });
  };

  const updateService = (value) => {
    setIsSaved(false);
    setlocalRepair((prev) => {
      const newServices = prev.services.map((service) => {
        return service.id === id ? value.id : service;
      });
      return { ...prev, services: newServices };
    });
  };

  const deleteService = (id) => {
    setIsSaved(false);
    setlocalRepair((prev) => {
      const newServices = prev.services.filter((service) => service.id !== id);
      return { ...prev, parts: newServices };
    });
  };

  const router = useRouter();

  const goBack = () => {
    if (!isSaved) {
      //warning
    } else {
      router.back();
    }
  };

  return (
    <div className='flex-col rounded-2xl h-full'>
      <div className='flex bg-white rounded-t-xl border-gray-400 border-t-2 border-x-2 p-2'>
        <button className='rounded-lg p-2 hover:bg-gray-300 transition-colors duration-200' onClick={goBack}>
          <FaArrowLeft />
        </button>
        <div className='ml-auto flex gap-4'>
          <button className='button-primary'>Zapisz</button>
          <button className='button-primary' onClick={() => printRepairDoc(generateRepairNewDoc, repair)}>
            Drukuj zgłoszenie
          </button>
          <button className='button-primary' onClick={() => printRepairDoc(generateRepairCostsDoc, repair)}>
            Drukuj cennik
          </button>
        </div>
      </div>
      <section className='bg-primary mb-10 p-4 rounded-b-xl border-gray-400 border-b-2 border-x-2 shadow-lg'>
        <div className='text-left text-2xl my-4 pb-2'>
          <b>
            <h2>Zgłoszenie serwisowe #{localRepair.id}</h2>
          </b>
        </div>
        <section className='flex place-content-between pb-4 mt-4'>
          <div className='flex-col flex-1'>
            <div>
              <span className='block'>
                <b>Data</b>
              </span>
              <span>{new Date(repair.date).toLocaleDateString("pl-PL")}</span>
            </div>
            <div>
              <span className='block'>
                <b>Telefon</b>
              </span>
              <span>{formatPhone(localRepair.phone)}</span>
            </div>
            <div>
              <span className='block'>
                <b>Rower</b>
              </span>
              <span>{localRepair.bike}</span>
            </div>
            <div>
              <span className='block'>
                <b>Treść</b>
              </span>
              <span>{localRepair.issue}</span>
            </div>
          </div>
          <div className='flex-col flex-1 justify-end'>
            <div className='ml-auto w-fit'>
              <b className='block'>Notatka</b>
              <textarea
                className='border-border border'
                cols={50}
                rows={10}
                placeholder='Notatka'
                value={localRepair.note}
                onChange={(value) => {}}
              />
            </div>
          </div>
        </section>
      </section>
      <section className='flex place-content-between gap-10'>
        <div className='bg-primary w-full p-8 rounded-xl border-gray-400 border-2 shadow-lg'>
          <b className='bg-secondary p-2 rounded-t-md'>Usługi</b>
          <table>
            <thead className='bg-secondary'>
              <tr className='*:p-2'>
                <th>Lp.</th>
                <th>Nazwa</th>
                <th>Cena</th>
                <th>Upust</th>
                <th></th>
              </tr>
            </thead>
            <tbody className='even:bg-secondary'>
              {localRepair.parts.map((service, index) => (
                <PartRecord
                  index={index}
                  part={service}
                  updateItem={updateService}
                  deleteItem={deleteService}
                  key={service.id}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className='bg-primary w-full p-8 rounded-xl border-gray-400 border-2 shadow-lg'>
          <b className='bg-secondary p-2 rounded-t-md '>Części</b>
          <table>
            <thead className='bg-secondary'>
              <tr className='*:p-2'>
                <th>Lp.</th>
                <th>Nazwa</th>
                <th>Cena</th>
                <th>Ilość</th>
                <th>Jednostka</th>
                <th></th>
              </tr>
            </thead>
            <tbody className='even:bg-secondary'>
              {localRepair.parts.map((part, index) => (
                <PartRecord index={index} part={part} updateItem={updatePart} deleteItem={deletePart} key={part.id} />
              ))}
            </tbody>
          </table>
          <button className='button-secondary'>Dodaj</button>
        </div>
      </section>
    </div>
  );
}
