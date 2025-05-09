import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import URLS, {URLKEYS} from "@/util/urls";
import FetchSelect from "@/components/filtering/FetchSelect";
import {Button} from "@mui/material";

export default function AddBikeModal({modelId, closeModal}) {
  //Change it based on selected location
  const [place, setPlace] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.post(
        URLS.Bikes2,
        JSON.stringify({
          modelId: modelId,
          placeId: place,
          statusId: status,
        }),
        {
          headers: {"Content-Type": "application/json"},
        }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [URLS.Models],
        exact: false,
      });
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

  function validate() {
    let result = place !== "" && status !== "";
    if (!result) setError("Nie wybrano wszystkich pól");
    return result;
  }

  return (
    <>
      <ErrorDisplay message={error} isVisible={error !== ""}/>
      <FetchSelect
        value={place}
        onChange={setPlace}
        urlKey={URLKEYS.Places}
        label='Miejsce'
        defaultValue={""}
        validated
      />
      <FetchSelect
        value={status}
        onChange={setStatus}
        params={{exclude: [3]}}
        urlKey={URLKEYS.ExcludedStatuses}
        label='Status'
        defaultValue={""}
        validated
      />
      <Button color={"primary"} variant={"contained"}
              onClick={() => {
                if (validate()) mutation.mutate();
              }}
      >
        Dodaj
      </Button>
    </>
  );
}
