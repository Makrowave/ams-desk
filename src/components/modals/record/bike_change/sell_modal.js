import useAxiosPrivate from "@/hooks/use_axios_private";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ErrorDisplay from "@/components/error/error_display";
import useModal from "@/hooks/use_modal";
import ModalTextInput from "@/components/input/modal_text_input";

export default function SellModal({ refetch, bikeId, basePrice }) {
  //Change it based on selected location
  const [price, setPrice] = useState(basePrice);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { setIsOpen } = useModal();
  const PRICE_REGEX = REGEX.PRICE;
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
      setError(error.message);
    },
  });
  function validate() {
    let result = PRICE_REGEX.test(price);
    if (!result) setError("Wprowadzono niewłaściwą cenę");
    return result;
  }

  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={error !== ""} />
      <ModalTextInput title='Cena' value={price} setValue={setPrice} />
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
