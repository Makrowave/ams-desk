import ErrorDisplay from "@/components/error/error_display";
import ModalTextInput from "@/components/input/modal_text_input";
import useAxiosPrivate from "@/hooks/use_axios_private";
import useModal from "@/hooks/use_modal";
import { QUERY_KEYS } from "@/util/query_keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function AddLinkModal({ model }) {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { setIsOpen } = useModal();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put("/Models/" + model.modelId, JSON.stringify({ link: link.toString() }), {
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
      <ErrorDisplay message={error} isVisible={!!error} />
      <ModalTextInput title='Link' value={link} setValue={setLink} />
      <button
        className='button-secondary self-center mt-auto mb-4'
        onClick={() => {
          mutation.mutate();
        }}
      >
        Zmień link
      </button>
    </div>
  );
}
