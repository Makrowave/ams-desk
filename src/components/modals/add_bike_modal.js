import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import FetchSelect from "../filtering/fetch_select";

export default function AddBikeModal({ refetch, modelId }) {
  //Change it based on selected location
  const [place, setPlace] = useState(1);
  const [status, setStatus] = useState(1);


  const mutation = useMutation({
    mutationFn: async () => {
      return await fetch("https://localhost:7077/api/Desktop/AddBike", {
        method: "POST",
        body: JSON.stringify({
          modelId: modelId,
          placeId: place,
          statusId: status
        }),
        headers: {'Content-Type': 'application/json'}
      })
    },
    onSuccess: refetch()
  })


  return (
    <div>
      <div>
        <span>Miejsce</span>
        <FetchSelect value={place}
          onChange={e => { setPlace(e.target.value) }}
          src='https://localhost:7077/api/Places'
          queryKey='places'
          default_option={null}
        />
      </div>
      <div>
        <span>Status</span>
        <FetchSelect value={status}
          onChange={e => { setStatus(e.target.value) }}
          src='https://localhost:7077/api/Status'
          queryKey='statuses'
          default_option={null}
        />
      </div>
      <button onClick={() => { mutation.mutate() }}>Dodaj</button>
    </div>
  )
}