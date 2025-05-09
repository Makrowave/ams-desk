import {useEffect, useState} from "react";
import {REGEX} from "@/util/regex";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import FetchSelect from "@/components/filtering/FetchSelect";
import URLS, {URLKEYS} from "@/util/urls";
import ValidatedTextField from "@/components/input/ValidatedTextField";

export default function ModifyPartModal({part, closeModal}) {

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
      <ValidatedTextField
        label='Nazwa'
        value={name}
        onChange={updateName}
        regex={REGEX.POLISH_TEXT}
      />
      <ValidatedTextField
        label='Cena'
        value={price}
        onChange={updatePrice}
        regex={REGEX.PART_PRICE}
      />
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
    </>
  );
}
