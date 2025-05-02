import ErrorDisplay from "@/components/error/ErrorDisplay";
import ModalTextInput from "@/components/input/ModalTextInput";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useModal from "@/hooks/useModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import URLS from "@/util/urls";

export default function AddLinkModal({model}) {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {setIsModalOpen} = useModal();
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.put("/Models/" + model.modelId, JSON.stringify({
        ...model,
        link: link.toString()
      }), {
        headers: {"Content-Type": "application/json"},
      });
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueriesData({
        queryKey: [URLS.Models],
        exact: false,
      }, (oldData) => {
        return oldData ? oldData.map((m) => m.modelId === data.modelId ?
            {...data, bikeCount: m.bikeCount, placeBikeCount: m.placeBikeCount} : m)
          : oldData
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={!!error}/>
      <ModalTextInput title='Link' value={link} setValue={setLink}/>
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
