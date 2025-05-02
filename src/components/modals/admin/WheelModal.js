import ErrorDisplay from "@/components/error/ErrorDisplay";
import ModalTextInput from "@/components/input/ModalTextInput";
import useAxiosAdmin from "@/hooks/useAxiosAdmin";
import useModal from "@/hooks/useModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import URLS from "@/util/urls";

export default function WheelModal() {
  const [wheel, setWheel] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const axiosAdmin = useAxiosAdmin();
  const {setIsModalOpen} = useModal();
  const _url = "/WheelSizes/";
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosAdmin.post(_url + wheel);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        [URLS.WheelSizes], (oldData) => {
          return [...oldData, {key: data, value: data}].sort((a, b) => (Number(a.value) - Number(b.value)))
        });
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
    if (typeof Number(wheel) === "number" && wheel > 0 && wheel < 30) return true;
    setError("Dane nie przeszły walidacji");
    return false;
  }

  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={!!error}/>
      <ModalTextInput title='Rozmiar koła' value={wheel} setValue={setWheel} className='mb-auto'/>
      <button className='button-primary mb-4' onClick={() => handleClick()}>
        Dodaj
      </button>
    </div>
  );
}
