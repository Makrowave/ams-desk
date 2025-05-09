import {useState} from "react";
import {REGEX} from "@/util/regex";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import URLS, {URLKEYS} from "@/util/urls";
import FetchSelect from "@/components/filtering/FetchSelect";
import {Button} from "@mui/material";
import ValidatedTextField from "@/components/input/ValidatedTextField";

export default function AddPartModal({closeModal}) {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("1");

  const [isNameValid, setIsNameValid] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.post(
        "parts",
        JSON.stringify({
          partId: 0,
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

  const handleCategoryChange = (value) => {
    setCategory(value);
    setType("");
  }

  return (
    <>
      <FetchSelect
        value={category}
        onChange={handleCategoryChange}
        urlKey={URLKEYS.PartCategories}
        defaultValue={""}
        label='Kategoria'
        validated
      />
      {category !== "" &&
        <FetchSelect
          value={type}
          onChange={setType}
          urlKey={URLKEYS.PartTypes}
          params={{id: category}}
          defaultValue={""}
          label='Typ'
          validated
        />
      }
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
      <Button
        color={"primary"} variant={"contained"}
        disabled={!(isNameValid && isPriceValid && type !== "" && unit !== "")}
        onClick={mutation.mutate}
      >
        Dodaj
      </Button>
    </>
  );
}
