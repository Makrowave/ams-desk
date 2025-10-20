import FetchSelect from '../../filtering/FetchSelect';
import { useState } from 'react';
import { Button } from '@mui/material';

export default function RepairModal({
  employeeId,
  onClick,
  label,
  closeModal,
}: {
  employeeId?: number;
  onClick: (employeeId: number) => void;
  label: string;
  closeModal: () => void;
}) {
  const [employee, setEmployee] = useState(employeeId ?? 0);
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
        defaultValue={0}
        validated
      />
      <Button
        variant={'contained'}
        color={'primary'}
        onClick={handleClick}
        disabled={!employee}
      >
        Zapisz
      </Button>
    </>
  );
}
