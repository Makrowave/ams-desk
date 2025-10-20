import { useState } from 'react';
import { REGEX } from '../../../util/regex';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import URLS, { URLKEYS } from '../../../util/urls';
import FetchSelect from '../../filtering/FetchSelect';
import { Button } from '@mui/material';
import ValidatedTextField from '../../input/ValidatedTextField';

const AddPartModal = ({ closeModal }: { closeModal: () => void }) => {
  const [category, setCategory] = useState(0);
  const [type, setType] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | undefined>();
  const [unit, setUnit] = useState(0);

  const [isNameValid, setIsNameValid] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.post(
        'parts',
        JSON.stringify({
          partId: 0,
          partName: name,
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
      closeModal();
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
    if (value !== undefined && !isNaN(value) && value > 0 && value < 10000) {
      setIsPriceValid(true);
    } else {
      setIsPriceValid(false);
    }
    setPrice(value);
  };

  const handleCategoryChange = (value: number) => {
    setCategory(value);
    setType(0);
  };

  return (
    <>
      <FetchSelect
        value={category}
        onChange={(v) => handleCategoryChange(v)}
        urlKey={URLKEYS.PartCategories}
        defaultValue={0}
        label="Kategoria"
        validated
      />
      {category !== 0 && (
        <FetchSelect
          value={type}
          onChange={(v) => setType(v)}
          urlKey={URLKEYS.PartTypes}
          params={{ id: category }}
          defaultValue={0}
          label="Typ"
          validated
        />
      )}
      <ValidatedTextField
        label="Nazwa"
        value={name}
        onChange={(v) => updateName(v ?? '')}
        regex={REGEX.POLISH_TEXT}
      />
      <ValidatedTextField
        label="Cena"
        value={price}
        type="number"
        onChange={(v) => updatePrice(v)}
        regex={REGEX.PART_PRICE}
      />
      <FetchSelect
        value={unit}
        onChange={(v) => setUnit(v)}
        urlKey={URLKEYS.Units}
        defaultValue={0}
        label="Jednostka"
        validated
      />
      <Button
        color={'primary'}
        variant={'contained'}
        disabled={!(isNameValid && isPriceValid && type !== 0 && unit !== 0)}
        onClick={() => mutation.mutate()}
      >
        Dodaj
      </Button>
    </>
  );
};

export default AddPartModal;
