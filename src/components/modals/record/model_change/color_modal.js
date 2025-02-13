import ColorInput from "@/components/input/color_input";
import ValidationFetchSelect from "@/components/validation/validation_fetch_select";
import useAxiosPrivate from "@/hooks/use_axios_private";
import useModal from "@/hooks/use_modal";
import { QUERY_KEYS } from "@/util/query_keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

//primaryColor and secondaryColor can be null in DB
//(for example if not specified by manufacturer and bike inserts are automated)
export default function ColorModal({ model }) {
  const [primaryColor, setPrimaryColor] = useState(!!model.primaryColor ? model.primaryColor : "#FF00FF");
  const [secondaryColor, setSecondaryColor] = useState(!!model.secondaryColor ? model.secondaryColor : "#000000");
  const [color, setColor] = useState(model.colorId);
  const { setIsOpen } = useModal();
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        "/Models/" + model.modelId,
        JSON.stringify({
          ...model,
          colorId: color,
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    },
    onSuccess: (response) => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.Models],
        exact: false,
      });
      setIsOpen(false);
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
      <ColorInput title='Kolor główny' value={primaryColor} setValue={setPrimaryColor} />
      <ColorInput title='Kolor dodatkowy' value={secondaryColor} setValue={setSecondaryColor} />
      <ValidationFetchSelect
        value={color}
        onChange={setColor}
        src='/Colors'
        queryKey={QUERY_KEYS.Colors}
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
