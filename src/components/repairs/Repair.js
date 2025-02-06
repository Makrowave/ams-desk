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

import { useRef, useState } from "react";
import PartRecord from "./PartRecord";
import { useReactToPrint } from "react-to-print";
import Link from "next/link";
import { generateRepairCostsDoc, generateRepairNewDoc, printRepairDoc } from "@/util/print";
import { formatPhone } from "@/util/formatting";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const goBack = () => {
    if (!isSaved) {
      //warning
    } else {
      router.back();
    }
  };

  return (
    <div>
      <div className='flex'>
        <button className='button-primary' onClick={goBack}>
          Wróć
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
      <div>
        <section className='flex-col'>
          <div className='self-center text-center text-2xl'>
            <b>
              <h2>Zgłoszenie serwisowe #{localRepair.id}</h2>
            </b>
          </div>
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
        </section>
        <section>
          <b>Usługi</b>
          <table>
            <thead></thead>
            <tbody></tbody>
          </table>
        </section>
        <section>
          <b>Części</b>
          <table>
            <thead>
              <tr>
                <th>Lp.</th>
                <th>Nazwa</th>
                <th>Cena</th>
                <th>Ilość</th>
                <th>Jednostka</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {localRepair.parts.map((part, index) => (
                <PartRecord index={index} part={part} updateItem={updatePart} deleteItem={deletePart} />
              ))}
            </tbody>
          </table>
          <button>Dodaj</button>
        </section>
      </div>
    </div>
  );
}
