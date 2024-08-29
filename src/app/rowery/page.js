"use client";
import Navigation from "../../components/navigation/navigation";
import BikeRecord from "../../components/bike_record";
import { useEffect, useState } from 'react';
import FetchSelect from "@/components/filtering/fetch_select";


const sample = [
  { name: "KR Esker 2.0 M 28 L bra_beż p", size: 20, wheel: 28, price: 4999, number: 3, gala: 0, gesia: 0, wojc: 1, a: 2, b: 0, d: 0, avail: 2 },
  { name: "KR Evado 1.0 D 28 L grf_mal m", size: 19, wheel: 28, price: 1699, number: 0, gala: 0, gesia: 0, wojc: 0, a: 0, b: 0, d: 0, avail: 0 },
  { name: "KR Evado 5.0 D 28 M tur_zie p", size: 17, wheel: 28, price: 3499, number: 3, gala: 0, gesia: 1, wojc: 0, a: 2, b: 0, d: 0, avail: 2 },
  { name: "KR Evado Hybrid 1.0 D 28 M bia_tur p", size: 17, wheel: 28, price: 5499, number: 2, gala: 1, gesia: 0, wojc: 0, a: 2, b: 0, d: 0, avail: 2 },
]

const defaults = {
  name: '',
  size: '',
  wheel: '',
  priceMin: 0,
  priceMax: 100000,
  number: 1,
  avail: false,
  make: '',
}

export default function Rowery() {
  //List that is later rendered
  const [viewList, setViewList] = useState(sample);
  //Filtering criterions
  const [name, setName] = useState(defaults.name);
  const [size, setSize] = useState(defaults.size);
  const [wheel, setWheel] = useState(defaults.wheel);
  const [priceMin, setPriceMin] = useState(defaults.priceMin);
  const [priceMax, setPriceMax] = useState(defaults.priceMax);
  const [number, setNumber] = useState(defaults.number);
  const [avail, setAvail] = useState(defaults.avail);
  const [make, setMake] = useState(defaults.make);

  //Filters after one of the states in list change
  useEffect(() => {
    filter();
  }, [name, size, wheel, priceMin, priceMax, number, avail, make]);

  //List of records that are later rendered
  const bikes = viewList.map(bike =>
    <BikeRecord bike={bike} key={bike.name} />
  )
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
          {/* Wheel size */}
          <div className="flex justify-center flex-col py-2">
            <div className="flex justify-center">
              <p>Producent</p>
            </div>
            <div className="flex justify-center items-center py-2">
              <select className="text-black text-center" value={make} onChange={e => { setMake(e.target.value) }}>
                <option value=''> Dowolny </option>
                <FetchSelect src='https://localhost:7077/api/Manufacturers' queryKey='manufacturers' />
              </select>
            </div>
          </div>
        </div>
        <div className="col-span-5 flex justify-center">
          <table className="table-auto min-w-full text-center">
            <thead>
              <tr>
                <th>Rower</th>
                <th>Rozmiar</th>
                <th>Koła</th>
                <th>Cena</th>
                <th>Ilość</th>
                <th>Gala</th>
                <th>Gęsia</th>
                <th>Wojc</th>
                <th>A</th>
                <th>B</th>
                <th>D</th>
                <th>Wolne</th>
              </tr>
            </thead>
            <tbody>
              {bikes}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}