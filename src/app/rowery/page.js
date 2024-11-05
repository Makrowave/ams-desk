"use client";
import Navigation from "../../components/navigation/navigation";
import { useState } from "react";
import FetchSelect from "@/components/filtering/fetch_select";
import FilterInput from "@/components/filtering/filter_input";
import FilterSelect from "@/components/filtering/filter_select";
import SingleCheckbox from "@/components/filtering/single_checkbox";
import Modal from "@/components/modals/modal";
import AddModelModal from "@/components/modals/record/model_change/add_model_modal";
import ModelTable from "@/components/table/model_table";
import PrivateRoute from "@/components/routing/private_route";
import RangeInput from "@/components/filtering/range_input";
import useModal from "@/hooks/use_modal";

const defaults = {
  name: "",
  size: "",
  wheel: "",
  priceMin: 0,
  priceMax: 100000,
  number: 1,
  avail: true,
  electric: false,
  isWoman: "",
  make: "",
  place: 0,
  isKids: false,
  category: "",
  minPrice: 0,
  maxPrice: 100000,
  color: "",
  statusId: "",
  productCode: "",
};

export default function Rowery() {
  //Filtering criterions
  const [name, setName] = useState(defaults.name);
  const [size, setSize] = useState(defaults.size);
  const [wheel, setWheel] = useState(defaults.wheel);
  const [number, setNumber] = useState(defaults.number);
  const [avail, setAvail] = useState(defaults.avail);
  const [statusId, setStatusId] = useState(defaults.statusId);
  const [electric, setElectric] = useState(defaults.electric);
  const [isWoman, setIsWoman] = useState(defaults.isWoman);
  const [make, setMake] = useState(defaults.make);
  const [isKids, setIsKids] = useState(defaults.isKids);
  const [category, setCategory] = useState(defaults.category);
  const [minPrice, setMinPrice] = useState(defaults.minPrice);
  const [maxPrice, setMaxPrice] = useState(defaults.maxPrice);
  const [color, setColor] = useState(defaults.color);
  const [productCode, setProductCode] = useState(defaults.productCode);

  function reset() {
    setName(defaults.name);
    setSize(defaults.size);
    setWheel(defaults.wheel);
    setNumber(defaults.number);
    setStatusId(defaults.statusId);
    setElectric(defaults.electric);
    setIsWoman(defaults.isWoman);
    setMake(defaults.make);
    setAvail(defaults.avail);
    setIsKids(defaults.isKids);
    setMinPrice(defaults.minPrice);
    setMaxPrice(defaults.maxPrice);
    setColor(defaults.color);
    setCategory(defaults.category);
    setProductCode(defaults.productCode);
  }
  //Modal
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  function openModal() {
    setModalChildren(<AddModelModal />);
    setTitle("Dodaj rower");
    setIsOpen(true);
  }

  return (
    //overflow auto main
    <PrivateRoute>
      <div className='max-h-screen overflow-hidden'>
        <Navigation active={1} />
        <div className='h-screen flex flex-col overflow-hidden max-w-1920 m-auto'>
          <main className='flex-1 grid grid-cols-6 bg-primary py-5 rounded-b-xl overflow-hidden flex-col'>
            {/* Filter */}
            <div className='col-span-1 h-full overflow-y-auto m-4 bg-primary flex flex-col '>
              {/* Title */}
              <div className='flex justify-center sticky top-0 bg-primary'>
                <div className='flex justify-center text-2xl w-3/5 border-border border-b pb-1 mb'>
                  <h2>
                    <b>Filtry</b>
                  </h2>
                </div>
              </div>
              <div className='*:pb-1 flex flex-col'>
                {/* Name */}
                <FilterInput title='Nazwa' value={name} setValue={setName} />
                {/* Product Code */}
                <FilterInput title='Kod producenta' value={productCode} setValue={setProductCode} />
                {/* Size */}
                <FilterInput title='Rozmiar' value={size} setValue={setSize} />
                {/* Wheel size */}
                <FilterSelect
                  title='Rozmiar koła'
                  value={wheel}
                  defaultKey={defaults.wheel}
                  defaultValue={"Dowolny"}
                  options={[
                    { key: "12", value: "12" },
                    { key: "14", value: "14" },
                    { key: "16", value: "16" },
                    { key: "20", value: "20" },
                    { key: "24", value: "24" },
                    { key: "26", value: "26" },
                    { key: "27", value: "27" },
                    { key: "28", value: "28" },
                    { key: "29", value: "29" },
                  ]}
                  onChange={setWheel}
                />
                {/* Frame type (is woman) */}
                <FilterSelect
                  title='Typ ramy'
                  value={isWoman}
                  defaultKey={defaults.isWoman}
                  defaultValue={"Dowolny"}
                  onChange={setIsWoman}
                  options={[
                    { key: "false", value: "Męski" },
                    { key: "true", value: "Damski" },
                  ]}
                />
                {/* Manufacturer */}
                <FetchSelect
                  value={make}
                  onChange={setMake}
                  src='/Manufacturers'
                  queryKey='manufacturers'
                  title='Producent'
                  default_option={defaults.make}
                  default_title='Dowolny'
                />
                {/* Category */}
                {/* Endpoint to be made */}
                <FetchSelect
                  value={category}
                  onChange={setCategory}
                  src='/Categories'
                  queryKey='categories'
                  title='Kategoria'
                  default_option={defaults.category}
                  default_title='Dowolny'
                />
                {/* Color */}
                <FetchSelect
                  value={color}
                  onChange={setColor}
                  src='/Colors'
                  queryKey='colors'
                  title='Kolor'
                  default_option={defaults.color}
                  default_title='Dowolny'
                  isColored={true}
                />
                {/* Status */}
                <FetchSelect
                  value={statusId}
                  onChange={setStatusId}
                  src='/Status/NotSold'
                  queryKey='status'
                  title='Status'
                  default_option={""}
                  default_title='Dowolny'
                  isColored={true}
                />
                {/* Price range */}
                <RangeInput
                  title='Cena'
                  minValue={minPrice}
                  maxValue={maxPrice}
                  setMin={setMinPrice}
                  setMax={setMaxPrice}
                />
                {/* Avaible */}
                <SingleCheckbox
                  checked={avail}
                  onChange={(e) => {
                    setAvail(!avail);
                  }}
                  title='Dostępny'
                />
                {/* Electric */}
                <SingleCheckbox
                  checked={electric}
                  onChange={(e) => {
                    setElectric(!electric);
                  }}
                  title='Elektryczny'
                />
                <SingleCheckbox
                  checked={isKids}
                  onChange={(e) => {
                    setIsKids(!isKids);
                  }}
                  title='Dziecięcy'
                />
              </div>
              {/*Reset button*/}
              <button
                className='button-primary'
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </button>
              <div className='min-h-8' />
            </div>
            {/*Table*/}
            <ModelTable
              //prettier-ignore
              filterSrc={
                '&avaible=' + avail.toString()
                + '&manufacturerId=' + make.toString()
                + '&wheelSize=' + wheel.toString()
                + '&frameSize=' + size.toString()
                + '&name=' + name.trim().toLowerCase()
                + '&electric=' + electric.toString()
                + '&statusId=' + statusId.toString()
                + '&isWoman=' + isWoman.toString()
                + '&isKids=' + isKids.toString()
                + '&minPrice=' + minPrice.toString()
                + '&maxPrice=' + maxPrice.toString()
                + '&colorId=' + color.toString()
                + '&categoryId=' + category.toString()
                + '&productCode=' + productCode.toString()
              }
            />
            <div className='fixed bottom-0 align-center  flex w-full pointer-events-none'>
              <div className='justify-between max-w-1920 w-full m-auto px-5'>
                <button
                  className='button-primary block mb-10 mr-4 ml-auto py-2 px-5 max-w-60  pointer-events-auto'
                  onClick={() => openModal()}
                >
                  Dodaj Model
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Modal />
    </PrivateRoute>
  );
}
