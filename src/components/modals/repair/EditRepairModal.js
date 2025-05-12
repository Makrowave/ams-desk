import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import FetchSelect from "@/components/filtering/FetchSelect";
import URLS, {URLKEYS} from "@/util/urls";
import ValidatedTextField from "@/components/input/ValidatedTextField";
import {REGEX} from "@/util/regex";
import ValidatedTextarea from "@/components/input/ValidatedTextarea";
import {Button} from "@mui/material";
import {useState} from "react";

export default function EditRepairModal({repair, updateRepair, closeModal}) {
  const axiosPrivate = useAxiosPrivate()
  const queryClient = useQueryClient()
  const [phone, setPhone] = useState(repair.phoneNumber);
  const [place, setPlace] = useState(repair.placeId);
  const [bike, setBike] = useState(repair.bikeName);
  const [issue, setIssue] = useState(repair.issue);
  const [employee, setEmployee] = useState(repair.takeInEmployeeId);
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.put(`${URLS.Repairs}UpdateIssue/${repair.repairId}`,
        {phoneNumber: phone, issue: issue, bikeName: bike, placeId: place, takeInEmployeeId: employee})
      return result.data;
    },
    onSuccess: data => {
      queryClient.setQueriesData({queryKey: [URLS.Repairs], exact: false}, (oldData) => {
        closeModal()
        updateRepair((prev) => ({
          ...prev,
          phoneNumber: data.phoneNumber,
          issue: data.issue,
          bikeName: data.bikeName,
          placeId: data.placeId,
          takeInEmployeeId: data.takeInEmployeeId,
          takeInEmployeeName: data.takeInEmployeeName,
        }))
        return oldData.map(item => item.repairId === data.repairId
          ? {
            ...item,
            phoneNumber: data.phoneNumber,
            issue: data.issue,
            bikeName: data.bikeName,
            placeId: data.placeId,
            takeInEmployeeId: data.takeInEmployeeId,
            takeInEmployeeName: data.takeInEmployeeName,
          }
          : item);
      });
    }
  })

  return (
    <>
      <FetchSelect
        value={place}
        onChange={(value) => {
          setPlace(value);
          localStorage.setItem("repairModal:defaultPlace", value)
        }}
        urlKey={URLKEYS.Places}
        defaultValue={""}
        label='Miejsce przyjęcia'
        validated
      />
      <FetchSelect
        value={employee}
        onChange={setEmployee}
        urlKey={URLKEYS.Employees}
        label={"Kto przyjmuje"}
        defaultValue={""}
        validated
      />
      <ValidatedTextField
        label='Telefon'
        value={phone}
        onChange={setPhone}
        regex={REGEX.PHONE}
      />
      <ValidatedTextField
        label='Rower'
        value={bike}
        onChange={setBike}
        regex={REGEX.POLISH_TEXT}
      />
      <ValidatedTextarea
        placeholder='Treść zgłoszenia'
        value={issue}
        onChange={setIssue}
        regex={REGEX.POLISH_TEXT}
        otherProps={{minRows: 3}}
      />
      <Button
        variant='contained' color='primary'
        disabled={!(REGEX.POLISH_TEXT.test(bike)
          && REGEX.POLISH_TEXT.test(issue)
          && REGEX.PHONE.test(phone)
          && place !== ""
          && employee !== "")}

        onClick={mutation.mutate}
      >
        Edytuj
      </Button>
    </>
  )
}