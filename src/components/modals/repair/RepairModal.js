import FetchSelect from "@/components/filtering/FetchSelect";
import useModal from "@/hooks/useModal";
import { QUERY_KEYS } from "@/util/query_keys";
import { useState } from "react";

export default function RepairModal({ employeeId, onClick, statusId, label }) {
  const [employee, setEmployee] = useState(employeeId);
  const { setIsOpen } = useModal();
  const handleClick = () => {
    if (employee) {
      onClick(employee, statusId);
      setIsOpen(false);
    }
  };

  return (
    <div className='flex flex-col w-full justify-between items-center'>
      <div className='w-60'>
        <FetchSelect
          value={employee}
          onChange={setEmployee}
          src='/Employees'
          queryKey={QUERY_KEYS.Employees}
          title={label}
          default_option={"Wybierz"}
          default_title='Dowolny'
        />
      </div>
      <button className='block button-primary mb-4 w-40' onClick={handleClick}>
        Zapisz
      </button>
    </div>
  );
}
