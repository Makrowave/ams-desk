import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ValidationFetchSelect from "@/components/validation/ValidationFetchSelect";
import ErrorDisplay from "@/components/error/ErrorDisplay";
import useModal from "@/hooks/useModal";
import {QUERY_KEYS} from "@/util/query_keys";

export default function AssembleModal({bikeId}) {
  //Change it based on selected location
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const {setIsOpen} = useModal();
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
        queryKey: [QUERY_KEYS.Bikes],
        exact: false,
      });
      setIsOpen(false);
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
      <ValidationFetchSelect
        value={employeeId}
        onChange={setEmployeeId}
        src='/Employees'
        queryKey={QUERY_KEYS.Employees}
        default_option={""}
        title='Pracownik'
        default_title='Wybierz z listy'
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
