import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ValidationFetchSelect from "@/components/validation/ValidationFetchSelect";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import useModal from "@/hooks/useModal";
import URLS from "@/util/urls";

export default function AddBikeModal({modelId, placeId}) {
  //Change it based on selected location
  const [place, setPlace] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const {setIsModalOpen} = useModal();
  const queryClient = useQueryClient();
  const _url = "/Bikes";

  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.post(
        _url,
        JSON.stringify({
          modelId: modelId,
          placeId: place,
          statusId: status,
        }),
        {
          headers: {"Content-Type": "application/json"},
        }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [URLS.Models],
        exact: false,
      });
      queryClient.refetchQueries({
        queryKey: [URLS.Bikes],
        exact: false,
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  function validate() {
    let result = place !== "" && status !== "";
    if (!result) setError("Nie wybrano wszystkich pól");
    return result;
  }

  return (
    <div className='flex flex-col justify-between w-72 mx-auto'>
      <ErrorDisplay message={error} isVisible={error !== ""}/>
      <ValidationFetchSelect
        value={place}
        onChange={setPlace}
        urlKey={'Places'}
        title='Miejsce'
        defaultValue={""}
        defaultLabel='Wybierz z listy'
      />
      <ValidationFetchSelect
        value={status}
        onChange={setStatus}
        urlKey={'ExcludedStatuses'}
        params={{exclude: [3]}}
        title='Status'
        defaultValue={""}
        defaultLabel='Wybierz z listy'
        isColored={true}
      />
      <button
        className='button-secondary self-center mt-auto mb-4'
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Dodaj
      </button>
    </div>
  );
}
