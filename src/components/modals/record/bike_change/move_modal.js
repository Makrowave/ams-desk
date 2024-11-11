import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPrivate from "@/hooks/use_axios_private";
import ValidationFetchSelect from "@/components/validation/validation_fetch_select";
import ErrorDisplay from "@/components/error/error_display";
import useModal from "@/hooks/use_modal";

export default function MoveModal({ refetch, bikeId }) {
  const [place, setPlace] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { setIsOpen } = useModal();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        "/Bikes/" + bikeId,
        JSON.stringify({
          placeId: place,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["bikes"],
        exact: false,
      });
      setIsOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  function validate() {
    let result = place !== "";
    if (!result) setError("Nie wybrano miejsca z listy");
    return result;
  }
  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={error !== ""} />
      <ValidationFetchSelect
        value={place}
        onChange={setPlace}
        src='/Places'
        queryKey='places'
        default_option={""}
        title='Dokąd'
        default_title='Wybierz z listy'
      />
      <button
        className='button-secondary self-center mt-auto mb-4'
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Przenieś
      </button>
    </div>
  );
}
