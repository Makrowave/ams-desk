import useAxiosPrivate from "@/hooks/use_axios_private";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ErrorDisplay from "@/components/error/error_display";
import useModal from "@/hooks/use_modal";

export default function SellModal({ refetch, bikeId, basePrice }) {
  //Change it based on selected location
  const [price, setPrice] = useState(basePrice);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { setIsOpen } = useModal();
  const regex = /^[0-9]{3,5}$/;
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put("/Desktop/Sell/" + bikeId + "?salePrice=" + price.toString());
    },
    onSuccess: () => {
      refetch();
      setIsOpen(false);
    },
  });
  function validate() {
    let result = regex.test(price);
    if (!result) setError("Wprowadzono niewłaściwą cenę");
    return result;
  }

  return (
    <div className='flex flex-col justify-between flex-grow w-72 mx-auto'>
      <ErrorDisplay message={error} isVisible={error !== ""} />
      <div className='flex flex-col'>
        <p>Cena</p>
        <input
          type='number'
          className=' text-center bg-primary border-2 border-tertiary rounded'
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        ></input>
      </div>
      <button
        className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center mt-auto mb-4 hover:bg-tertiary'
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Sprzedaj
      </button>
    </div>
  );
}
