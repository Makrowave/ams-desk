import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPrivate from "@/hooks/use_axios_private";
import ValidationFetchSelect from "@/components/validation/validation_fetch_select";
import ErrorDisplay from "@/components/error/error_display";
import useModal from "@/hooks/use_modal";
export default function AssembleModal({ refetch, bikeId }) {
  //Change it based on selected location
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { setIsOpen } = useModal();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put("/Desktop/Assemble/" + bikeId + "?employeeId=" + employeeId.toString());
    },
    onSuccess: (data) => {
      if (data) {
        refetch();
        setIsOpen(false);
      } else {
        setError("Rower jest już złożony");
      }
    },
  });
  function validate() {
    let result = employeeId !== "";
    if (!result) setError("Nie wybrano pracownika z listy");
    return result;
  }
  return (
    <div className='flex flex-col justify-between flex-grow w-72 mx-auto'>
      <ErrorDisplay message={error} isVisible={error !== ""} />
      <ValidationFetchSelect
        value={employeeId}
        onChange={(e) => {
          setEmployeeId(e.target.value);
        }}
        src='/Employees'
        queryKey='employees'
        default_option={""}
        title='Pracownik'
        default_title='Wybierz z listy'
      />
      <button
        className='bg-secondary rounded-lg px-2 border-border border-2 shadow-lg border-b-4 self-center mt-auto mb-4 hover:bg-tertiary'
        onClick={() => {
          if (validate()) mutation.mutate();
        }}
      >
        Złóż
      </button>
    </div>
  );
}
