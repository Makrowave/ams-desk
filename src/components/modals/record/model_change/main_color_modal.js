import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPrivate from "@/hooks/use_axios_private";
import ValidationFetchSelect from "@/components/validation/validation_fetch_select";
import ErrorDisplay from "@/components/error/error_display";
import useModal from "@/hooks/use_modal";
import { QUERY_KEYS } from "@/util/query_keys";

export default function MainColorModal({ model }) {
  const [color, setColor] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { setIsOpen } = useModal();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        "/Models/" + model.modelId,
        JSON.stringify({
          colorId: color.toString(),
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
      <ErrorDisplay message={error} isVisible={error !== ""} />
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
        Przydziel kolor
      </button>
    </div>
  );
}
