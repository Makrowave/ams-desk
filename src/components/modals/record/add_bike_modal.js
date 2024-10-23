import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import FetchSelect from "../../filtering/fetch_select";
import useAxiosPrivate from "@/hooks/use_axios_private";
import ValidationFetchSelect from "@/components/validation/validation_fetch_select";

export default function AddBikeModal({ refetch, modelId }) {
  //Change it based on selected location
  const [place, setPlace] = useState("");
  const [status, setStatus] = useState("");
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
    onSuccess: refetch(),
  });

  return (
    <div className='flex flex-col justify-between flex-grow'>
      <div className='flex flex-col'>
        <ValidationFetchSelect
          value={place}
          onChange={(e) => {
            setPlace(e.target.value);
          }}
          src='https://localhost:7077/api/Places'
          queryKey='places'
          title='Miejsce'
          default_option={""}
          default_title='Wybierz z listy'
        />
      </div>
      <div>
        <ValidationFetchSelect
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          src='https://localhost:7077/api/Status'
          queryKey='statuses'
          title='Status'
          default_option={""}
          default_title='Wybierz z listy'
        />
      </div>
      <button
        className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center mt-auto mb-4 hover:bg-tertiary'
        onClick={() => {
          mutation.mutate();
        }}
      >
        Dodaj
      </button>
    </div>
  );
}
