"use client";
import Navigation from "../../components/navigation/navigation";
import { useEffect, useState } from 'react';
import FetchSelect from "@/components/filtering/fetch_select";
import TableHeader from "@/components/table/table_header";
import TableBody from "@/components/table/table_body";
import FilterInput from "@/components/filtering/filter_input";
import FilterSelect from "@/components/filtering/filter_select";
import SingleCheckbox from "@/components/filtering/single_checkbox";


const defaults = {
  name: '',
  size: '',
  wheel: '',
  priceMin: 0,
  priceMax: 100000,
  number: 1,
  avail: true,
  ready: false,
  electric: false,
  make: '',
}

export default function Rowery() {
  //Filtering criterions
  const [name, setName] = useState(defaults.name);
  const [size, setSize] = useState(defaults.size);
  const [wheel, setWheel] = useState(defaults.wheel);
  const [number, setNumber] = useState(defaults.number);
  const [avail, setAvail] = useState(defaults.avail);
  const [ready, setReady] = useState(defaults.ready);
  const [electric, setElectric] = useState(defaults.electric);
  const [make, setMake] = useState(defaults.make);
  const [placeCount, setPlaceNumber] = useState(6);

  //Filters after one of the states in list change
  useEffect(() => {
    filter();
  }, [name, size, wheel, number, avail, ready, electric, make]);

  function reset() {
    setName(defaults.name);
    setSize(defaults.size);
    setWheel(defaults.wheel);
    setNumber(defaults.number);
    setAvail(defaults.avail);
    setElectric(defaults.electric);
    setMake(defaults.make);
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
          <FilterInput
            title="Nazwa"
            value={name}
            onChange={e => { setName(e.target.value) }}
          />
          {/* Size */}
          <FilterInput
            title="Rozmiar"
            value={size}
            onChange={e => { setSize(e.target.value) }}
          />
          {/* Wheel size */}
          <FilterSelect
            title="Rozmiar koła"
            value={wheel}
            onChange={e => { setWheel(e.target.value) }}
          >
            <option value=''> Dowolny </option>
            <option value='12'> 12 </option>
            <option value='14'> 14 </option>
            <option value='16'> 16 </option>
            <option value='20'> 20 </option>
            <option value='24'> 24 </option>
            <option value='26'> 26 </option>
            <option value='27'> 27 </option>
            <option value='28'> 28 </option>
            <option value='29'> 29 </option>
          </FilterSelect>
          {/* Avaible */}
          <SingleCheckbox
            checked={avail}
            onChange={e => { setAvail(!avail) }}
            title="Dostępny" />
          {/* Ready */}
          <SingleCheckbox
            checked={ready}
            onChange={e => { setReady(!ready) }}
            title="Złożony" />
          {/* Electric */}
          <SingleCheckbox
            checked={electric}
            onChange={e => { setElectric(!electric) }}
            title="Elektryczny" />
          {/*Manufacturer*/}
          <FetchSelect value={make}
            onChange={e => { setMake(e.target.value) }}
            src='https://localhost:7077/api/Manufacturers'
            queryKey='manufacturers'
            title='Producent'
            default_option={defaults.make}
          />
        </div>
        {/*Table*/}
        <div className="col-span-5 flex justify-center">
          <table className="table-auto min-w-full text-center">
            <TableHeader placeCount={placeCount} />
            <TableBody
              placeCount={placeCount}
              src={"https://localhost:7077/api/Models/notSold"
                + '?avaible=' + avail.toString()
                + '&manufacturer_id=' + make.toString()
                + '&wheel_size=' + wheel.toString()
                + '&frame_size=' + size.toString()
                + '&name=' + name.trim().toLowerCase()
                + '&electric=' + electric.toString()
                + '&ready=' + ready.toString()
              }
            />
          </table>
        </div>
      </div>
    </main>
  )
}