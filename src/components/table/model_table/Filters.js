import FetchSelect from "@/components/filtering/FetchSelect";
import FilterInput from "@/components/filtering/FilterInput";
import FilterSelect from "@/components/filtering/FilterSelect";
import RangeInput from "@/components/filtering/RangeInput";
import SingleCheckbox from "@/components/filtering/SingleCheckbox";
import useAuth from "@/hooks/useAuth";
import {useEffect, useReducer} from "react";
import URLS from "@/util/urls";

export default function Filters({setQuery}) {
  const updateFilters = (field, value) => {
    if (field === undefined) return;
    dispatch({type: "SET", field, value});
  }
  const [filters, dispatch] = useReducer(reducer, defaultFilters);

  const {isAdmin} = useAuth();
  useEffect(() => {
    setQuery(filters);
  });

  return (
    <div className='col-span-1 overflow-y-auto bg-primary flex flex-col pb-4 pr-4 pl-4 rounded-xl ml-4'>
      <div className='flex justify-center sticky top-0 bg-primary z-30'>
        <div className='flex justify-center text-2xl w-3/5 pb-1 mb pt-4'>
          <h2><b>Filtry</b></h2>
        </div>
      </div>
      <div className='*:pb-1 flex flex-col'>
        <FilterInput title='Nazwa' value={filters.name} setValue={(v) => updateFilters("name", v)}/>
        <FilterInput title='Kod producenta' value={filters.productCode}
                     setValue={(v) => updateFilters("productCode", v)}/>
        <FilterInput title='Rozmiar' value={filters.frameSize} setValue={(v) => updateFilters("frameSize", v)}/>

        <FetchSelect
          value={filters.wheelSize}
          onChange={(v) => updateFilters("wheelSize", v)}
          urlKey={"WheelSizes"}
          queryKey={URLS.WheelSizes}
          title='Rozmiar koła'
          default_option={defaultFilters.wheelSize}
          default_title='Dowolny'
        />

        <FilterSelect
          title='Typ ramy'
          value={filters.isWoman}
          defaultKey={defaultFilters.isWoman}
          defaultValue='Dowolny'
          onChange={(v) => updateFilters("isWoman", v)}
          options={[
            {key: "false", value: "Męski"},
            {key: "true", value: "Damski"},
          ]}
        />

        <FetchSelect
          value={filters.manufacturerId}
          onChange={(v) => updateFilters("manufacturerId", v)}
          urlKey='Manufacturers'
          queryKey={URLS.Manufacturers}
          title='Producent'
          default_option={defaultFilters.manufacturerId}
          default_title='Dowolny'
        />

        <FetchSelect
          value={filters.categoryId}
          onChange={(v) => updateFilters("categoryId", v)}
          urlKey='Categories'
          queryKey={URLS.Categories}
          title='Kategoria'
          default_option={defaultFilters.categoryId}
          default_title='Dowolny'
        />

        <FetchSelect
          value={filters.colorId}
          onChange={(v) => updateFilters("colorId", v)}
          urlKey='Colors'
          queryKey={URLS.Colors}
          title='Kolor'
          default_option={defaultFilters.colorId}
          default_title='Dowolny'
          isColored
        />

        <FetchSelect
          value={filters.statusId}
          onChange={(v) => updateFilters("statusId", v)}
          urlKey={"ExcludedStatuses"}
          params={{exclude: [3]}}
          queryKey={URLS.Statuses}
          title='Status'
          default_option=""
          default_title='Dowolny'
          isColored
        />

        <RangeInput
          title='Cena'
          minValue={filters.minPrice}
          maxValue={filters.maxPrice}
          setMin={(v) => updateFilters("minPrice", v)}
          setMax={(v) => updateFilters("maxPrice", v)}
        />

        <SingleCheckbox
          checked={filters.available}
          onChange={() => dispatch({type: "TOGGLE", field: "available"})}
          title='Dostępny'
        />

        <SingleCheckbox
          checked={filters.electric}
          onChange={() => dispatch({type: "TOGGLE", field: "electric"})}
          title='Elektryczny'
        />

        <SingleCheckbox
          checked={filters.isKids}
          onChange={() => dispatch({type: "TOGGLE", field: "isKids"})}
          title='Dziecięcy'
        />

        {isAdmin && (
          <>
            <span>Braki</span>
            <SingleCheckbox
              checked={filters.noEan}
              onChange={() => dispatch({type: "TOGGLE", field: "noEan"})}
              title='Bez kodu EAN'
            />
            <SingleCheckbox
              checked={filters.noProductCode}
              onChange={() => {
                dispatch({type: "TOGGLE", field: "noProductCode"});
                dispatch({type: "SET", field: "productCode", value: ""});
              }}
              title='Bez kodu producenta'
            />
            <SingleCheckbox
              checked={filters.noColorGroup}
              onChange={() => dispatch({type: "TOGGLE", field: "noColorGroup"})}
              title='Bez koloru'
            />
            <SingleCheckbox
              checked={filters.noColor}
              onChange={() => dispatch({type: "TOGGLE", field: "noColor"})}
              title='Bez podglądu kolorów'
            />
          </>
        )}
      </div>

      <button
        className='button-primary'
        onClick={() => dispatch({type: "RESET"})}
      >
        Reset
      </button>

      <div className='min-h-8'/>
    </div>
  );
}

export const defaultFilters = {
  name: "",
  frameSize: "",
  wheelSize: "",
  available: true,
  electric: false,
  isWoman: "",
  manufacturerId: "",
  place: 0,
  isKids: false,
  categoryId: "",
  minPrice: 0,
  maxPrice: 100000,
  colorId: "",
  statusId: "",
  productCode: "",
  noEan: false,
  noProductCode: false,
  noColor: false,
  noColorGroup: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        [action.field]: action.value,
      }
    case "TOGGLE":
      return {
        ...state,
        [action.field]: !state[action.field],
      };
    case "RESET":
      return defaultFilters;
    default:
      return state;
  }
}
