import ValidationFetchSelect from "@/components/validation/ValidationFetchSelect";
import { QUERY_KEYS } from "@/util/query_keys";
import { useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";

export default function AddPartModal({}) {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState(1);

  const [isNameValid, setIsNameValid] = useState();
  const [isPriceValid, setIsPriceValid] = useState();

  const updateName = (value) => {};
  const updatePrice = (value) => {};

  return (
    <div className='flex flex-col w-full justify-between items-center py-2'>
      <div className='w-full *:w-full *:mb-4'>
        <ValidationFetchSelect
          value={category}
          onChange={setCategory}
          src='/PartCategories'
          queryKey={QUERY_KEYS.Parts}
          default_option={""}
          title='Kategoria'
          default_title='Wybierz z listy'
        />

        <div className='flex flex-col rounded-lg border-border border p-1 *:px-1'>
          <div className='border-b border-gray-400 w-fit flex items-center'>
            <span className='text-xs text-gray-400 mr-1'>Nazwa</span>
            {isNameValid ? (
              <FaCheck className='text-green-500 text-sm' />
            ) : (
              <FaXmark className='text-red-600 text-sm' />
            )}
          </div>
          <input
            type='text'
            className='w-full focus:outline-none'
            placeholder='Nazwa'
            value={name}
            onChange={(e) => updateName(e.target.value)}
          />
        </div>
        <div className='flex flex-col rounded-lg border-border border p-1 *:px-1'>
          <div className='border-b border-gray-400 w-fit flex items-center'>
            <span className='text-xs text-gray-400 mr-1'>Cena</span>
            {isPriceValid ? (
              <FaCheck className='text-green-500 text-sm' />
            ) : (
              <FaXmark className='text-red-600 text-sm' />
            )}
          </div>
          <input
            type='text'
            className='w-full focus:outline-none'
            placeholder='Cena'
            value={price}
            onChange={(e) => updatePrice(e.target.value)}
          />
        </div>
        <ValidationFetchSelect
          value={unit}
          onChange={setUnit}
          src='/units'
          queryKey={QUERY_KEYS.Units}
          default_option={""}
          title='Jednostka'
          default_title='Wybierz z listy'
        />
        <div className='button-primary text-center'>Dodaj</div>
      </div>
    </div>
  );
}
