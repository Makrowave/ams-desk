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
      return await axiosPrivate.put(
        "/Bikes/" + bikeId,
        JSON.stringify({
          statusId: 3,
          salePrice: price,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    },
    onSuccess: () => {
      refetch();
      setIsOpen(false);
    },
    onError: (error) => {
      setError(error.response.data);
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
        className='button-secondary self-center mt-auto mb-4'
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Sprzedaj
      </button>
    </div>
  );
}
