import FetchSelect from "@/components/filtering/FetchSelect";
import URLS, {URLKEYS} from "@/util/urls";
import ValidatedTextField from "@/components/input/ValidatedTextField";
import {REGEX} from "@/util/regex";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export default function MergePartModal({part1, part2}) {
  const [localPart, setLocalPart] = useState(part1);
  const [category, setCategory] = useState("0");
  const updatePart = (key, value) => {
    setLocalPart(prev => ({...prev, [key]: value}));
  }
  const handlePartSelection = (event) => {
    setLocalPart(part1.partId === event.target.value ? part1 : part2)
    setCategory("0");
  }
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.put(`${URLS.Parts}Merge`,
        JSON.stringify({
          id1: part1.partId,
          id2: part2.partId,
          part: localPart,
        })
      )
      return result.data
    },
    onSuccess: (data) => {
      queryClient.setQueriesData({queryKey: [URLS.Parts], exact: false}, (oldData) => {
        return oldData.filter(item => item.partId !== data.removedId).map((item) =>
          (item.partId === data.keptId ? data.part : item)
        )
      })
    }
  })

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id={"part"}>{"Część"}</InputLabel>
        <Select onChange={handlePartSelection}
                value={localPart.partId}
                labelId={"part"}
                label={"Część"}
        >
          <MenuItem value={part1.partId}>{part1.partName}</MenuItem>
          <MenuItem value={part2.partId}>{part2.partName}</MenuItem>
        </Select>
      </FormControl>
      <FetchSelect
        value={category}
        onChange={setCategory}
        urlKey={URLKEYS.PartCategories}
        defaultValue={"0"}
        label='Kategoria'
      />
      {category !== "" &&
        <FetchSelect
          value={localPart.partTypeId}
          onChange={(v) => updatePart("partTypeId", v)}
          urlKey={URLKEYS.PartTypes}
          params={{id: category}}
          defaultValue={""}
          label='Typ'
          validated
        />
      }
      <ValidatedTextField
        label='Nazwa'
        value={localPart.partName}
        onChange={(v) => updatePart("partName", v)}
        regex={REGEX.POLISH_TEXT}
      />
      <ValidatedTextField
        label='Cena'
        value={localPart.price}
        onChange={(v) => updatePart("price", v)}
        regex={REGEX.PART_PRICE}
      />
      <FetchSelect
        value={localPart.unitId}
        onChange={(v) => updatePart("unitId", v)}
        urlKey={URLKEYS.Units}
        defaultValue={""}
        label='Jednostka'
        validated
      />
      <Button
        color={"primary"} variant={"contained"}
        disabled={!(REGEX.PART_PRICE.test(localPart.price)
          && REGEX.POLISH_TEXT.test(localPart.name)
          && localPart.partTypeId !== ""
          && localPart.unitId !== "")
        }
        onClick={mutation.mutate}
      >
        Połącz
      </Button>
    </>
  )
}