import StatusModal from "@/components/modals/admin/StatusModal";
import DeleteModal from "@/components/modals/DeleteModal";
import useModal from "@/hooks/useModal";
import OrderButton from "../OrderButton";
import URLS from "@/util/urls";

export default function StatusRow({status, prev, next}) {
  const {setIsModalOpen, setModalTitle, setModalContent} = useModal();
  const _url = `${URLS.Statuses}ChangeOrder`;
  return (
    <tr className='table-row h-14'>
      <td>{status.statusId}</td>
      <td className='w-14 h-12' style={{background: status.hexCode}}></td>
      <td>{status.statusName}</td>
      <td>
        {prev && <OrderButton first={prev} last={status.statusId} url={_url} queryKey={URLS.Statuses} up={true}/>}
        {next && <OrderButton first={status.statusId} last={next} url={_url} queryKey={URLS.Statuses} up={false}/>}
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalTitle("Edytuj status");
            setModalContent(<StatusModal status={status} action='put'/>);
            setIsModalOpen(true);
          }}
        >
          Edytuj
        </button>
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalContent(
              <DeleteModal id={status.statusId} url={URLS.Statuses} refetchQueryKey={URLS.Statuses} admin={true}/>
            );
            setModalTitle("Usuń status");
            setIsModalOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
