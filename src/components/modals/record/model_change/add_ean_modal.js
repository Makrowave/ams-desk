import ErrorDisplay from "@/components/error/error_display";
import ModalTextInput from "@/components/input/modal_text_input";
import useAxiosPrivate from "@/hooks/use_axios_private";
import useModal from "@/hooks/use_modal";
import { QUERY_KEYS } from "@/util/query_keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function AddEanModal({ model }) {
  const [ean, setEan] = useState(model.eanCode);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { setIsOpen } = useModal();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put("/Models/" + model.modelId, JSON.stringify({ ...model, eanCode: ean.toString() }), {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
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

  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={!!error}></ErrorDisplay>
      <ModalTextInput title='EAN' value={ean} setValue={setEan} />
      <button
        className='button-secondary self-center mt-auto mb-4'
        onClick={() => {
          mutation.mutate();
        }}
      >
        Zmień EAN
      </button>
    </div>
  );
}
