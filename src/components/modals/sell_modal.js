import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function SellModal({ refetch, bikeId, basePrice }) {
  //Change it based on selected location
  const [price, setPrice] = useState(basePrice);


  const mutation = useMutation({
    mutationFn: async () => {
      return await fetch("https://localhost:7077/api/Desktop/Sell/" + bikeId + "?salePrice=" + price.toString(), {
        method: "PUT"
      })
    },
    onSuccess: refetch()
  })


  return (
    <div>
      <div>
        <span>Cena</span>
        <input className="text-black text-center" value={price} onChange={e => {setPrice(e.target.value)}}></input>
      </div>
      <button onClick={() => { mutation.mutate() }}>Sprzedaj</button>
    </div>
  )
}