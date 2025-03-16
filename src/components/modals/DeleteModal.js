import useAxiosAdmin from "@/hooks/useAxiosAdmin";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useModal from "@/hooks/useModal";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import ErrorDisplay from "../error/ErrorDisplay";
import {useState} from "react";

export default function DeleteModal({refetchQueryKey, id, url, admin = false}) {
  const axios = admin ? useAxiosAdmin() : useAxiosPrivate();
  const {setIsOpen} = useModal();
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.delete(`${url}${id}`);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [refetchQueryKey],
        exact: false,
      });
      setIsOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={error !== ""}/>
      <div className='w-full *:py-2'>
        <h2>
          <b>Czy na pewno?</b>
        </h2>
        <p>Usunięcie danych może nieść za sobą niepożądane konsekwencje.</p>
        <p>Upewnij się, czy nie można rozwiązać problemu innymi metodami jak np. edycją.</p>
      </div>
      <button
        className='button-secondary self-center mt-auto mb-4'
        onClick={() => {
          mutation.mutate();
        }}
      >
        Usuń
      </button>
    </div>
  );
}
