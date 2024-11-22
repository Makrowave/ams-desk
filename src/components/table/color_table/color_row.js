import ColorModal from "@/components/modals/admin/color_modal";
import DeleteModal from "@/components/modals/delete_modal";
import useModal from "@/hooks/use_modal";
import { QUERY_KEYS } from "@/util/query_keys";

export default function ColorRow({ color }) {
  const { setIsOpen, setModalChildren, setTitle } = useModal();
  const queryKey = QUERY_KEYS.Colors;
  return (
    <tr className='table-row h-14'>
      <td>{color.colorId}</td>
      <td className='w-14 h-12' style={{ background: color.hexCode }}></td>
      <td>{color.colorName}</td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setIsOpen(true);
            setModalChildren(<ColorModal colorData={color} action='put' />);
            setTitle("Edytuj kolor");
          }}
        >
          Edytuj
        </button>
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalChildren(<DeleteModal id={color.colorId} url='/Colors/' refreshQueryKey={queryKey} admin={true} />);
            setTitle("Usuń kolor");
            setIsOpen(true);
          }}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
}
