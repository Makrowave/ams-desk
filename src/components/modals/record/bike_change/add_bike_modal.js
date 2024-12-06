import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPrivate from "@/hooks/use_axios_private";
import ValidationFetchSelect from "@/components/validation/validation_fetch_select";
import ErrorDisplay from "@/components/error/error_display";
import useModal from "@/hooks/use_modal";
import { QUERY_KEYS } from "@/util/query_keys";

export default function AddBikeModal({ modelId, placeId }) {
  //Change it based on selected location
  const [place, setPlace] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const { setIsOpen } = useModal();
  const queryClient = useQueryClient();
  const _url = "/Bikes";

  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.post(
        _url,
        JSON.stringify({
          modelId: modelId,
          placeId: place,
          statusId: status,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.Models],
        exact: false,
      });
      setIsOpen(false);
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
    let result = place !== "" && status !== "";
    if (!result) setError("Nie wybrano wszystkich pól");
    return result;
  }

  return (
    <div className='flex flex-col justify-between w-72 mx-auto'>
      <ErrorDisplay message={error} isVisible={error !== ""} />
      <ValidationFetchSelect
        value={place}
        onChange={setPlace}
        src='/Places'
        queryKey={QUERY_KEYS.Places}
        title='Miejsce'
        default_option={""}
        default_title='Wybierz z listy'
      />
      <ValidationFetchSelect
        value={status}
        onChange={setStatus}
        src='/Status/Excluded?exclude=3'
        queryKey={QUERY_KEYS.Statuses}
        title='Status'
        default_option={""}
        default_title='Wybierz z listy'
        isColored={true}
      />
      <button
        className='button-secondary self-center mt-auto mb-4'
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Dodaj
      </button>
    </div>
  );
}
