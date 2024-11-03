import useAxiosPrivate from "@/hooks/use_axios_private";
import useModal from "@/hooks/use_modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

//primaryColor and secondaryColor can be null in DB
//(for example if not specified by manufacturer and bike inserts are automated)
export default function ColorModal({ model }) {
  const [primaryColor, setPrimaryColor] = useState(!!model.primaryColor ? model.primaryColor : "#FF00FF");
  const [secondaryColor, setSecondaryColor] = useState(!!model.secondaryColor ? model.secondaryColor : "#000000");
  const { setIsOpen } = useModal();
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        "/Models/" + model.modelId,
        JSON.stringify({
          primaryColor: primaryColor,
          secondaryColor: secondaryColor,
        }),
        {
          headers: { "Content-Type": "application/json" },
          validateStatus: (status) => {
            return status < 500;
          },
        }
      );
    },
    onSuccess: (response) => {
      if (response.status == 204) {
        queryClient.refetchQueries({
          queryKey: ["bikes"],
          exact: false,
        });
        setIsOpen(false);
      } else {
        setError(response.data);
      }
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
        className='button-secondary self-center mt-auto mb-4'
        onClick={() => {
          mutation.mutate();
        }}
      >
        Zmień kolor
      </button>
    </div>
  );
}
