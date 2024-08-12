"use client";
import Navigation from "../navigation";
import BikeRecord from "./bike_record";
import { useEffect, useState } from 'react';


const shop = {
  WOJC: 1,
  GALA: 2,
  GESIA: 3,
  A: 4,
  B: 5,
  D: 6,
}

const status = {
  READY: 1,
  BOX: 2,
  WARRANTY: 3,
  INTERNET_SALE: 4,
  RESERVED: 5,
}

const type = {
  MAN: 1,
  WOMAN: 2,
}
const makes = {
  KROSS: 1,
  MAXIM: 2,
  WINORA: 3,
}

const models = [
  {id: 1, name: "KR Esker 2.0 M 28 L bra_beż p",        size: 20, wheel: 28, price: 4999, type: type.MAN,   make: makes.KROSS, electric: false,  code: 'KREK2Z28X20M006648', EAN:'1111'},
  {id: 2, name: "KR Evado 1.0 D 28 L grf_mal m",        size: 19, wheel: 28, price: 1699, type: type.WOMAN, make: makes.KROSS, electric: false,  code: 'KREV1Z28X19W004204', EAN:'1112'},
  {id: 3, name: "KR Evado 5.0 D 28 M tur_zie p",        size: 17, wheel: 28, price: 3499, type: type.WOMAN, make: makes.KROSS, electric: false,  code: 'KREV5Z28X17W005756', EAN:'1113'},
  {id: 4, name: "KR Evado Hybrid 1.0 D 28 M bia_tur p", size: 17, wheel: 28, price: 5499, type: type.WOMAN, make: makes.KROSS, electric: true,   code: 'KREH1Z28X17W004239', EAN:'1114'},
]
const bikesFromDB = [
  {id: 1, model: 1, place: shop.WOJC,  status: status.READY},
  {id: 2, model: 1, place: shop.A,  status: status.READY},
  {id: 3, model: 1, place: shop.A,  status: status.READY},
  {id: 4, model: 3, place: shop.GESIA, status: status.READY},
  {id: 4, model: 3, place: shop.A, status: status.READY},
  {id: 4, model: 3, place: shop.A, status: status.READY},
  {id: 6, model: 4, place: shop.GALA,  status: status.READY},
]

const sample = []

const sample2 = [
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
    createViewList();
    let tempList = JSON.parse(JSON.stringify(sample));
    if (name !== '' && name !== null) {
      tempList = tempList.filter((bike) =>  bike.name.toLowerCase().includes(name) );
    }
    if (size !== '' && size !== null) {
      tempList = tempList.filter((bike) =>  bike.size == size );
    }
    if (avail !== false && avail !== null) {
      tempList = tempList.filter((bike) =>  bike.number > 0 );
    }
    if (wheel !== '' & wheel !== null) {
      if(wheel.includes('-')) {
        tempList = tempList.filter((bike) =>  bike.wheel >= parseInt(wheel.split('-')[0]) && bike.wheel <= parseInt(wheel.split('-')[1]) );
      } else {
        tempList = tempList.filter((bike) =>  bike.wheel == parseInt(wheel) );
      }
    }
    if (make !== '' && make !== null) {
      tempList = tempList.filter((bike) =>  bike.make == make );
    }
    console.log(make);
    console.log(JSON.stringify(sample));
    setViewList(tempList);
  }
  //To be moved to backend when created
  function createViewList() {
    const mergeObj = {number: 0, gala: 0, gesia: 0, wojc: 0, a: 0, b: 0, d: 0, avail: 0};
    sample.length = 0;
    sample.push(...models.map(model => {
      return { ...model, ...mergeObj}
    }))
    sample.forEach(record => {
      bikesFromDB.forEach(bike => {
        if(bike.model === record.id) {
          if(bike.place === shop.WOJC)
            record.wojc++;
          else if(bike.place === shop.GALA)
            record.gala++;
          else if(bike.place === shop.GESIA)
            record.gesia++;
          else if(bike.place === shop.A)
            record.a++;
          else if(bike.place === shop.B)
            record.b++;
          else if(bike.place === shop.D)
            record.c++;
          if(bike.status === status.READY)
            record.avail++;
          record.number++;
        }
      })
    })
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
                <option value='12'>12"      </option>
                <option value='14'>14"      </option>
                <option value='16'>16"      </option>
                <option value='12-16'>12-16"</option>
                <option value='20'>20"      </option>
                <option value='24'>24"      </option>
                <option value='26'>26"      </option>
                <option value='27'>27"      </option>
                <option value='26-27'>26-27"</option>
                <option value='28'>28"      </option>
                <option value='29'>29"      </option>
                <option value='28-29'>28-29"</option>
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
                <option value={makes.KROSS}> Kross </option>
                <option value={makes.MAXIM}> Maxim </option>
                <option value={makes.WINORA}> Winora </option>
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