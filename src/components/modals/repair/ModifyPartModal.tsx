import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import ValidatedTextField from '../../input/ValidatedTextField';
import { Part } from '../../../app/types/repairTypes';
import { useState, useEffect } from 'react';
import { REGEX } from '../../../util/regex';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import URLS, { URLKEYS } from '../../../util/urls';
import FetchSelect from '../../filtering/FetchSelect';

export default function ModifyPartModal({
  part,
  closeModal,
}: {
  part: Part;
  closeModal?: () => void;
}) {
  const [type, setType] = useState(part.partTypeId);
  const [category, setCategory] = useState<number>(part.partType?.id ?? 0);
  const [name, setName] = useState(part.name);
  const [price, setPrice] = useState<number | undefined>(part.price);
  const [unit, setUnit] = useState(part.unitId);
  const [firstLoad, setFirstLoad] = useState(true);

  const [isNameValid, setIsNameValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);

  useEffect(() => {
    if (!firstLoad) {
      setType(0);
    } else {
      setFirstLoad(false);
    }
  }, [category]);

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        `parts/${part.id}`,
        JSON.stringify({
          id: part.id,
          name: name,
          price: price,
          partTypeId: type,
          unitId: unit,
        }),
      );
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [URLS.Parts],
        exact: false,
      });
      if (closeModal) closeModal();
    },
  });

  const updateName = (value: string | undefined) => {
    if (!!value && REGEX.POLISH_TEXT.test(value) && value.length <= 40) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
    setName(value ?? '');
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
      <FetchSelect
        value={category}
        onChange={setCategory}
        urlKey={URLKEYS.PartCategories}
        defaultValue={0}
        label="Kategoria"
      />
      <FetchSelect
        value={type}
        onChange={setType}
        urlKey={URLKEYS.PartTypes}
        params={{ id: category }}
        defaultValue={0}
        label="Typ części"
        validated
      />
      <ValidatedTextField
        label="Nazwa"
        value={name}
        onChange={updateName}
        regex={REGEX.POLISH_TEXT}
      />
      <ValidatedTextField
        label="Cena"
        value={price}
        type="number"
        onChange={updatePrice}
        regex={REGEX.PART_PRICE}
      />
      <FetchSelect
        value={unit}
        onChange={setUnit}
        urlKey={URLKEYS.Units}
        defaultValue={0}
        label="Jednostka"
        validated
      />
      <button
        disabled={!(isNameValid && isPriceValid && type !== 0 && unit !== 0)}
        className="button-primary text-center disabled:bg-gray-400"
        onClick={() => mutation.mutate()}
      >
        Edytuj
      </button>
    </>
  );
}
