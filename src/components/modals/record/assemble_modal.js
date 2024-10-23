import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import FetchSelect from "../../filtering/fetch_select";
import useAxiosPrivate from "@/hooks/use_axios_private";
import ValidationFetchSelect from "@/components/validation/validation_fetch_select";

export default function AssembleModal({ refetch, bikeId }) {
  //Change it based on selected location
  const [employeeId, setEmployeeId] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axiosPrivate.put("/Desktop/Assemble/" + bikeId + "?employeeId=" + employeeId.toString());
    },
    onSuccess: refetch(),
  });

  return (
    <div className='flex flex-col justify-between flex-grow'>
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
          mutation.mutate();
        }}
      >
        Złóż
      </button>
    </div>
  );
}
