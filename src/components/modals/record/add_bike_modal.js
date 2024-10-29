import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPrivate from "@/hooks/use_axios_private";
import ValidationFetchSelect from "@/components/validation/validation_fetch_select";
import ErrorDisplay from "@/components/error/error_display";
import useModal from "@/hooks/use_modal";

export default function AddBikeModal({ refetch, modelId }) {
  //Change it based on selected location
  const [place, setPlace] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const { setIsOpen } = useModal();
  const _url = "/Desktop/AddBike";

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
        { headers: { "Content-Type": "application/json" } }
      );
    },
    onSuccess: (data) => {
      if (data) {
        refetch();
        setIsOpen(false);
      }
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
        queryKey='places'
        title='Miejsce'
        default_option={""}
        default_title='Wybierz z listy'
      />
      <ValidationFetchSelect
        value={status}
        onChange={setStatus}
        src='/Status/NotSold'
        queryKey='statuses'
        title='Status'
        default_option={""}
        default_title='Wybierz z listy'
        isColored={true}
      />
      <button
        className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center mt-auto mb-4 hover:bg-tertiary'
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Dodaj
      </button>
    </div>
  );
}
