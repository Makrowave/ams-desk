import FetchSelect from '../../filtering/FetchSelect';
import URLS, { URLKEYS } from '../../../util/urls';
import ValidatedTextField from '../../input/ValidatedTextField';
import { REGEX } from '../../../util/regex';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Part } from '../../../types/repairTypes';

export default function MergePartModal({
  part1,
  part2,
}: {
  part1: Part;
  part2: Part;
}) {
  const [localPart, setLocalPart] = useState(part1);
  const [category, setCategory] = useState(0);
  const updatePart = (key: keyof Part, value: Part[typeof key]) => {
    setLocalPart((prev) => ({ ...prev, [key]: value }));
  };
  const handlePartSelection = (value: number) => {
    setLocalPart(part1.id === value ? part1 : part2);
    setCategory(0);
  };

  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.put(
        `${URLS.Parts}Merge`,
        JSON.stringify({
          id1: part1.id,
          id2: part2.id,
          part: localPart,
        }),
      );
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueriesData<Part[]>(
        { queryKey: [URLS.Parts], exact: false },
        (oldData) => {
          return oldData
            ?.filter((item) => item.id !== data.removedId)
            .map((item) => (item.id === data.keptId ? data.part : item));
        },
      );
    },
  });

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id={'part'}>{'Część'}</InputLabel>
        <Select
          onChange={(e) => handlePartSelection(e.target.value)}
          value={localPart.id}
          labelId={'part'}
          label={'Część'}
        >
          <MenuItem value={part1.id}>{part1.name}</MenuItem>
          <MenuItem value={part2.id}>{part2.name}</MenuItem>
        </Select>
      </FormControl>
      <FetchSelect
        value={category}
        onChange={setCategory}
        urlKey={URLKEYS.PartCategories}
        defaultValue={0}
        label="Kategoria"
      />
      {category !== 0 && (
        <FetchSelect
          value={localPart.partTypeId}
          onChange={(v) => updatePart('partTypeId', v)}
          urlKey={URLKEYS.PartTypes}
          params={{ id: category }}
          defaultValue={0}
          label="Typ"
          validated
        />
      )}
      <ValidatedTextField
        label="Nazwa"
        value={localPart.name}
        onChange={(v) => updatePart('name', v)}
        regex={REGEX.POLISH_TEXT}
      />
      <ValidatedTextField
        label="Cena"
        value={localPart.price}
        type="number"
        onChange={(v) => updatePart('price', v)}
        regex={REGEX.PART_PRICE}
      />
      <FetchSelect
        value={localPart.unitId}
        onChange={(v) => updatePart('unitId', v)}
        urlKey={URLKEYS.Units}
        defaultValue={0}
        label="Jednostka"
        validated
      />
      <Button
        color={'primary'}
        variant={'contained'}
        disabled={
          !(
            REGEX.PART_PRICE.test(localPart.price.toString()) &&
            REGEX.POLISH_TEXT.test(localPart.name) &&
            localPart.partTypeId !== 0 &&
            localPart.unitId !== 0
          )
        }
        onClick={() => mutation.mutate()}
      >
        Połącz
      </Button>
    </>
  );
}
