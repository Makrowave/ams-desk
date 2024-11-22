import StatusModal from "@/components/modals/admin/status_modal";
import DeleteModal from "@/components/modals/delete_modal";
import useModal from "@/hooks/use_modal";
import { QUERY_KEYS } from "@/util/query_keys";

export default function StatusRow({ status }) {
  const { setIsOpen, setTitle, setModalChildren } = useModal();
  const queryKey = QUERY_KEYS.Statuses;
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
              <DeleteModal id={status.statusId} url={"/Status/"} refetchQueryKey={queryKey} admin={true} />
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
