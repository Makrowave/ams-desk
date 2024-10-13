"use client";
import Navigation from "../../components/navigation/navigation";
import { useState } from 'react';
import FetchSelect from "@/components/filtering/fetch_select";
import FilterInput from "@/components/filtering/filter_input";
import FilterSelect from "@/components/filtering/filter_select";
import SingleCheckbox from "@/components/filtering/single_checkbox";
import Modal from "@/components/modals/modal";
import AddModelModal from "@/components/modals/add_model_modal";
import BikeTable from "@/components/table/bike_table";
import PrivateRoute from "@/components/routing/private_route";
import RangeInput from "@/components/filtering/range_input";
import UseModal from "@/hooks/use_modal";

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
  isWoman: '',
  make: '',
  place: 0,
  isKids: false,
  category: '',
  minPrice: 0,
  maxPrice: 100000,
  color: ''
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
  const [isWoman, setIsWoman] = useState(defaults.isWoman);
  const [make, setMake] = useState(defaults.make);
  const [isKids, setIsKids] = useState(defaults.isKids);
  const [category, setCategory] = useState(defaults.category);
  const [minPrice, setMinPrice] = useState(defaults.minPrice);
  const [maxPrice, setMaxPrice] = useState(defaults.maxPrice);
  const [color, setColor] = useState(defaults.color);

  function reset() {
    setName(defaults.name);
    setSize(defaults.size);
    setWheel(defaults.wheel);
    setNumber(defaults.number);
    setAvail(defaults.avail);
    setReady(defaults.ready);
    setElectric(defaults.electric);
    setIsWoman(defaults.isWoman);
    setMake(defaults.make);
    setIsKids(defaults.isKids);
    setMinPrice(defaults.minPrice);
    setMaxPrice(defaults.maxPrice);
    setColor(defaults.color);
    setCategory(defaults.category);
  }
  //Modal
  const {setIsOpen, setModalChildren, setTitle}  = UseModal();
  function openModal() {
    setModalChildren(<AddModelModal />);
    setTitle("Dodaj rower");
    setIsOpen(true);
  }

  return (
    //overflow auto main
    <PrivateRoute>
      <div className="max-h-screen overflow-hidden">
        <Navigation active={1} />
        <div className="h-screen flex flex-col overflow-hidden max-w-1920 m-auto">
          <main className="flex-1 grid grid-cols-6 bg-primary py-5 rounded-b-xl overflow-hidden flex-col">
            {/* Filter */}
            <div className="col-span-1 h-full overflow-y-auto m-4 bg-primary flex flex-col ">
              {/* Title */}
              <div className="flex justify-center sticky top-0 bg-primary">
                <div className="flex justify-center text-2xl w-3/5 border-border border-b pb-1 mb">
                  <h2><b>Filtry</b></h2>
                </div>
              </div>
              <div className="*:pb-1 flex flex-col">
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
                {/* Frame type (is woman) */}
                <FilterSelect value={isWoman}
                  onChange={(e) => { setIsWoman(e.target.value) }}
                  title='Typ ramy'
                >
                  <option value={defaults.isWoman}>Dowolny</option>
                  <option value={true}>Damski</option>
                  <option value={false}>Męski</option>
                </FilterSelect>
                {/* Manufacturer */}
                <FetchSelect value={make}
                  onChange={e => { setMake(e.target.value) }}
                  src='/Manufacturers'
                  queryKey='manufacturers'
                  title='Producent'
                  default_option={defaults.make}
                />
                {/* Category */}
                {/* Endpoint to be made */}
                <FetchSelect value={category}
                  onChange={e => { setCategory(e.target.value) }}
                  src='/Categories'
                  queryKey='categories'
                  title='Kategoria'
                  default_option={defaults.category}
                />
                {/* Color */}
                <FetchSelect value={color}
                  onChange={e => { setColor(e.target.value) }}
                  src='/Colors'
                  queryKey='colors'
                  title='Kolor'
                  default_option={defaults.color}
                />
                {/* Price range */}
                <RangeInput
                  title="Cena"
                  minValue={minPrice}
                  maxValue={maxPrice}
                  minOnChange={e => { setMinPrice(e.target.value) }}
                  maxOnChange={e => { setMaxPrice(e.target.value) }}
                />
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
                <SingleCheckbox
                  checked={isKids}
                  onChange={e => { setIsKids(!isKids) }}
                  title="Dziecięcy" />
              </div>
              {/*Reset button*/}
              <button className={'bg-primary rounded-lg px-2 border-border border-2 shadow-lg border-b-4'}
                onClick={() => { reset() }}
              >
                Reset
              </button>
            </div>
            {/*Table*/}
            <BikeTable
              filterSrc={
                '?avaible=' + avail.toString()
                + '&manufacturerId=' + make.toString()
                + '&wheelSize=' + wheel.toString()
                + '&frameSize=' + size.toString()
                + '&name=' + name.trim().toLowerCase()
                + '&electric=' + electric.toString()
                + '&ready=' + ready.toString()
                + '&isWoman=' + isWoman.toString()
                + '&isKids=' + isKids.toString()
                + '&minPrice=' + minPrice.toString()
                + '&maxPrice=' + maxPrice.toString()
                + '&colorId=' + color.toString()
                + '&categoryId=' + category.toString()
              }

            />
            <div className="fixed bottom-0 align-center  flex w-full pointer-events-none">
              <div className="justify-between max-w-1920 w-full m-auto px-5">
                <button className={'bg-primary mb-10 max-w-60 rounded-2xl py-2 px-5 border-2 border-border ml-auto block shadow-lg border-b-4 pointer-events-auto'} 
                  onClick={ () => openModal()}>
                    Dodaj Model
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Modal buttonTitle='+ Dodaj model'
                  
                  title='Dodaj model'
      >
      </Modal>
    </PrivateRoute>
  )
}