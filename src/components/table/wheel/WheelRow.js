import DeleteModal from "@/components/modals/DeleteModal";
import useModal from "@/hooks/useModal";
import { QUERY_KEYS } from "@/util/query_keys";

export default function CategoryRow({ wheel }) {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  const queryKey = QUERY_KEYS.WheelSizes;
  return (
    <tr className='table-row h-14'>
      <td>{wheel}</td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalChildren(<DeleteModal id={wheel} url={"/WheelSizes/"} refetchQueryKey={queryKey} admin={true} />);
            setTitle("Usuń koło");
            setIsOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
