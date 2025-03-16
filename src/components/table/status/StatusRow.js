import StatusModal from "@/components/modals/admin/StatusModal";
import DeleteModal from "@/components/modals/DeleteModal";
import useModal from "@/hooks/useModal";
import {QUERY_KEYS} from "@/util/query_keys";
import OrderButton from "../OrderButton";

export default function StatusRow({status, prev, next}) {
  const {setIsOpen, setTitle, setModalChildren} = useModal();
  const queryKey = QUERY_KEYS.Statuses;
  const _url = "/Status/ChangeOrder";
  return (
    <tr className='table-row h-14'>
      <td>{status.statusId}</td>
      <td className='w-14 h-12' style={{background: status.hexCode}}></td>
      <td>{status.statusName}</td>
      <td>
        {prev && <OrderButton first={prev} last={status.statusId} url={_url} queryKey={queryKey} up={true}/>}
        {next && <OrderButton first={status.statusId} last={next} url={_url} queryKey={queryKey} up={false}/>}
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setTitle("Edytuj status");
            setModalChildren(<StatusModal status={status} action='put'/>);
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
              <DeleteModal id={status.statusId} url={"/Status/"} refetchQueryKey={queryKey} admin={true}/>
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
