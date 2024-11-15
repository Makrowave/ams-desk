import ErrorDisplay from "@/components/error/error_display";
import ColorInput from "@/components/input/color_input";
import ModalTextInput from "@/components/input/modal_text_input";
import useAxiosAdmin from "@/hooks/use_axios_admin";
import useModal from "@/hooks/use_modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function ManufacturerModal({ manufacturer, action }) {
  const [name, setName] = useState(manufacturer === undefined ? "" : manufacturer.manufacturerName);
  const [error, setError] = useState("");
  const NAME_REGEX = /^[A-ZŻÓŁĆĘŚĄŹŃa-zżółćęśąźń -]{1,16}$/;
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const { setIsOpen } = useModal();
  const _url = "/Manufacturers/";
  const mutation = useMutation({
    mutationFn: async () => {
      if (action === "put") {
        return await axiosAdmin.put(
          _url + manufacturer.manufacturerId,
          JSON.stringify({
            manufacturerName: name,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } else if (action === "post") {
        return await axiosAdmin.post(
          _url,
          JSON.stringify({
            manufacturerName: name,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    },
    onSuccess: (response) => {
      queryClient.refetchQueries({
        queryKey: ["manufacturers"],
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
    if (NAME_REGEX.test(name)) return true;
    setError("Dane nie przeszły walidacji");
    return false;
  }

  if (!action) {
    return <ErrorDisplay message={"Modal setup failed"} isVisible={true}></ErrorDisplay>;
  }
  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={!!error} />
      <ModalTextInput title='Producent' value={name} setValue={setName} />
      <button className='button-primary mb-4' onClick={() => handleClick()}>
        {action === "put" ? "Edytuj" : ""}
        {action === "post" ? "Dodaj" : ""}
      </button>
    </div>
  );
}
