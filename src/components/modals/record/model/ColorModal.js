import ColorInput from "@/components/input/ColorInput";
import ValidationFetchSelect from "@/components/validation/ValidationFetchSelect";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useModal from "@/hooks/useModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import URLS from "@/util/urls";

//primaryColor and secondaryColor can be null in DB
//(for example if not specified by manufacturer and bike inserts are automated)
export default function ColorModal({model}) {
  const [primaryColor, setPrimaryColor] = useState(!!model.primaryColor ? model.primaryColor : "#FF00FF");
  const [secondaryColor, setSecondaryColor] = useState(!!model.secondaryColor ? model.secondaryColor : "#000000");
  const [color, setColor] = useState(model.colorId);
  const {setIsModalOpen} = useModal();
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.put(
        "/Models/" + model.modelId,
        JSON.stringify({
          ...model,
          colorId: color,
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
        }),
        {
          headers: {"Content-Type": "application/json"},
        }
      );
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueriesData({
        queryKey: [URLS.Models],
        exact: false,
      }, (oldData) => {
        return oldData ? oldData.map((m) => m.modelId === data.modelId ?
            {...data, bikeCount: m.bikeCount, placeBikeCount: m.placeBikeCount} : m)
          : oldData
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  function validate() {
    let result = color !== "";
    if (!result) setError("Nie wybrano koloru z listy");
    return result;
  }

  return (
    <div className='modal-basic'>
      <div>
        <h2>Kliknij na kolor aby go zmienić</h2>
      </div>
      <ColorInput title='Kolor główny' value={primaryColor} setValue={setPrimaryColor}/>
      <ColorInput title='Kolor dodatkowy' value={secondaryColor} setValue={setSecondaryColor}/>
      <ValidationFetchSelect
        value={color}
        onChange={setColor}
        urlKey={'Colors'}
        default_option={""}
        title='Kolor'
        default_title='Wybierz z listy'
        isColored={true}
      />
      <button
        className='button-secondary self-center mt-auto mb-4'
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Zmień kolor
      </button>
    </div>
  );
}
