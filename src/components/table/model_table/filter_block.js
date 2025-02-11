import FetchSelect from "@/components/filtering/fetch_select";
import FilterInput from "@/components/filtering/filter_input";
import FilterSelect from "@/components/filtering/filter_select";
import RangeInput from "@/components/filtering/range_input";
import SingleCheckbox from "@/components/filtering/single_checkbox";
import useAuth from "@/hooks/use_auth";
import { QUERY_KEYS } from "@/util/query_keys";
import { useEffect, useState } from "react";

export default function FilterBlock({ setQuery }) {
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
  //Admin only - not sensitive, but unescessary for normal users
  const [noEan, setNoEan] = useState(false);
  const [noColor, setNoColor] = useState(false);
  const [noColorGroup, setNoColorGroup] = useState(false);
  const [noProductCode, setNoProductCode] = useState(false);

  const { isAdmin } = useAuth();
  useEffect(() => {
    setQuery(
      `&avaible=${avail}
&manufacturerId=${make}
&wheelSize=${wheel}
&frameSize=${size}
&name=${name.trim().toLowerCase()}
&electric=${electric}
&statusId=${statusId}
&isWoman=${isWoman}
&isKids=${isKids}
&minPrice=${minPrice}
&maxPrice=${maxPrice}
&colorId=${color}
&categoryId=${category}
&productCode=${productCode.trim()}
&noEan=${noEan}
&noProductCode=${noProductCode}
&noColor=${noColor}
&noColorGroup=${noColorGroup}`
    );
  });

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

  return (
    <div className='mb-10 col-span-1 overflow-y-auto bg-primary flex flex-col pb-4 pr-4 pl-4 rounded-xl border-2 border-gray-400'>
      {/* Title */}
      <div className='flex justify-center sticky top-0 bg-primary z-30'>
        <div className='flex justify-center text-2xl w-3/5 pb-1 mb pt-4'>
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
        <FetchSelect
          value={wheel}
          onChange={setWheel}
          src='/WheelSizes'
          queryKey={QUERY_KEYS.WheelSizes}
          title='Rozmiar koła'
          default_option={defaults.wheel}
          default_title='Dowolny'
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
          queryKey={QUERY_KEYS.Manufacturers}
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
          queryKey={QUERY_KEYS.Categories}
          title='Kategoria'
          default_option={defaults.category}
          default_title='Dowolny'
        />
        {/* Color */}
        <FetchSelect
          value={color}
          onChange={setColor}
          src='/Colors'
          queryKey={QUERY_KEYS.Colors}
          title='Kolor'
          default_option={defaults.color}
          default_title='Dowolny'
          isColored={true}
        />
        {/* Status */}
        <FetchSelect
          value={statusId}
          onChange={setStatusId}
          src='/Status/Excluded?exclude=3'
          queryKey={QUERY_KEYS.Statuses}
          title='Status'
          default_option={""}
          default_title='Dowolny'
          isColored={true}
        />
        {/* Price range */}
        <RangeInput title='Cena' minValue={minPrice} maxValue={maxPrice} setMin={setMinPrice} setMax={setMaxPrice} />
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
        {isAdmin && (
          <>
            <span>Braki</span>
            <SingleCheckbox
              checked={noEan}
              onChange={(e) => {
                setNoEan(!noEan);
              }}
              title='Bez kodu EAN'
            />

            <SingleCheckbox
              checked={noProductCode}
              onChange={(e) => {
                setNoProductCode(!noProductCode);
                setProductCode("");
              }}
              title='Bez kodu producenta'
            />
            <SingleCheckbox
              checked={noColorGroup}
              onChange={(e) => {
                setNoColorGroup(!noColorGroup);
              }}
              title='Bez koloru'
            />
            <SingleCheckbox
              checked={noColor}
              onChange={(e) => {
                setNoColor(!noColor);
              }}
              title='Bez podglądu kolorów'
            />
          </>
        )}
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
  );
}
