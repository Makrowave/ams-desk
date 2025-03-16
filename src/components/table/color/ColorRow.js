import ColorModal from "@/components/modals/admin/ColorModal";
import DeleteModal from "@/components/modals/DeleteModal";
import useModal from "@/hooks/useModal";
import {QUERY_KEYS} from "@/util/query_keys";
import OrderButton from "../OrderButton";

export default function ColorRow({color, prev, next}) {
  const {setIsOpen, setModalChildren, setTitle} = useModal();
  const queryKey = QUERY_KEYS.Colors;
  const _url = "/Colors/ChangeOrder";
  return (
    <tr className='table-row h-14'>
      <td>{color.colorId}</td>
      <td className='w-14 h-12' style={{background: color.hexCode}}></td>
      <td>{color.colorName}</td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setIsOpen(true);
            setModalChildren(<ColorModal colorData={color} action='put'/>);
            setTitle("Edytuj kolor");
          }}
        >
          Edytuj
        </button>
      </td>
      <td>
        {prev && <OrderButton first={prev} last={color.colorId} url={_url} queryKey={queryKey} up={true}/>}
        {next && <OrderButton first={color.colorId} last={next} url={_url} queryKey={queryKey} up={false}/>}
      </td>
      <td>
        <button
          className='button-secondary'
          onClick={() => {
            setModalChildren(<DeleteModal id={color.colorId} url='/Colors/' refreshQueryKey={queryKey} admin={true}/>);
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
