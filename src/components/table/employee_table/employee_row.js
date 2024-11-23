import useModal from "@/hooks/use_modal";
import { QUERY_KEYS } from "@/util/query_keys";
import OrderButton from "../order_button";

export default function EmployeeRow({ employee, prev, next }) {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  const _url = "/Employees/ChangeOrder";
  const queryKey = QUERY_KEYS.Employees;
  return (
    <tr className='table-row h-14'>
      <td>{employee.employeeId}</td>
      <td>{employee.employeeName}</td>
      <td>
        {prev && (
          <OrderButton
            disabled={prev}
            first={prev}
            last={employee.employeeId}
            url={_url}
            queryKey={queryKey}
            up={true}
          />
        )}
        {next && <OrderButton first={employee.employeeId} last={next} url={_url} queryKey={queryKey} up={false} />}
      </td>
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
