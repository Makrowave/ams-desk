import useAxiosPrivate from "@/hooks/use_axios_private";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

//primaryColor and secondaryColor can be null in DB
//(for example if not specified by manufacturer and bike inserts are automated)
export default function ColorModal({ model }) {
  const [primaryColor, setPrimaryColor] = useState(!!model.primaryColor ? model.primaryColor : "#FF00FF");
  const [secondaryColor, setSecondaryColor] = useState(!!model.secondaryColor ? model.secondaryColor : "#000000");

  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        "/Desktop/ChangeColor/" +
          model.modelId +
          "?primaryColor=" +
          primaryColor.slice(1) +
          "&secondaryColor=" +
          secondaryColor.slice(1)
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["bikes"],
        exact: false,
      });
    },
  });

  return (
    <div className='flex flex-col justify-between flex-grow gap-10 w-72 mx-auto'>
      <div>
        <h2>Kliknij na kolor aby go zmienić</h2>
      </div>
      <div className='flex justify-between'>
        <p className='self-center'>Kolor główny</p>
        <div>
          <input
            className='h-10'
            type='color'
            value={primaryColor}
            onChange={(e) => {
              setPrimaryColor(e.target.value);
            }}
          />
        </div>
      </div>
      <div className='flex justify-between'>
        <p className='self-center'>Kolor dodatkowy</p>
        <div>
          <input
            className='h-10'
            type='color'
            value={secondaryColor}
            onChange={(e) => {
              setSecondaryColor(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center mt-auto mb-4 hover:bg-tertiary'
        onClick={() => {
          mutation.mutate();
        }}
      >
        Zmień kolor
      </button>
    </div>
  );
}
