import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ValidationFetchSelect from "@/components/validation/ValidationFetchSelect";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import useModal from "@/hooks/useModal";
import {QUERY_KEYS} from "@/util/query_keys";

export default function StatusModal({refetch, bikeId}) {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const {setIsOpen} = useModal();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        "/Bikes/" + bikeId,
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
        queryKey: [QUERY_KEYS.Bikes],
        exact: false,
      });
      setIsOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  function validate() {
    let result = status !== "";
    if (!result) setError("Nie wybrano statusu z listy");
    return result;
  }

  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={error !== ""}/>
      <ValidationFetchSelect
        value={status}
        onChange={setStatus}
        src='/Status/Excluded?exclude=3'
        queryKey={QUERY_KEYS.Statuses}
        default_option={""}
        title='Status'
        default_title='Wybierz z listy'
        isColored={true}
      />
      <button
        className='button-secondary self-center mt-auto mb-4 text-nowrap'
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Zmień status
      </button>
    </div>
  );
}
