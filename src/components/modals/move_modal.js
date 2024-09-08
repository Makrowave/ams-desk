import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import FetchSelect from "../filtering/fetch_select";

export default function MoveModal({ refetch, bikeId}) {
  //Change it based on selected location
  const [place, setPlace] = useState(1);


  const mutation = useMutation({
    mutationFn: async () => {
      return await fetch("https://localhost:7077/api/Desktop/move/" + bikeId + "?placeId=" + place.toString(), {
        method: "PUT"
      })
    },
    onSuccess: refetch()
  })


  return (
    <div>
      <div>
        <span>Dokąd</span>
        <FetchSelect value={place}
          onChange={e => { setPlace(e.target.value) }}
          src='https://localhost:7077/api/Places'
          queryKey='places'
          default_option={null}
        />
      </div>
      <button onClick={() => { mutation.mutate() }}>Przenieś</button>
    </div>
  )
}