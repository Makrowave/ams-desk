import ColorInput from "@/components/input/ColorInput";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useModal from "@/hooks/useModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import URLS, {URLKEYS} from "@/util/urls";
import FetchSelect from "@/components/filtering/FetchSelect";
import {Button} from "@mui/material";
import ErrorDisplay from "@/components/error/ErrorDisplay";

//primaryColor and secondaryColor can be null in DB
//(for example if not specified by manufacturer and bike inserts are automated)
export default function ColorModal({model}) {
  const [primaryColor, setPrimaryColor] = useState(!!model.primaryColor ? model.primaryColor : "#FF00FF");
  const [secondaryColor, setSecondaryColor] = useState(!!model.secondaryColor ? model.secondaryColor : "#000000");
  const [color, setColor] = useState(model.colorId);
  const {setIsModalOpen} = useModal();
  const [error, setError] = useState("");
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


  return (
    <div className='modal-basic pb-2'>
      <ErrorDisplay message={error} isVisible={error !== ""}/>
      <ColorInput title='Kolor główny' value={primaryColor} setValue={setPrimaryColor}/>
      <ColorInput title='Kolor dodatkowy' value={secondaryColor} setValue={setSecondaryColor}/>
      <FetchSelect
        value={color}
        onChange={setColor}
        urlKey={URLKEYS.Colors}
        defaultValue={""}
        label='Kolor'
        validated
      />
      <Button variant="contained" color="primary" disabled={color === ""}
              onClick={() => {
                if (color !== "") mutation.mutate();
              }}
      >
        Zmień kolor
      </Button>
    </div>
  );
}
