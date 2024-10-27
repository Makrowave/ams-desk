import ErrorDisplay from "@/components/error/error_display";
import useAxiosPrivate from "@/hooks/use_axios_private";
import useModal from "@/hooks/use_modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function AddLinkModal({ model }) {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { setIsOpen } = useModal();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put("/Desktop/AddLink/" + model.modelId + "?link=" + link.toString());
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.refetchQueries({
          queryKey: ["bikes"],
          exact: false,
        });
        setIsOpen(false);
      } else {
        setError("Nie udało ustawić się linku");
      }
    },
  });

  return (
    <div className='flex flex-col justify-between flex-grow w-72 mx-auto'>
      <ErrorDisplay message={error} isVisible={!!error}></ErrorDisplay>
      <div>
        <div className='flex flex-col'>
          <span>Link</span>
        </div>
        <input
          className='self-end text-center bg-primary border-2 border-tertiary rounded-l w-full'
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
      </div>
      <button
        className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center my-4 hover:bg-tertiary'
        onClick={() => {
          mutation.mutate();
        }}
      >
        Zmień link
      </button>
    </div>
  );
}
