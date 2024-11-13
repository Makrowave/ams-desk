import ErrorDisplay from "@/components/error/error_display";
import ColorInput from "@/components/input/color_input";
import ModalTextInput from "@/components/input/modal_text_input";
import useAxiosAdmin from "@/hooks/use_axios_admin";
import useModal from "@/hooks/use_modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function ColorModal({ colorData, action }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(colorData === undefined ? "#000000" : colorData.hexCode);
  const [error, setError] = useState("");
  const NAME_REGEX = /^[A-ZŻÓŁĆĘŚĄŹŃ][a-zżółćęśąźń]{1,15}$/;
  const COLOR_REGEX = /^#[A-Fa-f0-9]{6}$/;
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const { setIsOpen } = useModal();
  const mutation = useMutation({
    mutationFn: async () => {
      if (action === "put") {
        return await axiosAdmin.put(
          "/Colors/" + colorData.colorId,
          JSON.stringify({
            colorName: name,
            hexCode: color,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } else if (action === "post") {
        return await axiosAdmin.post(
          "/Colors",
          JSON.stringify({
            colorName: name,
            hexCode: color,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    },
    onSuccess: (response) => {
      queryClient.refetchQueries({
        queryKey: ["colors"],
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
    if (NAME_REGEX.test(name) && COLOR_REGEX.test(color)) return true;
    setError("Dane nie przeszły walidacji");
    return false;
  }

  if (!action) {
    return <ErrorDisplay message={"Modal setup failed"} isVisible={true}></ErrorDisplay>;
  }
  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={!!error} />
      <ModalTextInput title='Nazwa' value={name} setValue={setName} />
      <ColorInput title='Kolor' value={color} setValue={setColor} className='mb-auto mt-4' />
      <button className='button-primary mb-4' onClick={() => handleClick()}>
        {action === "put" ? "Edytuj" : ""}
        {action === "post" ? "Dodaj" : ""}
      </button>
    </div>
  );
}
