import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPrivate from "@/hooks/use_axios_private";
import ValidationFetchSelect from "@/components/validation/validation_fetch_select";
import ErrorDisplay from "@/components/error/error_display";
import useModal from "@/hooks/use_modal";

export default function StatusModal({ refetch, bikeId }) {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { setIsOpen } = useModal();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put("/Desktop/ChangeStatus/" + bikeId + "?statusId=" + status.toString());
    },
    onSuccess: (data) => {
      if (data) {
        refetch();
        setIsOpen(false);
      } else {
        setError("Nie można zmienić na ten sam status");
      }
    },
  });
  function validate() {
    let result = status !== "";
    if (!result) setError("Nie wybrano statusu z listy");
    return result;
  }
  return (
    <div className='flex flex-col justify-between flex-grow w-72 mx-auto'>
      <ErrorDisplay message={error} isVisible={error !== ""} />
      <ValidationFetchSelect
        value={status}
        onChange={setStatus}
        src='/Status/NotSold'
        queryKey='status'
        default_option={""}
        title='Status'
        default_title='Wybierz z listy'
        isColored={true}
      />
      <button
        className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center mt-auto mb-4 hover:bg-tertiary text-nowrap'
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Zmień status
      </button>
    </div>
  );
}
