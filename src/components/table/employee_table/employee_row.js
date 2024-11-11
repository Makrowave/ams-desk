export default function EmployeeRow({ employee }) {
  return (
    <tr className='table-row h-14'>
      <td>{employee.employeeId}</td>
      <td>{employee.employeeName}</td>
      <td>{employee.isAdmin ? "Tak" : "Nie"}</td>
      <td>
        <button className='button-secondary'>Zmień nazwę</button>
      </td>
      <td>
        <button className='button-secondary'>Zmień hasło</button>
      </td>
      <td>
        <button className='button-secondary'>Wyloguj</button>
      </td>
      <td>
        <button className='button-secondary'>Usuń</button>
      </td>
    </tr>
  );
}
