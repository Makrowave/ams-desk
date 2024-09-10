"use client";
import Navigation from "../../components/navigation/navigation";
import { useEffect, useState } from 'react';
import FetchSelect from "@/components/filtering/fetch_select";
import TableHeader from "@/components/table/table_header";
import TableBody from "@/components/table/table_body";
import FilterInput from "@/components/filtering/filter_input";
import FilterSelect from "@/components/filtering/filter_select";
import SingleCheckbox from "@/components/filtering/single_checkbox";
import Modal from "@/components/modals/modal";
import AddModelModal from "@/components/modals/add_model_modal";


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
    setElectric(defaults.electric);
    setMake(defaults.make);
  }
  function filter() {

  }
  return (
    <main className="overflow-auto h-full">
      <Navigation active={1} />
      <div className="grid grid-cols-6 max-w-screen-2xl m-auto bg-slate-100 px-5 py-5 rounded-b-xl">
        {/* Filter */}
        <div className="col-span-1 flex bg-slate-100 flex-col px-10 h-fit">
          {/* Title */}
          <div className="flex justify-center">
            <h2><b>Filtry</b></h2>
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
        <div className="col-span-5 flex justify-center mx-4 border-l-2 pl-5 border-slate-300">
          <table className="table-fixed min-w-full text-center">
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
      <div className="fixed bottom-0 align-center  flex w-full pointer-events-none">
        <div className="justify-between max-w-screen-2xl w-full m-auto px-5">
            <Modal buttonTitle='+ Dodaj model' 
            buttonClassName="bg-slate-100 mb-10 max-w-60 rounded-2xl py-2 px-5 border-2 border-slate-400 ml-auto block"
            title='Dodaj model'
            >
              <AddModelModal/>
            </Modal>
        </div>
      </div>
    </main>
  )
}