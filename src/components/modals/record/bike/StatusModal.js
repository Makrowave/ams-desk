import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import useModal from "@/hooks/useModal";
import URLS, {URLKEYS} from "@/util/urls";
import FetchSelect from "@/components/filtering/FetchSelect";
import {Button} from "@mui/material";

export default function StatusModal({bikeId}) {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const {setIsModalOpen} = useModal();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        URLS.Bikes2 + bikeId,
        JSON.stringify({
          statusId: status.toString(),
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
      setIsModalOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <div className='modal-basic pb-4'>
      <ErrorDisplay message={error} isVisible={error !== ""}/>
      <FetchSelect
        value={status}
        onChange={setStatus}
        urlKey={URLKEYS.ExcludedStatuses}
        params={{exclude: [3]}}
        defaultValue={""}
        label='Status'
        validated
      />

      <Button
        variant="contained"
        className="mb-2"
        onClick={mutation.mutate}
        disabled={status === ""}
      >
        Zmień status
      </Button>
    </div>
  );
}
