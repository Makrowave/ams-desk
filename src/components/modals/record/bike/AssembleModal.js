import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import URLS, {URLKEYS} from "@/util/urls";
import FetchSelect from "@/components/filtering/FetchSelect";
import {Button} from "@mui/material";

export default function AssembleModal({bikeId, closeModal}) {
  //Change it based on selected location
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        URLS.Bikes2 + bikeId,
        JSON.stringify({
          assembledBy: employeeId.toString(),
          statusId: 2,
        }),
        {
          headers: {"Content-Type": "application/json"},
        }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [URLS.Bikes],
        exact: false,
      });
      closeModal()
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <>
      <ErrorDisplay message={error} isVisible={error !== ""}/>
      <FetchSelect
        value={employeeId}
        onChange={setEmployeeId}
        urlKey={URLKEYS.Employees}
        defaultValue={""}
        label='Pracownik'
        validated
      />
      <Button variant={'contained'} color={"primary"} onClick={() => mutation.mutate()} disabled={employeeId === ""}>
        Złóż
      </Button>
    </>
  );
}
