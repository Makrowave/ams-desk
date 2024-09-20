import useAxiosPrivate from "@/hooks/use_axios_private";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function SellModal({ refetch, bikeId, basePrice }) {
  //Change it based on selected location
  const [price, setPrice] = useState(basePrice);

  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put("/Desktop/Sell/" + bikeId + "?salePrice=" + price.toString())
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