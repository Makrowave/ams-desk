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
    <div className='flex flex-col justify-between flex-grow'>
      <div className="flex flex-col">
        <p>Cena</p>
        <input type='number' className=" text-center bg-primary border-2 border-tertiary rounded" value={price} onChange={e => {setPrice(e.target.value)}}></input>
      </div>
      <button  className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center mt-auto mb-4 hover:bg-tertiary' 
        onClick={() => { mutation.mutate() }}>
        Sprzedaj
      </button>
    </div>
  )
}