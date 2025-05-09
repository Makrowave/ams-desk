import FetchSelect from "@/components/filtering/FetchSelect";
import useModal from "@/hooks/useModal";
import {useState} from "react";
import {Button} from "@mui/material";

export default function RepairModal({employeeId, onClick, label}) {
  const [employee, setEmployee] = useState(employeeId);
  const {setIsModalOpen} = useModal();
  const handleClick = () => {
    if (employee) {
      onClick(employee);
      setIsModalOpen(false);
    }
  };

  return (
    <div className='modal-basic pb-4'>
      <FetchSelect
        value={employee}
        onChange={setEmployee}
        urlKey={'Employees'}
        label={label}
        defaultValue={"Wybierz"}
        defaultLabel='Dowolny'
        validated
      />
      <Button variant={"contained"} color={"primary"} onClick={handleClick} disabled={employee === ""}>
        Zapisz
      </Button>
    </div>
  );
}
