import ErrorDisplay from "@/components/error/ErrorDisplay";
import ColorInput from "@/components/input/ColorInput";
import ModalTextInput from "@/components/input/ModalTextInput";
import useAxiosAdmin from "@/hooks/useAxiosAdmin";
import useModal from "@/hooks/useModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { REGEX } from "@/util/regex";
import { QUERY_KEYS } from "@/util/query_keys";
export default function ColorModal({ colorData, action }) {
  const [name, setName] = useState(colorData === undefined ? "" : colorData.colorName);
  const [color, setColor] = useState(colorData === undefined ? "#000000" : colorData.hexCode);
  const [error, setError] = useState("");
  const NAME_REGEX = REGEX.NAME;
  const COLOR_REGEX = REGEX.COLOR;
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const { setIsOpen } = useModal();
  const _url = "/Colors/";
  const mutation = useMutation({
    mutationFn: async () => {
      if (action === "put") {
        return await axiosAdmin.put(
          _url + colorData.colorId,
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
          _url,
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
        queryKey: [QUERY_KEYS.Colors],
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
