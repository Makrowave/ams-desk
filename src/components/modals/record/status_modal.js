import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPrivate from "@/hooks/use_axios_private";
import ValidationFetchSelect from "@/components/validation/validation_fetch_select";

export default function StatusModal({ refetch, bikeId }) {
  //Change it based on selected location
  const [status, setStatus] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put("/Desktop/ChangeStatus/" + bikeId + "?statusId=" + status.toString());
    },
    onSuccess: refetch(),
  });

  return (
    <div className='flex flex-col justify-between flex-grow'>
      <ValidationFetchSelect
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        src='/Status'
        queryKey='status'
        default_option={""}
        title='Status'
        default_title='Wybierz z listy'
      />
      <button
        className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center mt-auto mb-4 hover:bg-tertiary text-nowrap'
        onClick={() => {
          mutation.mutate();
        }}
      >
        Zmień status
      </button>
    </div>
  );
}
