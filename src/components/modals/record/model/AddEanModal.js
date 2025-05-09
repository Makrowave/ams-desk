import ErrorDisplay from "@/components/error/ErrorDisplay";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import URLS from "@/util/urls";
import ValidatedTextField from "@/components/input/ValidatedTextField";
import {Button} from "@mui/material";
import {REGEX} from "@/util/regex";

export default function AddEanModal({model, closeModal}) {
  const [ean, setEan] = useState(model.eanCode);
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const result = await axiosPrivate.put(URLS.Models + model.modelId, JSON.stringify({
        ...model,
        eanCode: ean.toString()
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
      closeModal();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <>
      <ErrorDisplay message={error} isVisible={!!error}></ErrorDisplay>
      <ValidatedTextField label='EAN' value={ean} onChange={setEan} regex={REGEX.EAN}/>
      <Button onClick={() => mutation.mutate()} variant={"contained"} color={"primary"} disabled={!REGEX.EAN.test(ean)}>
        Zmień EAN
      </Button>
    </>
  );
}
