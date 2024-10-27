import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPrivate from "@/hooks/use_axios_private";
import ValidationFetchSelect from "@/components/validation/validation_fetch_select";
import ErrorDisplay from "@/components/error/error_display";
import useModal from "@/hooks/use_modal";

export default function MainColorModal({ model }) {
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { setIsOpen } = useModal();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put("/Desktop/ChangeColorMain/" + model.modelId + "?colorId=" + color.toString());
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.refetchQueries({
          queryKey: ["bikes"],
          exact: false,
        });
        setIsOpen(false);
      } else {
        setError("Nie udało się zmienić koloru");
      }
    },
  });
  function validate() {
    let result = color !== "";
    if (!result) setError("Nie wybrano koloru z listy");
    return result;
  }
  return (
    <div className='flex flex-col justify-between flex-grow w-72 mx-auto'>
      <ErrorDisplay message={error} isVisible={error !== ""} />
      <ValidationFetchSelect
        value={color}
        onChange={setColor}
        src='/Colors'
        queryKey='colors'
        default_option={""}
        title='Kolor'
        default_title='Wybierz z listy'
        isColored={true}
      />
      <button
        className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center mt-auto mb-4 hover:bg-tertiary'
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Przydziel kolor
      </button>
    </div>
  );
}
