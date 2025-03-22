import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import useModal from "@/hooks/useModal";
import ModalTextInput from "@/components/input/ModalTextInput";
import {REGEX} from "@/util/regex";
import {QUERY_KEYS} from "@/util/query_keys";

export default function SellModal({bikeId, basePrice, placeId}) {
  //Change it based on selected location
  const [price, setPrice] = useState(basePrice);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const {setIsModalOpen} = useModal();
  const PRICE_REGEX = REGEX.PRICE;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.put(
        `/Bikes/sell/${bikeId}?price=${price}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueriesData({queryKey: [QUERY_KEYS.Models], exact: false}, (oldData) => {
        return oldData.map((model) => {
          return model.modelId === data.modelId
          ? {...model,
              bikeCount: model.bikeCount - 1,
              placeBikeCount: model.placeBikeCount.map(place => place.placeId === data.placeId
              ? {...place, count: place.count - 1, isAvaible: place.isAvaible && ((place.count - 1) === 0)}
                : place
              )
          }
          : model
        })
      })
      console.log([QUERY_KEYS.Bikes, data.modelId, placeId])
      queryClient.setQueryData([QUERY_KEYS.Bikes, data.modelId, placeId], (oldData) => {
        console.log(oldData)
        return oldData.filter((bike) => bike.id !== bikeId);
      })
      setIsModalOpen(false);
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
      <ErrorDisplay message={error} isVisible={error !== ""}/>
      <ModalTextInput title='Cena' value={price} setValue={setPrice}/>
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
