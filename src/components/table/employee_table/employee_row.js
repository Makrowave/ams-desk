import useModal from "@/hooks/use_modal";

export default function EmployeeRow({ employee }) {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  return (
    <tr className='table-row h-14'>
      <td>{employee.employeeId}</td>
      <td>{employee.employeeName}</td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setTitle();
            setModalChildren();
            setIsOpen(true);
          }}
        >
          Zmień nazwę
        </button>
      </td>
      <td>
        <button className='button-secondary'>Usuń</button>
      </td>
    </tr>
  );
}
