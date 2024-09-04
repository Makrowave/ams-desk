"use client";
import Navigation from "../../components/navigation/navigation";
import { useEffect, useState } from 'react';
import FetchSelect from "@/components/filtering/fetch_select";
import TableHeader from "@/components/table/table_header";
import TableBody from "@/components/table/table_body";


const defaults = {
  name: '',
  size: '',
  wheel: '',
  priceMin: 0,
  priceMax: 100000,
  number: 1,
  avail: true,
  make: '',
}

export default function Rowery() {
  //Filtering criterions
  const [name, setName] = useState(defaults.name);
  const [size, setSize] = useState(defaults.size);
  const [wheel, setWheel] = useState(defaults.wheel);
  const [priceMin, setPriceMin] = useState(defaults.priceMin);
  const [priceMax, setPriceMax] = useState(defaults.priceMax);
  const [number, setNumber] = useState(defaults.number);
  const [avail, setAvail] = useState(defaults.avail);
  const [make, setMake] = useState(defaults.make);
  const [placeCount, setPlaceNumber] = useState(6);

  //Filters after one of the states in list change
  useEffect(() => {
    filter();
  }, [name, size, wheel, priceMin, priceMax, number, avail, make]);

  function reset() {
    setName(defaults.name);
    setSize(defaults.size);
    setWheel(defaults.wheel);
    setPriceMin(defaults.priceMin);
    setPriceMax(defaults.priceMax);
    setNumber(defaults.number);
    setAvail(defaults.avail);
  }
  function filter() {

  }
  return (
    <main>
      <Navigation />  <br />
      <div className="grid grid-cols-6">
        {/* Filter */}
        <div className="col-span-1 flex bg-blue-600 rounded-lg flex-col px-10">
          {/* Title */}
          <div className="flex justify-center">
            <p>Filtruj</p>
          </div>
          {/* Name */}
          <div className="flex justify-center flex-col py-2">
            <div className="flex justify-center">
              <p>Nazwa</p>
            </div>
            <input className="text-black text-center" placeholder="Dowolny" value={name} onChange={e => { setName(e.target.value.trim().toLowerCase()) }}></input>
          </div>
          {/* Size */}
          <div className="flex justify-center flex-col py-2">
            <div className="flex justify-center">
              <p>Rozmiar</p>
            </div>
            <input className="text-black text-center" placeholder="Dowolny" value={size} onChange={e => { setSize(e.target.value) }}></input>
          </div>
          {/* Wheel size */}
          <div className="flex justify-center flex-col py-2">
            <div className="flex justify-center">
              <p>Rozmiar koła</p>
            </div>
            <div className="flex justify-center items-center py-2">
              <select className="text-black text-center" value={wheel} onChange={e => { setWheel(e.target.value) }}>
                <option value=''>Dowolny    </option>
              </select>
            </div>
          </div>
          {/* Avaible */}
          <div className="flex justify-center">
            <div className="flex justify-center items-center py-2">
              <input className="text-black text-center size-6" type="checkbox" checked={avail} onChange={e => { setAvail(!avail) }}></input>
              <p className="pl-2">Dostępny</p>
            </div>
          </div>
          {/*Manufacturer*/}
            <FetchSelect value={make} 
              onChange={e => { setMake(e.target.value)}} 
              src='https://localhost:7077/api/Manufacturers' 
              queryKey='manufacturers' 
              title = 'Producent'  
            />
        </div>
        <div className="col-span-5 flex justify-center">
          <table className="table-auto min-w-full text-center">
            <TableHeader placeCount={placeCount} />
            <TableBody
              placeCount={placeCount}
              src={"https://localhost:7077/api/Models/notSold?avaible=" + avail.toString()}
            />
          </table>
        </div>
      </div>
    </main>
  )
}