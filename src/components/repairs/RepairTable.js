"use client";
import { FaPlus } from "react-icons/fa6";
import RepairRecord from "./RepairRecord";
import useModal from "@/hooks/useModal";
import NewRepairModal from "../modals/record/repair/NewRepairModal";

export default function RepairTable({}) {
  const repairs = [
    {
      id: 1,
      phone: "909303303",
      bike: "Kross evado",
      date: Date.now(),
      place: "Wojc",
      issue: "Wymiana dętki",
      status: "Przyjęte",
      services: [],
      parts: [],
    },
    {
      id: 2,
      phone: "303404303",
      bike: "Kross hexagon",
      date: Date.now(),
      place: "Wojc",
      issue: "Wymiana dętki, sprawdzenie opon, wymiana klocków hamulcowych",
      status: "Przyjęte",
      services: [],
      parts: [],
    },
    {
      id: 3,
      phone: "303404303",
      bike: "Kross hexagon",
      date: Date.now(),
      place: "Wojc",
      issue: "Wymiana dętki, sprawdzenie opon, wymiana klocków hamulcowych",
      status: "Przyjęte",
      services: [],
      parts: [],
    },
    {
      id: 4,
      phone: "303404303",
      bike: "Kross hexagon",
      date: Date.now(),
      place: "Wojc",
      issue: "Wymiana dętki, sprawdzenie opon, wymiana klocków hamulcowych",
      status: "Przyjęte",
      services: [],
      parts: [],
    },
  ];

  const { setIsOpen, setModalChildren, setTitle } = useModal();

  return (
    <div>
      <div className='flex justify-between items-center h-12'>
        <div className='flex h-full'>
          <div className='p-2 bg-secondary w-fit rounded-t-lg h-full'>Wojc</div>
          <div className='p-2 bg-primary w-fit rounded-t-lg'>Gala</div>
          <div className='p-2 bg-primary w-fit rounded-t-lg'>Gęsia</div>
        </div>
        <div className='flex items-center'>
          <div className='flex p-2'>
            <input className='border-border border rounded-lg w-32 text-center' placeholder='Telefon' />
          </div>
          <button
            className='flex justify-center items-center hover:bg-gray-400 transition-colors duration-200 rounded-lg w-fit h-fit p-2'
            onClick={() => {
              setIsOpen(true);
              setModalChildren(<NewRepairModal />);
              setTitle("Nowe zgłoszenie");
            }}
          >
            <FaPlus className='w-6 h-6' />
          </button>
        </div>
      </div>
      <div>
        <table className='w-[1000px] border-separate border-spacing-0 border rounded-b-lg rounded-tr-lg *:*:*:p-3'>
          <thead>
            <tr className=' *:bg-secondary'>
              <th>Nr.</th>
              <th>Data</th>
              <th>Telefon</th>
              <th>Status</th>
              <th>Miejsce</th>
              <th className='rounded-tr-lg'></th>
            </tr>
          </thead>
          <tbody className=''>
            {repairs.map((row, index) => (
              <RepairRecord last={index === repairs.length - 1} repair={row} key={row.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
