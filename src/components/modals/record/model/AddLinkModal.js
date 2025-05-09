import ErrorDisplay from "@/components/error/ErrorDisplay";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useModal from "@/hooks/useModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import URLS from "@/util/urls";
import ValidatedTextField from "@/components/input/ValidatedTextField";
import {REGEX} from "@/util/regex";
import {Button} from "@mui/material";

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
    <div className='modal-basic mb-4'>
      <ErrorDisplay message={error} isVisible={!!error}/>
      <ValidatedTextField label='Link' value={link} onChange={setLink} regex={REGEX.LINK}/>
      <Button onClick={() => mutation.mutate()} variant='contained' color='primary' disabled={!REGEX.LINK.test(link)}>
        Zmień link
      </Button>
    </div>
  );
}
