import ErrorDisplay from "@/components/error/error_display";
import ColorInput from "@/components/input/color_input";
import ModalTextInput from "@/components/input/modal_text_input";
import useAxiosAdmin from "@/hooks/use_axios_admin";
import useModal from "@/hooks/use_modal";
import { QUERY_KEYS } from "@/util/query_keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function WheelModal() {
  const [wheel, setWheel] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const { setIsOpen } = useModal();
  const _url = "/WheelSizes/";
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosAdmin.post(_url + wheel);
    },
    onSuccess: (response) => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.WheelSizes],
        exact: false,
      });
      setIsOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  function handleClick() {
    if (validate()) mutation.mutate();
  }
  function validate() {
    if (typeof Number(wheel) === "number" && wheel > 0 && wheel < 30) return true;
    setError("Dane nie przeszły walidacji");
    return false;
  }

  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={!!error} />
      <ModalTextInput title='Rozmiar koła' value={wheel} setValue={setWheel} className='mb-auto' />
      <button className='button-primary mb-4' onClick={() => handleClick()}>
        Dodaj
      </button>
    </div>
  );
}
