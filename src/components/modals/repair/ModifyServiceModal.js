import {useState} from "react";
import {FaCheck, FaXmark} from "react-icons/fa6";
import {REGEX} from "@/util/regex";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useAxiosAdmin from "@/hooks/useAxiosAdmin";
import URLS, {URLKEYS} from "@/util/urls";
import FetchSelect from "@/components/filtering/FetchSelect";

export default function ModifyServiceModal({service, closeModal}) {

  const [category, setCategory] = useState(service.serviceCategoryId);
  const [name, setName] = useState(service.serviceName);
  const [price, setPrice] = useState(service.price);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);

  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosAdmin.put(
        `${URLS.Services}${service.serviceId}`,
        JSON.stringify({
          serviceId: service.serviceId,
          serviceName: name,
          price: price,
          serviceCategoryId: category,
        }),
        {headers: {"Content-Type": "application/json"}}
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({queryKey: [URLS.Services], exact: false});
      closeModal();
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
    <>
      <div className='w-full *:w-full *:mb-4'>
        <FetchSelect
          value={category}
          onChange={setCategory}
          urlKey={URLKEYS.ServiceCategories}
          defaultValue={""}
          label='Kategoria'
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
        <button
          disabled={!(isNameValid && isPriceValid && category !== "")}
          className='button-primary text-center disabled:bg-gray-400'
          onClick={() => mutation.mutate()}
        >
          Edytuj
        </button>
      </div>
    </>
  );
}
