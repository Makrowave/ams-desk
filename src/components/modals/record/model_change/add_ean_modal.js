import ErrorDisplay from "@/components/error/error_display";
import useAxiosPrivate from "@/hooks/use_axios_private";
import useModal from "@/hooks/use_modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function AddEanModal({ model }) {
  const [ean, setEan] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { setIsOpen } = useModal();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put("/Models/" + model.modelId, JSON.stringify({ eanCode: ean.toString() }), {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["bikes"],
        exact: false,
      });
      setIsOpen(false);
    },
    onError: (error) => {
      setError(error.response.data);
    },
  });

  return (
    <div className='flex flex-col justify-between flex-grow w-72 mx-auto'>
      <ErrorDisplay message={error} isVisible={!!error}></ErrorDisplay>
      <div>
        <div className='flex flex-col'>
          <span>EAN</span>
        </div>
        <input
          className='self-end text-center bg-primary border-2 border-tertiary rounded-l w-full'
          value={ean}
          onChange={(e) => {
            setEan(e.target.value);
          }}
        />
      </div>
      <button
        className='button-secondary self-center mt-auto mb-4'
        onClick={() => {
          mutation.mutate();
        }}
      >
        Zmień EAN
      </button>
    </div>
  );
}
