import {useEffect, useState} from "react";
import {FaCheck, FaXmark} from "react-icons/fa6";
import {REGEX} from "@/util/regex";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useModal from "@/hooks/useModal";
import FetchSelect from "@/components/filtering/FetchSelect";
import URLS, {URLKEYS} from "@/util/urls";

export default function ModifyPartModal({part}) {
  const {setIsModalOpen} = useModal();

  const [type, setType] = useState(part.partTypeId);
  const [category, setCategory] = useState(part.partType.partCategoryId);
  const [name, setName] = useState(part.partName);
  const [price, setPrice] = useState(part.price);
  const [unit, setUnit] = useState(part.unitId);
  const [firstLoad, setFirstLoad] = useState(true);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);

  useEffect(() => {
    if (!firstLoad) {
      setType("")
    } else {
      setFirstLoad(false);
    }

  }, [category])

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        `parts/${part.partId}`,
        JSON.stringify({
          partId: part.partId,
          partName: name,
          price: price,
          partTypeId: type,
          unitId: unit,
        })
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({queryKey: [URLS.Parts], exact: false});
      setIsModalOpen(false);
    },
  });

  const updateName = (value) => {
    if (REGEX.POLISH_TEXT.test(value) && value.length <= 40) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
    setName(value);
  };

  const updatePrice = (value) => {
    const num = Number(value);
    if (!isNaN(num) && num > 0 && num < 10000) {
      setIsPriceValid(true);
    } else {
      setIsPriceValid(false);
    }
    setPrice(value);
  };

  return (
    <div className='flex flex-col w-full justify-between items-center py-2'>
      <div className='w-full *:w-full *:mb-4'>
        <FetchSelect
          value={category}
          onChange={setCategory}
          urlKey={URLKEYS.PartCategories}
          defaultValue={"0"}
          label='Kategoria'
        />
        <FetchSelect
          value={type}
          onChange={setType}
          urlKey={URLKEYS.PartTypes}
          params={{id: category}}
          defaultValue={""}
          label='Typ części'
          validated
        />
        <div className='flex flex-col rounded-lg border-border border p-1 *:px-1'>
          <div className='border-b border-gray-400 w-fit flex items-center'>
            <span className='text-xs text-gray-400 mr-1'>Nazwa</span>
            {isNameValid ? (
              <FaCheck className='text-green-500 text-sm'/>
            ) : (
              <FaXmark className='text-red-600 text-sm'/>
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
              <FaCheck className='text-green-500 text-sm'/>
            ) : (
              <FaXmark className='text-red-600 text-sm'/>
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
        <FetchSelect
          value={unit}
          onChange={setUnit}
          urlKey={URLKEYS.Units}
          defaultValue={""}
          label='Jednostka'
          validated
        />
        <button
          disabled={!(isNameValid && isPriceValid && type !== "" && unit !== "")}
          className='button-primary text-center disabled:bg-gray-400'
          onClick={() => mutation.mutate()}
        >
          Edytuj
        </button>
      </div>
    </div>
  );
}
