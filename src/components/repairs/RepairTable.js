"use client";
import {FaPlus} from "react-icons/fa6";
import RepairRecord from "./RepairRecord";
import useModal from "@/hooks/useModal";
import NewRepairModal from "../modals/record/repair/NewRepairModal";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {usePlacesNotStorageQuery} from "@/hooks/queryHooks";

export default function RepairTable({src, addButton, localKey}) {
  const axiosPrivate = useAxiosPrivate();
  const storageKey = `repairTable.${localKey}`;
  const [place, setPlace] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(storageKey);
      return isNaN(Number(storedValue)) ? 0 : Number(storedValue);
    }
    return 0;
  });
  const [phone, setPhone] = useState("");
  const getSrc = () => `${src}&place=${place}`;

  const {data, isPending, isError, error} = useQuery({
    queryKey: [getSrc()],
    queryFn: async () => {
      const response = await axiosPrivate.get(getSrc());
      return response.data;
    },
  });

  const {data: placesData, isError: isPlacesError, isLoading: isPlacesLoading} = usePlacesNotStorageQuery();

  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  const places = createPlaces(!isPlacesLoading && !isPlacesError ? placesData : []);

  return (
    <div>
      <div className='flex justify-between items-center h-12'>
        <div className='flex h-full'>
          {places.map((p) => (
            <HeaderButton
              onClick={(id) => {
                setPlace(id);
                localStorage.setItem(storageKey, id);
              }}
              key={p.placeId}
              id={p.placeId}
              selected={place === p.placeId}
              text={p.placeName}
            />
          ))}
        </div>
        <div className='flex items-center'>
          <div className='flex p-2'>
            <input
              className='border-border border rounded-lg w-32 text-center'
              placeholder='Telefon'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {addButton && (
            <button
              className='flex justify-center items-center hover:bg-gray-400 transition-colors duration-200 rounded-lg w-fit h-fit p-2'
              onClick={() => {
                setIsModalOpen(true);
                setModalContent(<NewRepairModal/>);
                setModalTitle("Nowe zgłoszenie");
              }}
            >
              <FaPlus className='w-6 h-6'/>
            </button>
          )}
        </div>
      </div>
      <div className='text-base max-h-[500px] overflow-y-auto'>
        <table
          className={
            place === 0
              ? "w-[900px] border-separate border-spacing-0 border rounded-b-lg rounded-tr-lg *:*:*:p-3"
              : "w-[900px] border-separate border-spacing-0 border rounded-b-lg rounded-t-lg *:*:*:p-3"
          }
        >
          <thead>
          <tr className='*:bg-secondary'>
            <th>Nr.</th>
            <th>Data</th>
            <th className={"min-w-40"}>Telefon</th>
            <th>Rower</th>
            <th>Status</th>
            <th>Miejsce</th>
            <th className='rounded-tr-lg'></th>
          </tr>
          </thead>
          <tbody className=''>
          {isPending && <tr>
            <td colSpan={6} className="text-center">Ładowanie...</td>
          </tr>}
          {!isPending && !isError && data.length === 0 && <tr>
            <td colSpan={6} className="text-center">Brak zgłoszeń</td>
          </tr>}
          {!isPending &&
            !isError &&
            data
              .filter((row) => row.phoneNumber.includes(phone))
              .map((row, index) => <RepairRecord last={index === data.length - 1} repair={row}
                                                 key={row.id}/>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HeaderButton({selected, onClick, id, text}) {
  return (
    <button
      className={selected ? "p-2 w-fit rounded-t-lg h-full bg-secondary" : "p-2 w-fit rounded-t-lg h-full"}
      onClick={() => onClick(id)}
    >
      {text}
    </button>
  );
}

const createPlaces = (places) => {
  return [{placeId: 0, placeName: "Wszystkie"}, ...places];
};
