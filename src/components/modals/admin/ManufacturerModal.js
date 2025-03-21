import ErrorDisplay from "@/components/error/ErrorDisplay";
import ModalTextInput from "@/components/input/ModalTextInput";
import useAxiosAdmin from "@/hooks/useAxiosAdmin";
import useModal from "@/hooks/useModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {REGEX} from "@/util/regex";
import {QUERY_KEYS} from "@/util/query_keys";

export default function ManufacturerModal({manufacturer, action}) {
  const [name, setName] = useState(manufacturer === undefined ? "" : manufacturer.manufacturerName);
  const [error, setError] = useState("");
  const NAME_REGEX = REGEX.NAME;
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const {setIsModalOpen} = useModal();
  const _url = "/Manufacturers/";
  const mutation = useMutation({
    mutationFn: async () => {
      if (action === "put") {
        const result = await axiosAdmin.put(
          _url + manufacturer.manufacturerId,
          JSON.stringify({
            manufacturerName: name,
          }),
          {
            headers: {"Content-Type": "application/json"},
          }
        );
        return result.data;
      } else if (action === "post") {
        const result = await axiosAdmin.post(
          _url,
          JSON.stringify({
            manufacturerName: name,
          }),
          {
            headers: {"Content-Type": "application/json"},
          }
        );
        return result.data;
      }
    },
    onSuccess: (data) => {
      if (action === "put") {
        queryClient.setQueryData([QUERY_KEYS.Manufacturers], (oldData) => (
          oldData.map(man => man.manufacturerId === manufacturer.manufacturerId ? data : man)
        ));
      } else if (action === "post") {
        queryClient.setQueryData([QUERY_KEYS.Manufacturers], (oldData) => (
          [...oldData, data]
        ));
      }
      setIsModalOpen(false);
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
    setError("Nazwa nie przeszła walidacji");
    return false;
  }

  if (!action) {
    return <ErrorDisplay message={"Modal setup failed"} isVisible={true}></ErrorDisplay>;
  }
  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={!!error}/>
      <ModalTextInput title='Producent' value={name} setValue={setName} className='mb-auto'/>
      <button className='button-primary mb-4' onClick={() => handleClick()}>
        {action === "put" ? "Edytuj" : ""}
        {action === "post" ? "Dodaj" : ""}
      </button>
    </div>
  );
}
