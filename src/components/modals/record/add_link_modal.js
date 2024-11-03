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
      return await axiosPrivate.put("/Models/" + model.modelId, JSON.stringify({ link: link.toString() }), {
        headers: { "Content-Type": "application/json" },
        validateStatus: (status) => {
          return status < 500;
        },
      });
    },
    onSuccess: (response) => {
      if (response.status == 204) {
        queryClient.refetchQueries({
          queryKey: ["bikes"],
          exact: false,
        });
        setIsOpen(false);
      } else {
        setError(response.data);
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
