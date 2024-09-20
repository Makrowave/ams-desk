import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import FetchSelect from "../filtering/fetch_select";
import useAxiosPrivate from "@/hooks/use_axios_private";

export default function MoveModal({ refetch, bikeId}) {
  //Change it based on selected location
  const [place, setPlace] = useState(1);

  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put("/Desktop/Move/" + bikeId + "?placeId=" + place.toString())
    },
    onSuccess: refetch()
  })


  return (
    <div>
      <div>
        <span>Dokąd</span>
        <FetchSelect value={place}
          onChange={e => { setPlace(e.target.value) }}
          src='/Places'
          queryKey='places'
          default_option={null}
        />
      </div>
      <button onClick={() => { mutation.mutate() }}>Przenieś</button>
    </div>
  )
}