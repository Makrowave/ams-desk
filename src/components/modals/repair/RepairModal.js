import FetchSelect from "@/components/filtering/FetchSelect";
import {useState} from "react";
import {Button} from "@mui/material";

export default function RepairModal({employeeId, onClick, label, closeModal}) {
  const [employee, setEmployee] = useState(employeeId ?? "");
  const handleClick = () => {
    if (employee) {
      onClick(employee);
      closeModal();
    }
  };

  return (
    <>
      <FetchSelect
        value={employee}
        onChange={setEmployee}
        urlKey={'Employees'}
        label={label}
        defaultValue={""}
        validated
      />
      <Button variant={"contained"} color={"primary"} onClick={handleClick} disabled={!employee}>
        Zapisz
      </Button>
    </>
  );
}
