import useModal from "@/hooks/useModal";
import {QUERY_KEYS} from "@/util/query_keys";
import OrderButton from "../OrderButton";
import DeleteModal from "@/components/modals/DeleteModal";
import EmployeeModal from "@/components/modals/admin/EmployeeModal";

export default function EmployeeRow({employee, prev, next}) {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
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
        {next && <OrderButton first={employee.employeeId} last={next} url={_url} queryKey={queryKey} up={false}/>}
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalTitle();
            setModalContent(<EmployeeModal employee={employee} action='put'/>);
            setIsModalOpen(true);
          }}
        >
          Zmień nazwę
        </button>
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalTitle("Usuń pracownika");
            setModalContent(
              <DeleteModal
                id={employee.employeeId}
                url={"/Employees/"}
                admin={true}
                refetchQueryKey={QUERY_KEYS.Employees}
              />
            );
            setIsModalOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
