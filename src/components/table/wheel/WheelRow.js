import DeleteModal from "@/components/modals/DeleteModal";
import useModal from "@/hooks/useModal";
import URLS from "@/util/urls";

export default function CategoryRow({wheel}) {
  const {setIsModalOpen, setModalContent, setModalTitle} = useModal();
  return (
    <tr className='table-row h-14'>
      <td>{wheel}</td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalContent(<DeleteModal id={wheel} url={URLS.WheelSizes} refetchQueryKey={URLS.WheelSizes}
                                         admin={true}/>);
            setModalTitle("Usuń koło");
            setIsModalOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
