import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import useModal from "@/hooks/useModal";
import URLS, {URLKEYS} from "@/util/urls";
import FetchSelect from "@/components/filtering/FetchSelect";

export default function AssembleModal({bikeId}) {
  //Change it based on selected location
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const {setIsModalOpen} = useModal();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put(
        "/Bikes/" + bikeId,
        JSON.stringify({
          assembledBy: employeeId.toString(),
          statusId: 2,
        }),
        {
          headers: {"Content-Type": "application/json"},
        }
      );
    },
    onSuccess: () => {
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
    let result = employeeId !== "";
    if (!result) setError("Nie wybrano pracownika z listy");
    return result;
  }

  return (
    <div className='modal-basic'>
      <ErrorDisplay message={error} isVisible={error !== ""}/>
      <FetchSelect
        value={employeeId}
        onChange={setEmployeeId}
        urlKey={URLKEYS.Employees}
        defaultValue={""}
        label='Pracownik'
        validated
      />
      <button
        className='button-secondary self-center mt-auto mb-4'
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Złóż
      </button>
    </div>
  );
}
