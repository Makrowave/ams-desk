import StatusModal from "@/components/modals/admin/status_modal";
import DeleteModal from "@/components/modals/delete_modal";
import useModal from "@/hooks/use_modal";

export default function StatusRow({ status }) {
  const { setIsOpen, setTitle, setModalChildren } = useModal();
  return (
    <tr className='table-row h-14'>
      <td>{status.statusId}</td>
      <td className='w-14 h-12' style={{ background: status.hexCode }}></td>
      <td>{status.statusName}</td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setTitle("Edytuj status");
            setModalChildren(<StatusModal status={status} action='put' />);
            setIsOpen(true);
          }}
        >
          Edytuj
        </button>
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalChildren(
              <DeleteModal id={status.statusId} url={"Statuses"} refetchQueryKey={"statuses"} admin={true} />
            );
            setTitle("Usuń status");
            setIsOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
