import useModal from "@/hooks/useModal";
import OrderButton from "../OrderButton";
import DeleteModal from "@/components/modals/DeleteModal";
import EmployeeModal from "@/components/modals/admin/EmployeeModal";
import URLS from "@/util/urls";

export default function EmployeeRow({employee, prev, next}) {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  const _url = `${URLS.Employees}ChangeOrder`;
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
            queryKey={URLS.Employees}
            up={true}
          />
        )}
        {next && <OrderButton first={employee.employeeId} last={next} url={_url} queryKey={URLS.Employees} up={false}/>}
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
                url={URLS.Employees}
                admin={true}
                refetchQueryKey={URLS.Employees}
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
