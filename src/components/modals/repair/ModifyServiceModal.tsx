import { useState } from 'react';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { REGEX } from '../../../util/regex';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosAdmin from '../../../hooks/useAxiosAdmin';
import URLS, { URLKEYS } from '../../../util/urls';
import FetchSelect from '../../filtering/FetchSelect';
import { Service } from '../../../app/types/repairTypes';
import ValidatedTextField from '../../input/ValidatedTextField';

export default function ModifyServiceModal({
  service,
  closeModal,
}: {
  service: Service;
  closeModal?: () => void;
}) {
  const [category, setCategory] = useState(service.serviceCategoryId);
  const [name, setName] = useState(service.name);
  const [price, setPrice] = useState<number | undefined>(service.price);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);

  const axiosAdmin = useAxiosAdmin();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosAdmin.put(
        `${URLS.Services}${service.id}`,
        JSON.stringify({
          id: service.id,
          name: name,
          price: price,
          serviceCategoryId: category,
        }),
        { headers: { 'Content-Type': 'application/json' } },
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [URLS.Services],
        exact: false,
      });
      if (closeModal) closeModal();
    },
  });

  const updateName = (value: string) => {
    if (REGEX.POLISH_TEXT.test(value) && value.length <= 40) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
    setName(value);
  };

  const updatePrice = (value: number | undefined) => {
    const num = Number(value);
    if (!!value && !isNaN(num) && num > 0 && num < 10000) {
      setIsPriceValid(true);
    } else {
      setIsPriceValid(false);
    }
    setPrice(value);
  };

  return (
    <>
      <div className="w-full *:w-full *:mb-4">
        <FetchSelect
          value={category}
          onChange={setCategory}
          urlKey={URLKEYS.ServiceCategories}
          defaultValue={0}
          label="Kategoria"
          validated
        />
        <div className="flex flex-col rounded-lg border-border border p-1 *:px-1">
          <div className="border-b border-gray-400 w-fit flex items-center">
            <span className="text-xs text-gray-400 mr-1">Nazwa</span>
            {isNameValid ? (
              <FaCheck className="text-green-500 text-sm" />
            ) : (
              <FaXmark className="text-red-600 text-sm" />
            )}
          </div>
          <input
            type="text"
            className="w-full focus:outline-none"
            placeholder="Nazwa"
            value={name}
            onChange={(e) => updateName(e.target.value)}
          />
        </div>
        <div className="flex flex-col rounded-lg border-border border p-1 *:px-1">
          <div className="border-b border-gray-400 w-fit flex items-center">
            <span className="text-xs text-gray-400 mr-1">Cena</span>
            {isPriceValid ? (
              <FaCheck className="text-green-500 text-sm" />
            ) : (
              <FaXmark className="text-red-600 text-sm" />
            )}
          </div>
          <ValidatedTextField
            className="w-full focus:outline-none"
            placeholder="Cena"
            type="text"
            value={price}
            onChange={v}
          />
        </div>
        <button
          disabled={!(isNameValid && isPriceValid && category !== '')}
          className="button-primary text-center disabled:bg-gray-400"
          onClick={() => mutation.mutate()}
        >
          Edytuj
        </button>
      </div>
    </>
  );
}
